const CryptoJS = require('crypto-js');

// 加密函数
function encrypt(plaintext, key) {
    const keySHA256 = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
    const iv = CryptoJS.lib.WordArray.random(32); // 生成随机IV
    const encrypted = CryptoJS.AES.encrypt(plaintext, keySHA256, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 返回IV和密文的组合
    return iv.toString(CryptoJS.enc.Hex) + '::' + encrypted.toString();
}

// 解密函数
function decrypt(combined, key) {
    const keySHA256 = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
    const parts = combined.split('::'); // 分割IV和密文
    const iv = CryptoJS.enc.Hex.parse(parts[0]); // 解析IV
    const encryptedText = parts[1]; // 获取密文

    const decrypted = CryptoJS.AES.decrypt(encryptedText, keySHA256, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // 返回明文
}

// 示例
let key = "12345 wrbwrWfb五八五八五八五6";
let text = `666`;
const encryptedCombined = encrypt(text, key);
console.log("Encrypted:", encryptedCombined);

const decryptedText = decrypt(encryptedCombined, key);
console.log("Decrypted:", decryptedText);
