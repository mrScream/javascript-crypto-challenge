const _sodium = require('libsodium-wrappers');

let rx = null;
let tx = null;
let privateKey = null;
let publicKey = null;
let clientKey = null;

module.exports.setClientPublicKey = function(key)
{
    //return if key already set
    if (clientKey === key)
        return;
    //throw exception if key already set
    if ((clientKey !== null) && (clientKey !== key))
        throw 'client public key already set';

    clientKey = key;

    //generate key exchange
    const keypair = _sodium.crypto_kx_keypair();
    privateKey = keypair.privateKey;
    publicKey = keypair.publicKey;


    sharedKeys = _sodium.crypto_kx_server_session_keys(publicKey,privateKey,key);
    //set rx and tx
    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
}

module.exports.serverPublicKey = async function()
{
    await _sodium.ready;
    return publicKey;
}

module.exports.encrypt = async function(msg)
{
    await _sodium.ready;
    //encrypt message with nonce and sharedKeys
    nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES)
    ciphertext = _sodium.crypto_secretbox_easy(msg, nonce, tx)
    return { ciphertext, nonce }
}

module.exports.decrypt = async function(ciphertext, nonce)
{
    await _sodium.ready;
    //decrypt cyphertext with sharedKey and nonce
    return await _sodium.crypto_secretbox_open_easy(ciphertext, nonce, rx)
}
