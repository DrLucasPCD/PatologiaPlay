function getRegToken(){
  const p = new URLSearchParams(location.search);
  return p.get('rt') || sessionStorage.getItem('register_token') || '';
}
async function verifyToken(){
  const t = getRegToken();
  if(!t) return null;
  try{
    const r = await fetch('/.netlify/functions/verify-register-token?token=' + encodeURIComponent(t), { method: 'POST' });
    if(!r.ok) return null;
    return await r.json();
  }catch(e){ return null; }
}

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register() {
    // BLOQUEIA sem token
    const rt = getRegToken();
    if(!rt){
      alert('Pagamento não confirmado. Faça o checkout.');
      window.location.href='checkout.html';
      return;
    }

    showLoading();

    // Verifica token no backend antes de criar usuário
    verifyToken().then(data=>{
      if(!data || !data.ok){
        hideLoading();
        alert('Validação do pagamento falhou.');
        window.location.href='checkout.html';
        return;
      }
      const allowedEmail = (data.email||'').toLowerCase();
      const email = form.email().value.toLowerCase();
      if(allowedEmail && email !== allowedEmail){
        hideLoading();
        alert('Use o mesmo e-mail do pagamento: ' + allowedEmail);
        form.email().value = allowedEmail;
        return;
      }

      const password = form.password().value;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async () => {
          try{
            const u = firebase.auth().currentUser;
            if(u && !u.displayName){ await u.updateProfile({ displayName: (email||'').split('@')[0] }); }
          }catch(e){}
          hideLoading();
          window.location.href = "index.html";
        }).catch(error => {
          hideLoading();
          alert(getErrorMessage(error));
        });
    });

    return; // impede fluxo antigo
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") return "Email já está em uso";
    return error.message;
}
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) return false;
    const password = form.password().value;
    if (!password || password.length < 6) return false;
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) return false;
    return true;
}
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}