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
