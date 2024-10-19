const CryptoJS = require('crypto-js');

// function loadJs(jsUrl){
//     let scriptTag = document.createElement('script');
//     scriptTag.src = jsUrl;
//     document.getElementsByTagName('head')[0].appendChild(scriptTag);
// };

// // 加载 CryptoJS 的浏览器版本，得到全局对象 CryptoJS
// loadJs('https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');

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

// 密码验证

function passe(key) {
    const text = key + "hexo-k-shortcode-plugin";
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex)
}
function passd(key,keySHA256) {
    const text = key + "hexo-k-shortcode-plugin";
    const textSHA256 = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
    if (textSHA256 === keySHA256){
        return true
    } else {
        return false
    }
}


// 示例
let key = "12345 wrbwrWfb五八五八五八五6";
const passea = passe(key);
let text = `<p>这个<br>段落<br>演示了分行的效果</p><ul>
<li>Coffee</li>
<li>Milk</li>
</ul>`;

console.log("密码：",key)
console.log("密码验证：", passea)

const encryptedCombined = encrypt(text, key);
console.log("密文:", encryptedCombined);


if (passd("12345 wrbwrWfb五八五八五八五6",passea)){
    const decryptedText = decrypt(encryptedCombined, key);
    console.log("解密后:", decryptedText);
} else {
    console.log("password error.")
}