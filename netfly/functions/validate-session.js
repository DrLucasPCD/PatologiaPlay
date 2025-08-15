const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');

const REG_SECRET = process.env.REGISTER_SIGNING_SECRET || 'change-me';
const b64url = (s) => Buffer.from(s).toString('base64url');
const sign = (obj) => {
  const p = b64url(JSON.stringify(obj));
  const sig = crypto.createHmac('sha256', REG_SECRET).update(p).digest('base64url');
  return `${p}.${sig}`;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const qp = event.queryStringParameters || {};
  const body = event.body ? new URLSearchParams(event.body) : new URLSearchParams();
  const session_id = qp.session_id || body.get('session_id');

  if (!session_id) return { statusCode: 400, body: 'session_id obrigatório' };

  try {
    const s = await stripe.checkout.sessions.retrieve(session_id);
    if (s.status !== 'complete') {
      return { statusCode: 409, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Session not complete' }) };
    }
    const email = s.customer_details?.email || s.customer_email || '';
    const token = sign({ sid: session_id, email, exp: Date.now() + 30 * 60 * 1000 }); // 30 min

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email })
    };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};