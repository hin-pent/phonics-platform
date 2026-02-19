#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 拼读乐园 - 自动部署助手');
console.log('====================================\n');

// 检查项目结构
console.log('📁 检查项目结构...');
const nextDir = path.join(__dirname, '.next');
const buildDir = path.join(__dirname, '.next');

if (!fs.existsSync(nextDir)) {
    console.log('🔧 构建项目...');
    exec('npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ 构建失败:', error);
            process.exit(1);
        }
        console.log('✅ 构建完成!');
        deployToPlatforms();
    });
} else {
    console.log('✅ 项目已构建');
    deployToPlatforms();
}

function deployToPlatforms() {
    console.log('\n📱 检查多个平台...');
    
    // 1. Cloudflare Pages 部署
    console.log('\n🌐 尝试 Cloudflare Pages 部署...');
    exec('npx wrangler pages deploy .next --project-name=phonics-platform', (error, stdout, stderr) => {
        if (error && !stderr.includes('not found')) {
            console.log('❌ Cloudflare Pages 需要安装 wrangler');
            console.log('npm install -g wrangler');
        } else if (!error) {
            console.log('✅ Cloudflare Pages 部署成功!');
            console.log('📱 访问地址: https://phonics-platform.pages.dev');
        } else {
            console.log('⚠️ Cloudflare Pages 部署需要手动配置');
        }
        
        // 2. Netlify 备选
        console.log('\n🌐 Netlify 备选部署...');
        exec('npx netlify deploy --prod --dir=.next --site=phonics-platform --force', (error, stdout, stderr) => {
            if (!error) {
                console.log('✅ Netlify 部署成功!');
                console.log('📱 访问地址: ' + stdout.match(/https:\/\/[^\\s]+/)?.[0]);
            } else {
                console.log('⚠️ Netlify 部署失败，需要手动登录');
            }
        });
    });
}