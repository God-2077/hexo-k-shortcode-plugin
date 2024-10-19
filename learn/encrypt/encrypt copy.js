const CryptoJS = require('crypto-js');

// 加密函数
function kencrypt(plaintext, key) {
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

// 密码验证
function passe(key) {
    const text = key + "hexo-k-shortcode-plugin";
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex)
}

function encrypt(args,content){
    let text = hexo.render.renderSync({ text: content, engine: 'markdown' }).split('\n').join('');
    let params = {
    password: "123456"
    };

    args.forEach((arg) => {
    if (arg.includes(":")) {
        let [key, value] = arg.split(":");
        if (key && value) {
        params[key] = value;
        }
    }
    });

    let password = params.password;
    const UUID = CryptoJS.randomUUID();
    const encrypttext = kencrypt(text,password);
    const passeyanzhen = passe(password);
    const rememberMeid = 'k-encrypt-rememberMe-' + UUID
    const submitid = 'k-encrypt-submit-' + UUID

    return `<div class="k-encrypt">
    <p class="text">
        此处含有加密内容，需要正确输入密码后可见！
    </p>
    <div method="post" id="passwordForm">
        <div class="input-k-encrypt">
            <div class="encrypt">
                <input type="password" placeholder="请输入密码" class="form-control form-control-k-encrypt" name="pass" id="passwordInput"/>
            </div>
            <div class="button-k-encrypt">
                <label>
                    <input type="checkbox" class="remember-me" id="${rememberMeid}"/> 记住我
                </label>
                <button type="submit" class="btn btn-k-encrypt" id="${submitid}">解密</button>
            </div>
        </div>
    </div>
    <hr style="border-top: 1px dashed #8c8b8b" />
    <div id="message" class="text-danger"></div>
</div>
<script>
if (typeof kencryptyanzhen === 'function') {
    // console.log('函数已定义');
} else {
    // console.log('函数未定义');
function loadJs(jsUrl){
    let scriptTag = document.createElement('script');
    scriptTag.src = jsUrl;
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
};
// 加载 CryptoJS 的浏览器版本，得到全局对象 CryptoJS
loadJs('https://cdn.bootcdn.net/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');

// 解密函数
function decrypt(combined, key) {
    const keySHA256 = CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
    const parts = combined.split('::');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedText = parts[1];
    const decrypted = CryptoJS.AES.decrypt(encryptedText, keySHA256, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// 密码验证
function passdyanzhen(key,keySHA256) {
    console.log(key,keySHA256)
    const text = key + "hexo-k-shortcode-plugin";
    const textSHA256 = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
    console.log(text,textSHA256)
    if (textSHA256 === keySHA256){
        return true
    } else {
        return false
    }
}
function kencryptyanzhen(){return true}
}
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    // 检查 localStorage 中是否有保存的密码
    if (localStorage.getItem('${rememberMeid}') === 'true') {
        passwordInput.value = localStorage.getItem('savedPassword') || '';
        document.getElementById('${rememberMeid}').checked = true;
    }
    // 监听“记住我”
    document.getElementById("${rememberMeid}").addEventListener('change',function(){
        if (this.checked) {
            localStorage.setItem('savedPassword', document.getElementById('passwordInput').value);
            localStorage.setItem('${rememberMeid}', 'true');
        } else {
            localStorage.removeItem('savedPassword');
            localStorage.setItem('${rememberMeid}', 'false');
        }
    })
    // 点击解密
    document.getElementById('${submitid}').addEventListener('click', function(event) {
        const password = passwordInput.value;
        const messageDiv = document.getElementById('message');
        const passeyanzhen = "${encrypttext}";
        const encryptedCombined = "${passeyanzhen}";
        if (passdyanzhen(password,passeyanzhen)){
            const decryptedText = decrypt(encryptedCombined, password);
            messageDiv.innerHTML = decryptedText
        } else {
            messageDiv.innerHTML = '<p style="margin-top:10px;font-size:14px;text-align:center;color:#d9534f;">您的密码输入错误，请核对后重新输入</p>';
        }
    });
});
</script>
<style>
.k-encrypt {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
}

.k-encrypt .text {
    color: #333;
    font-size: 16px;
    margin-bottom: 15px;
    text-align: center;
}

.k-encrypt i {
    margin-right: 8px;
    color: #007bff;
}

.k-encrypt .input-k-encrypt {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.k-encrypt .encrypt input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.k-encrypt .button-k-encrypt {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.k-encrypt .button-k-encrypt label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
}

.k-encrypt .button-k-encrypt input[type="checkbox"] {
    margin-right: 5px;
}

.k-encrypt .btn-k-encrypt {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.k-encrypt .btn-k-encrypt:hover {
    background-color: #0056b3;
}

/* .text-danger {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: #d9534f;
} */

</style>`

}
