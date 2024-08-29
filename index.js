'use strict';

console.log("hello world")

// 在 Hexo 插件中处理传入的参数时，可以利用 args 来获取传入的参数，而 content 用来获取标签中的内容。你可以解析 args 以获取每个参数的键值对。以下是一个示例，展示了如何实现

hexo.extend.tag.register(
  "1tag",
  function (args, content) {
    // 初始化一个对象来存储参数
    let params = {};

    // 遍历 args 数组
    args.forEach((arg) => {
      // 使用 ':' 分割每个参数并存储到对象中
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    });

    // 你可以通过 params 对象访问参数
    let var1 = params.var1; // "123"
    let var2 = params.var2; // "321"

    // 处理 content
    // let contentText = content; // 可以在此处理标签内的内容
    // 换行
    let contentText = content.replace(/\n/g, "<br>");

    // 返回生成的内容
    return `<div>Var1: ${var1}, Var2: ${var2}, Content: ${contentText}</div>`;
  },
  { ends: true }
);

// ---------------------------------------------------------------------------------------------------

// 自闭合标签
// {% bihetag var1:123 var2:321 %}
hexo.extend.tag.register(
  "bihetag",
  function (args) {
    let params = {};
    args.forEach((arg) => {
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    });

    let var1 = params.var1; // "123"
    let var2 = params.var2; // "321"

    return `<div>Var1: ${var1}, Var2: ${var2}</div>`;
  },
  { ends: false } // No content, so ends: false
);


// --------------------------------------------------------------------------------------------------

// 带内容块的标签
// {% nobubitag var1:123 var2:321 %}This is content{% endnobubitag %}

hexo.extend.tag.register(
  "nobubitag",
  function (args, content) {
    let params = {};
    args.forEach((arg) => {
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    });

    let var1 = params.var1; // "123"
    let var2 = params.var2; // "321"
    let contentText = content; // "This is content"

    return `<div>Var1: ${var1}, Var2: ${var2}, Content: ${contentText}</div>`;
  },
  { ends: true } // With content, so ends: true
);



// ------------------------------------------------------------------------------------
 
// {% titletag var1:123 我是内 容 var2:321 我也是 %}

hexo.extend.tag.register(
  "titletag",
  function (args) {
    let content = ""; // 用来存储标签内容
    let params = {
      var1: "默认值", // 为 var1 设置默认值
      var2: "" // 初始化 var2
    };

    // 遍历 args 数组
    args.forEach((arg) => {
      if (arg.includes(":")) {
        // 使用 ':' 分割并存储到 params 对象中
        let [key, value] = arg.split(":");
        if (key && value) {
          params[key] = value;
        }
      } else {
        // 如果没有 ':'，则认为是内容
        content += arg + " ";
      }
    });

    content = content.trim(); // 去除内容两端的多余空格

    // 现在可以访问内容和参数
    let var1 = params.var1; // 如果未设置 var1，则为 "默认值"
    let var2 = params.var2; // 如果未设置 var2，则为空字符串

    // 返回生成的内容
    return `<div>Content: ${content}, Var1: ${var1}, Var2: ${var2}</div>`;
  },
  { ends: false } // 标签不需要闭合
);


// ------------------------------------------------------------------------

// {% tagcontenttag content %}

hexo.extend.tag.register(
  "tagcontenttag",
  function (args) {
    let content = args
    return `<div>tagcontent：${content}</div>`;
  },
  { ends: false } // No content, so ends: false
);

// ------------------------------------------------------------------------

// {% contenttag %}爱了爱了{% endcontenttag %}

hexo.extend.tag.register(
  "contenttag",
  function (args,content) {
    // 替换换行符为 <br> 标签
    let contentText = content.replace(/\n/g, "<br>");
    return `<div>tagcontent：${contentText}</div>`;
  },
  { ends: true } // No content, so ends: false
);











//  'hello' 的短代码

function tag_hello(args) {
  return '<p>hello world</p>';
};



hexo.extend.tag.register(
  "test",
  function (args) {
    let params = {};
    args.forEach((arg) => {
      let [key, value] = arg.split(":");
      if (key && value) {
        params[key] = value;
      }
    });

    let var1 = params.var1; // "123"
    let var2 = params.var2; // "321"

    return `<div>Var1: ${var1}, Var2: ${var2}</div>`;
  },
  { ends: false } // No content, so ends: false
);


// 注册

// hello
hexo.extend.tag.register('hello', tag_hello ,{ ends: false });



// -------------------------------------------------------------------------------------

// import fetch from 'node-fetch';

hexo.extend.tag.register('github_card', async function(args) {
  const username = args[0];

  // GitHub API 请求
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    return `<p>Unable to fetch GitHub data for ${username}</p>`;
  }
  
  const data = await response.json();

  // 生成 HTML 用户卡片
  return `
    <div class="github-card">
      <img src="${data.avatar_url}" alt="${data.login}" width="64px" height="64px" />
      <h3>${data.login}</h3>
      <p>${data.bio || ''}</p>
      <a href="${data.html_url}" target="_blank">View Profile</a>
    </div>
  `;
}, {async: true});


