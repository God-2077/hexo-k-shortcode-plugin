'use strict';


let kdebug = hexo.config.hexo_k_shortcode_plugin?.debug || false;
if (kdebug){
  console.log('\x1B[31m%s\x1B[0m',`hexo-k-shortcode-plugin-debug:${kdebug}`)
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
    console.log('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: khide parameter type ERROR, type=${type}`);
    return `hidden parameter type ERROR `;
  }
  if (show != "true" && show != "false") {
    console.log('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: khide parameter show, show=${show}`);
    return `hidden parameter show ERROR `;
  }

  if (kdebug){console.log('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: type=${type}, title=${title}, show=${show}`);}
  return `<span class="hidden-text hidden-texthidden-text-${type} hidden-texthidden-text-${show}" title="${title}">${contentText}</span>`;
}

// -----------------------------------------------------------------------------------------------------------------------

// 注入标签函数

hexo.extend.tag.register("hidden", hidden, {ends: false});


//------------------------------------------------------------------------------------------------------------------------
// 注入 css


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

// 全局注入

hexo.extend.injector.register(
  "head_end", 
  '<link rel="stylesheet" href="/css/k-style.css">',
  "default"
);