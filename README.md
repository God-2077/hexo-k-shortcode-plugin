## 一个 Hexo 的短代码插件

虽然官方正式名称应该叫标签插件，但我更愿意叫它短代码插件

通过短代码，你可以很轻松的在文本中插入隐藏文本、提示等等。能让你的文章表达形式更加丰富

## ***注意***

**注意本插件正处于开发初期阶段，可能会有各种bug**

本人技术有限，在校学生，高考的学习压力大，开发进度不及时。随缘开发。

本人的需求是开发的根本动力，写的代码基本是满足我自己需要。

## 使用

安装插件

```bash
npm install hexo-k-shortcode-plugin --save
```

然后就在文章或页面输入你的代码

## 短代码

### 隐藏文本

#### 介绍

该短代码可以插入一段隐藏文本。

#### 用法

```md
{% hidden 内容 参数名:参数%}
```

#### 参数

| 参数名 | 可选值          | 默认值 | 解释                       | 是否必须 |
| ------ | --------------- | ------ | -------------------------- | -------- |
| type   | blur/background | blur   | 隐藏的形式 (模糊/黑条)     | 否       |
| color  | 字符串          | 无     | 鼠标移上一段时间后显示的话 | 否       |
| show   | 字符串          | true   | 隐藏效果消除，显示文本     | 否       |

#### 示例

```md
{% hidden 这世界就是个错误！ type:blur title:鼠标停留会有提示 show:true %} 
<br />
{% hidden 这世界就是个错误！ type:background show:true %}
<br />
{% hidden 这世界就是个错误！ type:blur title:这世界就是个错误！ %} 
```

![隐藏文本示例(鼠标不见了)](https://github.com/user-attachments/assets/2941cd16-d86b-4ff4-92e5-e05b4689c8e1)



### 标签

#### 介绍

该短代码可以插入一个标签。

#### 用法

```md
{% label 内容 参数名:参数%}
```

#### 参数

| 参数名 | 可选值                       | 默认值 | 解释                  | 是否必须 |
| ------ | ---------------------------- | ------ | --------------------- | -------- |
| color  | indigo/green/red/blue/orange | indigo | 标签颜色              | 否       |
| shape  | square/round                 | square | 标签形状（方形/圆形） | 否       |

#### 示例

```md
## 方形

{% label 默认标签 %} {% label 靛蓝标签 color:indigo %} {% label 绿色标签 color:green %} {% label 红色标签 color:red %} {% label 蓝色标签 color:blue %} {% label 橙色标签 color:orange %}

## 圆形

{% label 靛蓝标签 color:indigo shape:round %} {% label 绿色标签 color:green shape:round %} {% label 红色标签 color:red shape:round %} {% label 蓝色标签 color:blue shape:round %} {% label 橙色标签 color:orange shape:round %}
```

![image](https://github.com/user-attachments/assets/2cea7cca-7c01-44db-b79d-e9979cdc5ff1)


