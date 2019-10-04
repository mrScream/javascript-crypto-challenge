const libsodium=require('libsodium-wrappers');
let keypair=null;
let loadLibsodium=async()=>await libsodium.ready;
(async()=>{
  await loadLibsodium();
  keypair=libsodium.crypto_sign_keypair();
})();

module.exports.verifyingKey=async function verifyingKey(){
  await loadLibsodium();
  return keypair.publicKey;
}
module.exports.sign=async function sign(msg){
  return libsodium.crypto_sign(msg,keypair.privateKey)

}
