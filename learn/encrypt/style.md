## 1

```css
/* 基础样式 */
.k-encrypt {
    background: linear-gradient(135deg, #6a82fb, #fc5c7d);
    border-radius: 15px;
    padding: 20px;
    max-width: 400px;
    margin: 50px auto;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    color: #fff;
    font-family: 'Arial', sans-serif;
}

.text {
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 20px;
}

.input-k-encrypt {
    display: flex;
    flex-direction: column;
}

/* 输入框样式 */
.encrypt {
    position: relative;
    margin-bottom: 15px;
}

.form-control-k-encrypt {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    transition: all 0.3s;
}

.form-control-k-encrypt:focus {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.1);
}

/* 按钮样式 */
.button-k-encrypt {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-k-encrypt {
    background: #ff3d00;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}

.btn-k-encrypt:hover {
    background: #e63900;
    transform: scale(1.05);
}

/* 记住我复选框 */
.remember-me {
    margin-right: 5px;
    accent-color: #ff3d00; /* 设置复选框颜色 */
}

/* 消息提示 */
.text-danger {
    color: #ffcc00;
    text-align: center;
    margin-top: 10px;
    font-size: 1em;
}

/* 动画效果 */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.k-encrypt:hover {
    animation: pulse 1s infinite;
}
```

## 2

```css
/* 基础样式 */
.k-encrypt {
    background: #2c3e50; /* 深色背景 */
    border-radius: 10px;
    padding: 30px;
    max-width: 450px;
    margin: 50px auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    color: #ecf0f1;
    font-family: 'Helvetica', sans-serif;
    position: relative;
    overflow: hidden; /* 确保子元素不溢出 */
}

/* 背景渐变效果 */
.k-encrypt::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(46, 204, 113, 0.1), rgba(241, 196, 15, 0.1));
    z-index: 0;
    filter: blur(10px);
    transition: opacity 0.5s;
}

.text {
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    z-index: 1; /* 提升到前面 */
}

/* 输入框样式 */
.input-k-encrypt {
    display: flex;
    flex-direction: column;
}

.encrypt {
    position: relative;
    margin-bottom: 15px;
}

.form-control-k-encrypt {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: rgba(236, 240, 241, 0.2);
    color: #ecf0f1;
    transition: background 0.3s, box-shadow 0.3s;
}

.form-control-k-encrypt:focus {
    background-color: rgba(236, 240, 241, 0.4);
    box-shadow: 0 0 8px rgba(46, 204, 113, 0.7);
}

/* 按钮样式 */
.button-k-encrypt {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-k-encrypt {
    background: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    position: relative;
    z-index: 1; /* 提升到前面 */
}

.btn-k-encrypt:hover {
    background: #c0392b;
    transform: scale(1.05);
}

/* 记住我复选框 */
.remember-me {
    margin-right: 5px;
    accent-color: #e74c3c; /* 设置复选框颜色 */
}

/* 消息提示 */
.text-danger {
    color: #f39c12;
    text-align: center;
    margin-top: 10px;
    font-size: 1em;
}

/* 动画效果 */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.k-encrypt:hover {
    animation: bounce 1s;
}
```