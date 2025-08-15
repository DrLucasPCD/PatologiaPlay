/*
  hash_config (para importação de usuários no Firebase Auth — lado servidor/Admin):
  {
    algorithm: 'SCRYPT',
    base64_signer_key: 'EEzMUi+5Zo8go6C1Nj6/c4oXj58POWsE6oj8JL7FTlB1btLobKLzBmDIDjueTfN6V7ebbx7jVgWwW3cVaRmPVg==',
    base64_salt_separator: 'Bw==',
    rounds: 8,
    mem_cost: 14
  }
  OBS: o front-end não usa esses campos; eles são aplicados apenas ao importar usuários via Admin SDK.
*/
const firebaseConfig = {
    apiKey: "AIzaSyDk8Txgf_Hut07Zbgebornctv1v1PQgMOU",
    authDomain: "protocolo-guerra-ribas.firebaseapp.com",
    projectId: "protocolo-guerra-ribas",
    storageBucket: "protocolo-guerra-ribas.appspot.com",
    messagingSenderId: "815664892968",
    appId: "1:815664892968:web:d8046ae2c493971fae391d",
    measurementId: "G-WDVX1EEZR7"
};
firebase.initializeApp(firebaseConfig);
// Firestore + persistência offline
try{
  if (firebase.firestore) {
    firebase.firestore().enablePersistence().catch(()=>{});
    window.db = firebase.firestore();
  }
}catch(e){ /* noop */ }