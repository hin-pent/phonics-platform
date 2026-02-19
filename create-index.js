const fs = require('fs');
const path = require('path');

console.log('🔧 Creating index.html for Netlify deployment...');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>拼读乐园 - 在线教育平台</title>
  <meta name="description" content="自然拼读培训机构课后练习平台">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                   'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                   sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
    }
    .container {
      max-width: 500px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
      background: linear-gradient(45deg, #fff, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    .emoji {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: block;
      animation: bounce 2s infinite;
    }
    .accounts {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
      margin-top: 20px;
      font-size: 0.9rem;
      line-height: 1.4;
    }
    .account {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.05);
      padding: 10px;
      border-radius: 10px;
      border-left: 4px solid #4CAF50;
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }
    .loading {
      display: inline-block;
      padding: 10px 20px;
      background: linear-gradient(45deg, #FF6B6B, #4CAF50);
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
    }
    .loading:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(76, 175, 80, 0.4);
    }
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      }
    }
    .loading-text {
      font-size: 0.9rem;
      margin-left: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🐻</div>
    <h1>拼读乐园</h1>
    <p>正在跳转到登录页面，请稍候...</p>
    <button class="loading" onclick="window.location.href='/auth/login'">
      <span class="loading-text">🎉 进入学习乐园</span>
    </button>
    
    <div class="accounts">
      <h3>🔑 测试账户信息</h3>
      <p><strong>所有账户密码：password123</strong></p>
      
      <div class="account">
        <span>👨‍💼 管理员:</span> <code>admin1</code>
      </div>
      <div class="account">
        <span>👩‍🏫 教师:</span> <code>teacher1</code>
      </div>
      <div class="account">
        <span>👨‍👩‍👧‍👦 家长:</span> <code>parent1-4</code>
      </div>
      <div class="account">
        <span>👨‍🎓 学生:</span> <code>student1-5</code>
      </div>
      
      <p style="margin-top: 15px; font-size: 0.8rem; opacity: 0.7;">
        🌐 正在部署到 Netlify，稍后将获得永久访问地址
      </p>
    </div>
  </div>

  <script>
    // 自动跳转（3秒后）
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 3000);
    
    // 如果用户没有手动点击，确保跳转
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.location.pathname === '/') {
          window.location.href = '/auth/login';
        }
      }, 3500);
    });
  </script>
</body>
</html>`;

// 写入 index.html 文件
const indexPath = path.join(__dirname, '.next', 'index.html');
fs.writeFileSync(indexPath, htmlContent, 'utf8');

console.log('✅ index.html 创建成功!');
console.log('📁 位置:', indexPath);
console.log('\n🌐 现在可以将 .next 文件夹拖拽到 Netlify 了!');
console.log('\n📋 测试账户 (密码: password123):');
console.log('👨‍💼 管理员: admin1');
console.log('👩‍🏫 教师:   teacher1');
console.log('👨‍👩‍👧‍👦 家长:   parent1-4');
console.log('👨‍🎓 学生:   student1-5');