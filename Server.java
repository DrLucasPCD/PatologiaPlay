package com.stripe.sample;

import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import com.stripe.Stripe;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.net.Webhook;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.model.Price;
import com.stripe.param.PriceListParams;
import com.stripe.model.PriceCollection;
import com.stripe.model.Subscription;

public class Server {
  private static Gson gson = new Gson();

  public static void main(String[] args) {
    port(4242);

    // ===== CHAVES via ambiente =====
    String stripeKey = System.getenv("STRIPE_SECRET_KEY");
    if (stripeKey == null || stripeKey.isBlank()) {
      throw new IllegalStateException("STRIPE_SECRET_KEY ausente. Defina a variável de ambiente com sua chave SECRETA (sk_live_...).");
    }
    Stripe.apiKey = stripeKey;
    String endpointSecret = System.getenv("STRIPE_WEBHOOK_SECRET");
    final String YOUR_DOMAIN = "https://patologiaplay.netlify.app";

    // Sirva arquivos estáticos (ajuste caminho conforme seu projeto)
    staticFiles.externalLocation(Paths.get("public").toAbsolutePath().toString());

    // ===== Helpers de token HMAC =====
    final String REG_SECRET = System.getenv().getOrDefault("REGISTER_SIGNING_SECRET", "change-me");
    java.util.function.Function<String,String> b64url = (s)-> Base64.getUrlEncoder().withoutPadding().encodeToString(s.getBytes(StandardCharsets.UTF_8));
    java.util.function.Function<byte[],String> b64urlBytes = (b)-> Base64.getUrlEncoder().withoutPadding().encodeToString(b);
    java.util.function.Function<String,byte[]> b64urlDecode = (s)-> Base64.getUrlDecoder().decode(s);
    java.util.function.BiFunction<String,String,String> hmac = (data, secret)->{
      try{
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return b64urlBytes.apply(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
      }catch(Exception e){ return ""; }
    };
    java.util.function.Function<Map<String,Object>,String> sign = (payload)->{
      String json = gson.toJson(payload);
      String p = b64url.apply(json);
      String sig = hmac.apply(p, REG_SECRET);
      return p+"."+sig;
    };
    java.util.function.Function<String,Map> verify = (token)->{
      try{
        String[] parts = token.split("\\.",2);
        if(parts.length!=2) return null;
        String sig = hmac.apply(parts[0], REG_SECRET);
        if(!sig.equals(parts[1])) return null;
        String json = new String(b64urlDecode.apply(parts[0]), StandardCharsets.UTF_8);
        Map map = gson.fromJson(json, Map.class);
        Object exp = map.get("exp");
        if(exp instanceof Number){
          double ms = ((Number)exp).doubleValue();
          if(System.currentTimeMillis() > (long)ms) return null;
        }
        return map;
      }catch(Exception e){ return null; }
    };

    // ===== Cria Checkout Session (subscription) =====
    post("/create-checkout-session", (request, response) -> {
      String productId = request.queryParams("product_id");
      String lookupKey = request.queryParams("lookup_key");

      PriceCollection prices;
      // Fallback via .env se nada vier no request
      String envSub = System.getenv("STRIPE_SUBSCRIPTION_PRICE_ID"); // pode ser price_... ou prod_...
      String envPrice = System.getenv("STRIPE_PRICE_ID");            // pode ser price_... ou prod_...

      if ((productId == null || productId.isEmpty()) && (lookupKey == null || lookupKey.isEmpty())) {
        if (envSub != null && !envSub.isBlank() && envSub.startsWith("prod_")) {
          PriceListParams priceParams = PriceListParams.builder()
            .setProduct(envSub)
            .setActive(true)
            .setLimit(10L)
            .build();
          prices = Price.list(priceParams);
        } else if (envPrice != null && !envPrice.isBlank() && envPrice.startsWith("prod_")) {
          PriceListParams priceParams = PriceListParams.builder()
            .setProduct(envPrice)
            .setActive(true)
            .setLimit(10L)
            .build();
          prices = Price.list(priceParams);
        } else {
          // Se .env já trouxer price_ diretamente, não precisamos listar; criaremos a Session direto adiante.
          prices = null;
        }
      } else if (productId != null && !productId.isEmpty()) {
        PriceListParams priceParams = PriceListParams.builder()
          .setProduct(productId)
          .setActive(true)
          .setLimit(10L)
          .build();
        prices = Price.list(priceParams);
      } else {
        PriceListParams priceParams = PriceListParams.builder()
          .addLookupKeys(lookupKey)
          .setActive(true)
          .setLimit(10L)
          .build();
        prices = Price.list(priceParams);
      }

      // Decide o priceId final
      String finalPriceId = null;
      if (envSub != null && envSub.startsWith("price_")) finalPriceId = envSub;
      if (finalPriceId == null && envPrice != null && envPrice.startsWith("price_")) finalPriceId = envPrice;
      if (finalPriceId == null && prices != null && !prices.getData().isEmpty()) {
        finalPriceId = prices.getData().stream()
          .filter(p -> p.getRecurring() != null)
          .findFirst()
          .orElse(prices.getData().get(0))
          .getId();
      }
      if (finalPriceId == null) {
        response.status(400);
        return "priceId não configurado";
      }

      // Descobre o modo conforme o price (assume subscription por padrão)
      SessionCreateParams.Mode mode = SessionCreateParams.Mode.SUBSCRIPTION;
      try {
        com.stripe.model.Price pr = com.stripe.model.Price.retrieve(finalPriceId);
        if (pr.getRecurring() == null) mode = SessionCreateParams.Mode.PAYMENT;
      } catch(Exception ignored){}

      SessionCreateParams params = SessionCreateParams.builder()
        .addLineItem(
          SessionCreateParams.LineItem.builder()
            .setPrice(finalPriceId)
            .setQuantity(1L)
            .build()
        )
        .setMode(mode)
        .setSuccessUrl(YOUR_DOMAIN + "/success.html?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl(YOUR_DOMAIN + "/cancel.html")
        .build();

      Session session = Session.create(params);

      // Fluxo A: redireciona direto no servidor
      response.redirect(session.getUrl(), 303);
      return "";
    });

    // ===== Valida sessão e emite token de registro =====
    post("/validate-session", (request, response) -> {
      String sessionId = request.queryParams("session_id");
      if(sessionId == null || sessionId.isEmpty()){
        response.status(400); return "";
      }
      Session session = Session.retrieve(sessionId);
      String status = session.getStatus(); // esperado: "complete"
      String email = null;
      if(session.getCustomerDetails()!=null){ email = session.getCustomerDetails().getEmail(); }
      if(email == null) email = session.getCustomerEmail();

      if(!"complete".equalsIgnoreCase(status)){
        response.status(409);
        response.type("application/json");
        return gson.toJson(Map.of("error","Session not complete"));
      }

      Map<String,Object> payload = new HashMap<>();
      payload.put("sid", sessionId);
      payload.put("email", email);
      payload.put("exp", System.currentTimeMillis() + 30 * 60 * 1000); // 30 min
      String token = sign.apply(payload);

      response.type("application/json");
      return gson.toJson(Map.of("token", token, "email", email));
    });

    // ===== Verifica token de registro =====
    post("/verify-register-token", (request, response) -> {
      String token = request.queryParams("token");
      if(token == null) token = request.queryParams("t");
      if(token == null || token.isEmpty()){
        response.status(400); return "";
      }
      Map m = verify.apply(token);
      response.type("application/json");
      if(m == null){ response.status(401); return gson.toJson(Map.of("ok", false)); }
      return gson.toJson(Map.of("ok", true, "email", m.get("email")));
    });

    // ===== Webhook (opcional por agora) =====
    post("/webhook", (request, response) -> {
      String payload = request.body();
      Event event = null;
      try {
        event = com.stripe.net.ApiResource.GSON.fromJson(payload, Event.class);
      } catch (JsonSyntaxException e) {
        response.status(400); return "";
      }
      String sigHeader = request.headers("Stripe-Signature");
      if (endpointSecret != null && sigHeader != null) {
        try {
          event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
          response.status(400); return "";
        }
      }
      StripeObject stripeObject = null;
      EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
      if (dataObjectDeserializer.getObject().isPresent()) {
        stripeObject = dataObjectDeserializer.getObject().get();
      }
      switch (event.getType()) {
        case "checkout.session.completed":
          // TODO: persistir status ok para o e-mail em seu DB/Firestore
          break;
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          // TODO: refletir status da assinatura
          break;
        default:
          System.out.println("Unhandled event type: " + event.getType());
      }
      response.status(200);
      return "";
    });
  }
}