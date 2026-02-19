'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuthActions } from '@/hooks/use-auth-actions';

interface RoleCard {
  role: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN'>('STUDENT');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { login, isLoading, error, clearError } = useAuthActions();

  const roles: RoleCard[] = [
    {
      role: 'STUDENT',
      title: '学生',
      description: '开始我的拼读学习',
      icon: '🌱',
      color: 'from-blue-500 to-green-500'
    },
    {
      role: 'TEACHER',
      title: '教师',
      description: '管理班级和作业',
      icon: '🌿',
      color: 'from-purple-500 to-pink-500'
    },
    {
      role: 'PARENT',
      title: '家长',
      description: '查看孩子学习情况',
      icon: '🏡',
      color: 'from-orange-500 to-red-500'
    },
    {
      role: 'ADMIN',
      title: '管理员',
      description: '系统管理',
      icon: '🗂️',
      color: 'from-gray-500 to-gray-700'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    clearError();
    
    const credentials = {
      username: formData.username,
      password: formData.password,
      role: selectedRole
    };
    
    await login(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐻</div>
          <h1 className="text-4xl font-bold text-orange-900 mb-2">拼读乐园</h1>
          <p className="text-lg text-orange-600">学习从此刻开始有趣</p>
        </div>

        {/* Combined Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          {/* Role Selection Section */}
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-orange-900 mb-2">选择身份</CardTitle>
            <CardDescription className="text-orange-600 mb-6">
              请选择你的身份角色
            </CardDescription>
            <div className="flex justify-center space-x-4">
              {roles.map((role) => (
                <button
                  key={role.role}
                  onClick={() => setSelectedRole(role.role)}
                  className={cn(
                    "relative group transition-all duration-200",
                    selectedRole === role.role && "scale-110"
                  )}
                  title={role.title}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-full border-3 flex items-center justify-center transition-all duration-200",
                    selectedRole === role.role
                      ? "border-orange-500 bg-gradient-to-r " + role.color + " shadow-lg"
                      : "border-orange-200 bg-white hover:border-orange-300 hover:shadow-md"
                  )}>
                    <span className="text-2xl">{role.icon}</span>
                  </div>
                  <p className={cn(
                    "text-xs mt-2 font-medium transition-all duration-200",
                    selectedRole === role.role
                      ? "text-orange-900 font-bold"
                      : "text-gray-600 group-hover:text-orange-800"
                  )}>
                    {role.title}
                  </p>
                  {selectedRole === role.role && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardHeader>

          {/* Divider */}
          <div className="px-6">
            <div className="flex items-center justify-center">
              <div className="border-t border-orange-200 flex-1"></div>
              <span className="px-4 text-sm text-orange-600">登录账户</span>
              <div className="border-t border-orange-200 flex-1"></div>
            </div>
          </div>

          {/* Login Form Section */}
          <CardContent className="pt-4">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-red-50 border-2 border-red-200">
                <p className="text-red-700 text-sm font-medium">😅 {error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400">
                  <span className="text-xl">👤</span>
                </div>
                <input
                  type="text"
                  placeholder="你的名字"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={cn(
                    "w-full pl-14 pr-4 py-4 rounded-3xl border-2 transition-all duration-300",
                    "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200",
                    "placeholder-orange-400 text-orange-900 font-medium",
                    "focus:outline-none focus:border-orange-500 focus:shadow-lg focus:scale-105",
                    "hover:border-orange-300"
                  )}
                  required
                />
                {formData.username && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                    <span className="text-xl">✨</span>
                  </div>
                )}
              </div>

              {/* Password Input */}
              <Input
                label="密码"
                type="password"
                placeholder="秘密密码"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={cn(
                  "w-full pl-14 pr-4 py-4 rounded-3xl border-2 transition-all duration-300",
                  "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200",
                  "placeholder-orange-400 text-orange-900 font-medium",
                  "focus:outline-none focus:border-orange-500 focus:shadow-lg focus:scale-105",
                  "hover:border-orange-300"
                )}
                required
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-3 text-orange-700 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-5 h-5 rounded-lg border-2 border-orange-300 group-hover:border-orange-400 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs">🌈</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">记住我</span>
                </label>
                <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors">
                  忘了？😅
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-4 rounded-3xl font-bold text-lg transition-all duration-300",
                  "bg-gradient-to-r from-orange-500 to-yellow-500 text-white",
                  "shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "relative overflow-hidden group"
                )}
              >
                <span className="relative z-10">
                  {isLoading ? '🚀 登录中...' : '🎉 开始学习'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-orange-600 text-sm">
                  需要账户请联系您的任课老师
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-orange-600">
          <p>© 2026 拼读乐园</p>
        </div>
      </div>
    </div>
  );
}