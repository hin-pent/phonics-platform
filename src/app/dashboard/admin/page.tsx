'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate, getProgressColor } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 156,
    totalStudents: 120,
    totalTeachers: 25,
    totalParents: 30,
    activeClasses: 8,
    totalHomework: 245,
    avgCompletion: 85,
    systemUptime: '99.9%',
  });

  const sidebarItems = [
    { title: '系统概览', href: '/dashboard/admin', icon: '🗂️' },
    { title: '用户管理', href: '/dashboard/admin/users', icon: '👥' },
    { title: '班级管理', href: '/dashboard/admin/classes', icon: '🏫' },
    { title: '课程管理', href: '/dashboard/admin/courses', icon: '📚' },
    { title: '数据统计', href: '/dashboard/admin/analytics', icon: '📊' },
    { title: '系统设置', href: '/dashboard/admin/settings', icon: '⚙️' },
  ];

  const systemStatus = [
    { name: '服务器状态', status: '正常', icon: '🟢' },
    { name: '数据库连接', status: '正常', icon: '🟢' },
    { name: 'API服务', status: '正常', icon: '🟢' },
    { name: '存储空间', status: '75%', icon: '🟡' },
  ];

  const recentActivities = [
    { type: 'user', title: '新用户注册：小明同学', time: '10分钟前', details: '学生账号' },
    { type: 'homework', title: '作业提交高峰', time: '1小时前', details: '15份作业提交' },
    { type: 'system', title: '系统备份完成', time: '2小时前', details: '自动备份' },
    { type: 'teacher', title: '新教师加入', time: '3小时前', details: '李老师入职' },
  ];

  return (
    <Sidebar items={sidebarItems} title="管理员端">
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🗂️</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                系统管理员，下午好！
              </h1>
              <p className="text-orange-600">拼读乐园系统运行良好</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-900 text-sm font-medium">总用户数</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-900 text-sm font-medium">活跃班级</p>
                  <p className="text-3xl font-bold text-green-900">{stats.activeClasses}</p>
                </div>
                <div className="text-4xl">🏫</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-900 text-sm font-medium">完成率</p>
                  <p className="text-3xl font-bold text-orange-900">{stats.avgCompletion}%</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-900 text-sm font-medium">系统运行</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.systemUptime}</p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">👥 用户分布</CardTitle>
              <CardDescription className="text-orange-600">
                各角色用户数量
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🎓</span>
                  <span className="text-sm font-medium text-blue-900">学生</span>
                </div>
                <span className="text-lg font-bold text-blue-900">{stats.totalStudents}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌿</span>
                  <span className="text-sm font-medium text-green-900">教师</span>
                </div>
                <span className="text-lg font-bold text-green-900">{stats.totalTeachers}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🏡</span>
                  <span className="text-sm font-medium text-orange-900">家长</span>
                </div>
                <span className="text-lg font-bold text-orange-900">{stats.totalParents}</span>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🖥️ 系统状态</CardTitle>
              <CardDescription className="text-orange-600">
                服务运行情况
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-bold text-gray-900">{item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🕰️ 最近活动</CardTitle>
              <CardDescription className="text-orange-600">
                系统操作记录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="p-3 rounded-xl bg-orange-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-orange-900">{activity.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-orange-600 mt-1">
                        <span>{activity.time}</span>
                        <span>·</span>
                        <span>{activity.details}</span>
                      </div>
                    </div>
                    <div className="text-lg">
                      {activity.type === 'user' && '👤'}
                      {activity.type === 'homework' && '📝'}
                      {activity.type === 'system' && '⚙️'}
                      {activity.type === 'teacher' && '👨‍🏫'}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

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
                <span className="text-sm">添加用户</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">🏫</span>
                <span className="text-sm">创建班级</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📊</span>
                <span className="text-sm">查看报表</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">💾</span>
                <span className="text-sm">系统备份</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}