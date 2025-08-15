const crypto = require('crypto');
const REG_SECRET = process.env.REGISTER_SIGNING_SECRET || 'change-me';

const b64urlDecode = (s) => Buffer.from(s, 'base64url');
const verify = (token) => {
  const [p, sig] = (token || '').split('.', 2);
  if (!p || !sig) return null;
  const expect = crypto.createHmac('sha256', REG_SECRET).update(p).digest('base64url');
  if (sig !== expect) return null;
  const data = JSON.parse(b64urlDecode(p).toString('utf8'));
  if (data.exp && Date.now() > data.exp) return null;
  return data;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const qp = event.queryStringParameters || {};
  const body = event.body ? new URLSearchParams(event.body) : new URLSearchParams();
  const token = qp.token || qp.t || body.get('token');
  const data = verify(token);
  if (!data) return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: false }) };

  return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, email: data.email || null }) };
};