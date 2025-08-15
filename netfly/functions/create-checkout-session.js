const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const body = event.body || '';
  const sp = new URLSearchParams(body);
  const productId = sp.get('product_id');
  const lookup_key = sp.get('lookup_key');

  const domain = process.env.APP_DOMAIN || 'https://patologiaplay.netlify.app';
  try {
    let priceId = null;

    if (productId) {
      // Busca preços ativos do produto; prioriza recorrente (assinatura)
      const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 });
      if (!prices.data.length) throw new Error('Nenhum preço ativo para o produto');
      const recurring = prices.data.find(p => p.recurring);
      priceId = (recurring || prices.data[0]).id;
    } else if (lookup_key) {
      // Fallback: lookup_key
      const prices = await stripe.prices.list({ lookup_keys: [lookup_key], active: true, limit: 10 });
      priceId = prices.data?.[0]?.id || null;
    }

    if (!priceId) return { statusCode: 400, body: 'priceId não encontrado' };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${domain}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel.html`
    });

    return { statusCode: 303, headers: { Location: session.url }, body: '' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};