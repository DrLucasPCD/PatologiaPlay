// Sucesso: valida a sessão no servidor e recebe um token de registro
document.addEventListener('DOMContentLoaded', async () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has('session_id')) return;

  const session_id = searchParams.get('session_id');
  const el = document.getElementById('session-id');
  if (el) el.setAttribute('value', session_id);

  try {
    const res = await fetch(`/.netlify/functions/validate-session?session_id=${encodeURIComponent(session_id)}`, { method: 'POST' });
    if (!res.ok) throw new Error('Falha ao validar pagamento.');
    const data = await res.json();
    if (!data || !data.token) throw new Error('Token ausente.');
    sessionStorage.setItem('register_token', data.token);
    if (data.email) sessionStorage.setItem('register_email', data.email);
    // Redireciona para o cadastro com o token
    setTimeout(()=>{ window.location.href = `register.html?rt=${encodeURIComponent(data.token)}`; }, 600);
  } catch (e) {
    alert('Não foi possível confirmar o pagamento. Tente atualizar a página.');
  }
});