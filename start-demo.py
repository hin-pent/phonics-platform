#!/usr/bin/env python3

import http.server
import socketserver
import os
import webbrowser

def open_browser():
    """Open browser after server starts"""
    try:
        webbrowser.open('http://localhost:8080')
    except:
        import subprocess
        import sys
        if sys.platform == 'win32':
            subprocess.Popen(['start', '', 'http://localhost:8080'], shell=True)
        else:
            subprocess.Popen(['open', 'http://localhost:8080'], shell=True)

def main():
    # Configuration
    HOST = 'localhost'
    PORT = 8080
    
    print("🌐 拼读乐园演示服务器")
    print("=" * 50)
    print(f"🚀 启动服务器: http://{HOST}:{PORT}")
    print("=" * 50)
    print("📋 功能特色:")
    print("✅ 4个身份演示 (密码: password123)")
    print("  👨‍💼 管理员: admin1 - 系统管理")
    print("  👨‍🏫 教师: teacher1 - 课程管理")
    print("  👨‍👩‍👧‍👦 家长: parent1-4 - 查看进度")
    print("  👨‍🎓 学生: student1-5 - 作业练习")
    print("✅ 响应式设计 - 支持手机、平板、电脑")
    print("✅ 现代化UI设计")
    print("✅ 完整的平台架构")
    print("=" * 50)
    
    # Start server
    try:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        socketserver.main()
        
        print("\n🌉 服务器启动成功!")
        print(f"📱 访问地址: http://{HOST}:{PORT}")
        print(f"🔗 局域网访问: http://192.168.101.15:{PORT}")
        print("💻 按 Ctrl+C 停止服务器")
        
        # Open browser
        open_browser()
        
    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
    except Exception as e:
        print(f"\n❌ 服务器启动失败: {e}")

if __name__ == "__main__":
    main()