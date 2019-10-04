const libsodium=require('libsodium-wrappers');
let key=null;

module.exports.setKey=async function setKey(keyi)
{
key=keyi;
}

module.exports.decrypt=async function decrypt(ciphertext,nonce)
{
if(key==null){
throw 'no key found';
}
else{
return libsodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
}}
