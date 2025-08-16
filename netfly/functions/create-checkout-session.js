const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function pickRecurringOrFirst(prices){
  if (!prices || !prices.data || !prices.data.length) return null;
  const recurring = prices.data.find(p => p.recurring);
  return (recurring || prices.data[0]).id;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const domain = process.env.APP_DOMAIN || 'https://patologiaplay.netlify.app';

  // Corpo do form (opcional)
  const body = event.body || '';
  const sp = new URLSearchParams(body);
  const formPriceId = sp.get('price_id');
  const formProductId = sp.get('product_id');
  const lookup_key = sp.get('lookup_key');

  try {
    let priceId = null;

    // 1) .env tem prioridade
    const ENV_SUB = process.env.STRIPE_SUBSCRIPTION_PRICE_ID; // pode ser price_... ou prod_...
    const ENV_PRICE = process.env.STRIPE_PRICE_ID;            // pode ser price_... ou prod_...

    async function resolveEnv(val){
      if (!val) return null;
      if (val.startsWith('price_')) return val;
      if (val.startsWith('prod_')){
        const prices = await stripe.prices.list({ product: val, active: true, limit: 10 });
        return await pickRecurringOrFirst(prices);
      }
      return null;
    }

    priceId = await resolveEnv(ENV_SUB) || await resolveEnv(ENV_PRICE) || null;

    // 2) Fallback: parâmetros do formulário
    if (!priceId && formPriceId) {
      if (formPriceId.startsWith('price_')) priceId = formPriceId;
      else if (formPriceId.startsWith('prod_')) {
        const prices = await stripe.prices.list({ product: formPriceId, active: true, limit: 10 });
        priceId = await pickRecurringOrFirst(prices);
      }
    }
    if (!priceId && formProductId) {
      const prices = await stripe.prices.list({ product: formProductId, active: true, limit: 10 });
      priceId = await pickRecurringOrFirst(prices);
    }
    if (!priceId && lookup_key) {
      const prices = await stripe.prices.list({ lookup_keys: [lookup_key], active: true, limit: 10 });
      priceId = prices.data?.[0]?.id || null;
    }

    if (!priceId) return { statusCode: 400, body: 'Defina STRIPE_SUBSCRIPTION_PRICE_ID/STRIPE_PRICE_ID no .env ou envie product_id/price_id no formulário.' };

    // Descobre o modo correto (subscription vs payment) com base no price
    let mode = 'subscription';
    try {
      const pr = await stripe.prices.retrieve(priceId);
      mode = pr && pr.recurring ? 'subscription' : 'payment';
    } catch(_) {}

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`
    });

    return { statusCode: 303, headers: { Location: session.url }, body: '' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};