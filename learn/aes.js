
const crypto = require('crypto');
 
 
function aesEncrypt(data, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
 
 
function aesDecrypt(encrypted, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
 
 
const data = 'hello world';
const key = crypto.randomBytes(32);     // 密钥，一个 Buffer 类
const iv = crypto.randomBytes(16);      // 初始化向量，一个 Buffer 类
const encrypted = aesEncrypt(data, key, iv);
const decrypted = aesDecrypt(encrypted, key, iv);
 
 
console.log(`原始数据: ${data}`);
console.log(`密钥: ${key}`);
console.log(`初始化向量: ${iv}`);
console.log(`加密后的数据: ${encrypted}`);
console.log(`解密后的数据: ${decrypted}`);