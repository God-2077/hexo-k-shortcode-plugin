'use strict';
const CryptoJS = require('crypto-js');
// ------------------------------------------------------------------------------------------------------
// 辅助函数

function kdebuglog(color,text) {
  if (color=='yellow') {
    console.log('\x1B[33m%s\x1B[0m',text)
  }
  if (color=='red') {
    console.log('\x1B[31m%s\x1B[0m',text)
  }
  if (color=='green') {
    console.log('\x1B[32m%s\x1B[0m',text)
  }
}
// 全局页面字符串替换
if (hexo.config.hexo_k_shortcode_plugin?.replace?.enable || false) {
  kdebuglog("red","dav")
  hexo.extend.filter.register('after_render:html', function (html) {
    const kreplace = this.config.hexo_k_shortcode_plugin.replace.content || [];
    kreplace.forEach(([search, replace]) => {
      html = html.replace(new RegExp(search, 'g'), replace);
    });
    return html;
});}

// 加密函数
function cencrypt(plaintext, key) {
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

// ------------------------------------------------------------------------------------------------------
// 初始化

let kdebug = hexo.config.hexo_k_shortcode_plugin?.debug || false;
if (kdebug){
  kdebuglog('green',`hexo-k-shortcode-plugin-debug:${kdebug}`)
}

// ---------------------------------------------------------------------------------------------------------------

// 标签主函数

// 隐藏文本
// {% hidden 这世界就是个错误！ type:blur title:字符串 show:true %} 

function hidden(args) {
  let content = ""; // 用来存储标签内容
  let params = {
    type: "blur", // 默认值
    title: "",
    show: "true"
  };
  
  // 遍历 args 数组
  args.forEach((arg) => {
    if (arg.includes(":")) {
      // 使用 ':' 分割并存储到 params 对象中
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    } else if (!content) {
      // 第一个没有 ':' 的部分认为是内容
      content = arg;
    }
  });

  let contentText = content.trim();
  let type = params.type;
  let title = params.title;
  let show = params.show

  if (type != "blur" && type != "background") {
    kdebuglog('red', `hexo-k-shortcode: hidden parameter type ERROR, type=${type}`);
    return `hexo-k-shortcode: hidden parameter type ERROR, type=${type}`;
  }
  if (show != "true" && show != "false") {
    kdebuglog('red', `hexo-k-shortcode: hidden parameter show ERROR, show=${show}`);
    return `hexo-k-shortcode: hidden parameter show ERROR, show=${show}`;
  }

  if (kdebug){kdebuglog('green', `hexo-k-shortcode: hidden contentText=${contentText}, type=${type}, title=${title}, show=${show}`);}
  return `<span class="hidden-text hidden-texthidden-text-${type} hidden-texthidden-text-${show}" title="${title}">${contentText}</span>`;
}

// 标签
// {% label 标签 color:indigo shape:round %}

function label(args){
  let content = "";
  let params = {
    color: "indigo",
    shape: "square"
  };
  args.forEach((arg) => {
    if (arg.includes(":")) {
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    } else if (!content) {
      content = arg;
    }
  });
  let contentText = content.trim();
  let color = params.color;
  let shape =params.shape;

  const arcolor = ["indigo","green","red","blue","orange",];
  const arshape = ["square","round"];
  if (!arcolor.includes(color)) {
    kdebuglog('red', `hexo-k-shortcode: label parameter color ERROR, color=${color}`);
    return `hexo-k-shortcode: label parameter color ERROR, color=${color}`
  }
  if (!arshape.includes(shape)) {
    kdebuglog('red', `hexo-k-shortcode: label parameter shape ERROR, color=${shape}`);
    return `hexo-k-shortcode: label parameter shape ERROR, color=${shape}`
  }

  if (kdebug){kdebuglog('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: label contentText=${contentText}, color=${color}, shape=${shape},`);}
  return `<span class="label label-color-${color} label-color-${shape}">${contentText}</span>`
}


function kencrypt(args,content){
  let text = hexo.render.renderSync({ text: content, engine: 'markdown' });
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

  const password = params.password;
  const POSTID = "k-encrypt-post" + CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  const encrypttext = cencrypt(text,password);
  const passeyanzhen = passe(password);
  const rememberMeid = 'k-encrypt-rememberMe-' + POSTID
  const submitid = 'k-encrypt-submit-' + POSTID
  const passwordInputid = 'k-encrypt-passwordInput-' + POSTID
  const messageid = 'k-encrypt-message-' + POSTID

  return `<div class="k-encrypt">
  <p class="text">
      此处含有加密内容，需要正确输入密码后可见！
  </p>
  <div method="post" id="passwordForm">
      <div class="input-k-encrypt">
          <div class="encrypt">
              <input type="password" placeholder="请输入密码" class="form-control form-control-k-encrypt" name="pass" id="${passwordInputid}"/>
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
  <div id="${messageid}" class="text-danger"></div>
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
loadJs('/js/crypto-js.4.1.1.min.js');

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
  console.log("1",key,keySHA256)
  const text = key + "hexo-k-shortcode-plugin";
  const textSHA256 = CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  console.log("2",text,textSHA256)
  if (textSHA256 === keySHA256){
      return true
  } else {
      return false
  }
}
function kencryptyanzhen(){return true}
}
// 监听“记住我”
function listenrememberMeid(){
  document.getElementById("${rememberMeid}").addEventListener('change',function(){
    if (this.checked) {
        localStorage.setItem('savedPassword', document.getElementById('${passwordInputid}').value);
        localStorage.setItem('${rememberMeid}', 'true');
    } else {
        localStorage.removeItem('savedPassword');
        localStorage.setItem('${rememberMeid}', 'false');
    }
    })
}
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('${passwordInputid}');
  // 检查 localStorage 中是否有保存的密码
  if (localStorage.getItem('${rememberMeid}') === 'true') {
      passwordInput.value = localStorage.getItem('savedPassword') || '';
      document.getElementById('${rememberMeid}').checked = true;
  }
  listenrememberMeid();
  // 点击解密
  document.getElementById('${submitid}').addEventListener('click', function(event) {
      listenrememberMeid();
      const password = passwordInput.value;
      const messageDiv = document.getElementById('${messageid}');
      const passeyanzhen = "${passeyanzhen}";
      const encryptedCombined = "${encrypttext}";
      if (passdyanzhen(password,passeyanzhen)){
          const decryptedText = decrypt(encryptedCombined, password);
          messageDiv.innerHTML = decryptedText
      } else {
          messageDiv.innerHTML = '<p style="margin-top:10px;font-size:14px;text-align:center;color:#d9534f;">您的密码输入错误，请核对后重新输入</p>';
      }
  });
});
</script>`
}

hexo.extend.tag.register("kencrypt", kencrypt, {ends: true});

// -----------------------------------------------------------------------------------------------------------------------

// 注入标签函数

hexo.extend.tag.register("hidden", hidden, {ends: false});
hexo.extend.tag.register("label", label, {ends: false});


//------------------------------------------------------------------------------------------------------------------------
// 注入 css/js


const path = require('path');
const fs = require('fs');


hexo.extend.filter.register('before_generate', function() {
  const srcPath = path.join(__dirname, 'lib/k-style.css');
  const destPath = path.join(hexo.public_dir, 'css/k-style.css');

  // 确保目标目录存在
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // 复制文件
  fs.copyFileSync(srcPath, destPath);
});

hexo.extend.filter.register('before_generate', function() {
  const srcPath = path.join(__dirname, 'lib/crypto-js.4.1.1.min.js');
  const destPath = path.join(hexo.public_dir, 'js/crypto-js.4.1.1.min.js');

  // 确保目标目录存在
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // 复制文件
  fs.copyFileSync(srcPath, destPath);
});

// 全局注入

hexo.extend.injector.register(
  "head_end", 
  '<link rel="stylesheet" href="/css/k-style.css">',
  "default"
);