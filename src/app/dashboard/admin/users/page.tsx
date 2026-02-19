'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function UserManagement() {
  const [users] = useState([
    {
      id: 1,
      username: 'student1',
      name: '小明同学',
      role: 'STUDENT',
      grade: '三年级',
      status: 'ACTIVE',
      createdAt: '2026-01-15',
      lastLogin: '2026-02-10'
    },
    {
      id: 2,
      username: 'teacher1',
      name: '王老师',
      role: 'TEACHER',
      subjects: '自然拼读,英语',
      status: 'ACTIVE',
      createdAt: '2026-01-10',
      lastLogin: '2026-02-09'
    },
    {
      id: 3,
      username: 'parent1',
      name: '小明爸爸',
      role: 'PARENT',
      phone: '13800138000',
      status: 'ACTIVE',
      createdAt: '2026-01-12',
      lastLogin: '2026-02-08'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'student' | 'teacher' | 'parent'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sidebarItems = [
    { title: '系统概览', href: '/dashboard/admin', icon: '🗂️' },
    { title: '用户管理', href: '/dashboard/admin/users', icon: '👥' },
    { title: '班级管理', href: '/dashboard/admin/classes', icon: '🏫' },
    { title: '课程管理', href: '/dashboard/admin/courses', icon: '📚' },
    { title: '数据统计', href: '/dashboard/admin/analytics', icon: '📊' },
    { title: '系统设置', href: '/dashboard/admin/settings', icon: '⚙️' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || user.role.toLowerCase() === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const roleColors = {
    STUDUDENT: 'bg-blue-100 text-blue-800',
    TEACHER: 'bg-green-100 text-green-800',
    PARENT: 'bg-orange-100 text-orange-800'
  };

  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    SUSPENDED: 'bg-red-100 text-red-800'
  };

  return (
    <Sidebar items={sidebarItems} title="管理员端">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">👥 用户管理</h1>
          <p className="text-orange-600">管理系统中的所有用户账户</p>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="🔍 搜索用户姓名或用户名..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === 'all' ? 'default' : 'secondary'}
                  onClick={() => setActiveTab('all')}
                >
                  全部
                </Button>
                <Button
                  variant={activeTab === 'student' ? 'default' : 'secondary'}
                  onClick={() => setActiveTab('student')}
                >
                  学生
                </Button>
                <Button
                  variant={activeTab === 'teacher' ? 'default' : 'secondary'}
                  onClick={() => setActiveTab('teacher')}
                >
                  教师
                </Button>
                <Button
                  variant={activeTab === 'parent' ? 'default' : 'secondary'}
                  onClick={() => setActiveTab('parent')}
                >
                  家长
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="p-6 text-center">
              <p className="text-blue-900 text-sm font-medium mb-2">总用户数</p>
              <p className="text-3xl font-bold text-blue-900">156</p>
              <p className="text-blue-700 text-xs mt-2">↑ 12% 本月</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6 text-center">
              <p className="text-green-900 text-sm font-medium mb-2">活跃用户</p>
              <p className="text-3xl font-bold text-green-900">142</p>
              <p className="text-green-700 text-xs mt-2">91% 活跃率</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-orange-200">
            <CardContent className="p-6 text-center">
              <p className="text-orange-900 text-sm font-medium mb-2">本月新增</p>
              <p className="text-3xl font-bold text-orange-900">18</p>
              <p className="text-orange-700 text-xs mt-2">↑ 25% 增长</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6 text-center">
              <p className="text-purple-900 text-sm font-medium mb-2">待审核</p>
              <p className="text-3xl font-bold text-purple-900">3</p>
              <p className="text-purple-700 text-xs mt-2">需要处理</p>
            </CardContent>
          </Card>
        </div>

        {/* User Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">📋 用户列表</CardTitle>
            <CardDescription className="text-orange-600">
              共 {filteredUsers.length} 个用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="text-left py-3 px-4 font-medium text-orange-900">用户信息</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-900">角色</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-900">状态</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-900">创建时间</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-900">最后登录</th>
                    <th className="text-left py-3 px-4 font-medium text-orange-900">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-orange-100 hover:bg-orange-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-orange-900">{user.name}</p>
                          <p className="text-sm text-orange-600">@{user.username}</p>
                          {user.grade && <p className="text-xs text-orange-500">{user.grade}</p>}
                          {user.subjects && <p className="text-xs text-orange-500">{user.subjects}</p>}
                          {user.phone && <p className="text-xs text-orange-500">{user.phone}</p>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role as keyof typeof roleColors]}`}>
                          {user.role === 'STUDENT' && '学生'}
                          {user.role === 'TEACHER' && '教师'}
                          {user.role === 'PARENT' && '家长'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status as keyof typeof statusColors]}`}>
                          {user.status === 'ACTIVE' && '活跃'}
                          {user.status === 'INACTIVE' && '未激活'}
                          {user.status === 'SUSPENDED' && '已暂停'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-orange-700">{user.createdAt}</td>
                      <td className="py-4 px-4 text-sm text-orange-700">{user.lastLogin}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">编辑</Button>
                          <Button size="sm" variant="outline">重置密码</Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            禁用
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">⚡ 快速操作</CardTitle>
            <CardDescription className="text-orange-600">
              常用管理功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">👤</span>
                <span className="text-sm">批量创建</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📥</span>
                <span className="text-sm">导入用户</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📤</span>
                <span className="text-sm">导出用户</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">🔧</span>
                <span className="text-sm">权限管理</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}