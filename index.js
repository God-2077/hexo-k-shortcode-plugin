'use strict';

// 所有的标签
const specifiedTags = ['hidden'];

// ---------------------------------------------------------------------------------------------------------------

// 标签主函数

// 隐藏文本
// {% hidden 这世界就是个错误！ type:blur title:字符串 %} 

function hidden(args) {
  let content = ""; // 用来存储标签内容
  let params = {
    type: "blur", // 默认值
    title: ""
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

  if (type != "blur" && type != "background") {
    console.log('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: khide type ERROR，type=${type}`);
    return `hidden type ERROR `;
  }
  console.log('\x1B[31m%s\x1B[0m', `hexo-k-shortcode: type=${type}`);
  return `<span class="hidden-text hidden-texthidden-text-${type}" title="${title}">${contentText}</span>`;
}

// -----------------------------------------------------------------------------------------------------------------------

// 注入标签

hexo.extend.tag.register("hidden", hidden, {ends: false});


//------------------------------------------------------------------------------------------------------------------------
// 注入 css


const path = require('path');
const fs = require('fs');

// 全局变量，用于存储是否存在指定的标签
let hasTags = false;


// 注册标签
// specifiedTags.forEach(tag => {
//   tagfun();
// });

hexo.extend.filter.register('before_generate', function() {
  const srcPath = path.join(__dirname, 'lib/k-style.css');
  const destPath = path.join(hexo.public_dir, 'css/k-style.css');

  // 确保目标目录存在
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // 复制文件
  fs.copyFileSync(srcPath, destPath);
});

hexo.extend.filter.register('after_render:html', function(str, data) {
  if (hasTags) {
    // 注入 CSS 链接到 </head> 之前
    const cssLink = '<link rel="stylesheet" href="/css/k-style.css">';
    str = str.replace('</head>', `${cssLink}\n</head>`);
  }

  return str;
});

// 检查页面是否包含指定的标签
hexo.extend.filter.register('before_post_render', function(data) {
  specifiedTags.forEach(tag => {
    if (data.content.includes(`{% ${tag} `)) {
      hasTags = true;
      return false; // 结束循环
    }
  });

  return data;
});
