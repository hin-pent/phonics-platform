'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate, getProgressColor } from '@/lib/utils';

export default function TeacherDashboard() {
  const [stats] = useState({
    totalStudents: 54,
    activeClasses: 2,
    pendingHomework: 15,
    averageScore: 85,
  });

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
  ];

  const classes = [
    {
      id: 1,
      name: '拼读启蒙班',
      grade: '三年级',
      studentCount: 28,
      pendingHomework: 15,
      averageScore: 85,
      icon: '🌱'
    },
    {
      id: 2,
      name: '拼读进阶班',
      grade: '四年级',
      studentCount: 26,
      pendingHomework: 12,
      averageScore: 88,
      icon: '🌿'
    }
  ];

  const recentActivities = [
    { type: 'homework', title: '布置作业：字母组合练习', time: '2小时前', class: '拼读启蒙班' },
    { type: 'grade', title: '批改作业：单词拼读', time: '5小时前', class: '拼读进阶班', score: 15 },
    { type: 'student', title: '小明同学提交了作业', time: '昨天', class: '拼读启蒙班' },
  ];

  return (
    <Sidebar items={sidebarItems} title="教师端">
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🌿</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                王老师，下午好！
              </h1>
              <p className="text-orange-600">今天又帮助了好多学生成长呢！</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-900 text-sm font-medium">总学生数</p>
                  <p className="text-3xl font-bold text-green-900">{stats.totalStudents}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-900 text-sm font-medium">管理班级</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.activeClasses}</p>
                </div>
                <div className="text-4xl">🏫</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-900 text-sm font-medium">待批改</p>
                  <p className="text-3xl font-bold text-orange-900">{stats.pendingHomework}</p>
                </div>
                <div className="text-4xl">📝</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-900 text-sm font-medium">平均分</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.averageScore}</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classes Overview */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🏫 我的班级园地</CardTitle>
              <CardDescription className="text-orange-600">
                管理你的班级和学生
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {classes.map((classInfo) => (
                <div key={classInfo.id} className="p-4 rounded-xl border-2 border-orange-100 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{classInfo.icon}</div>
                      <div>
                        <h4 className="font-semibold text-orange-900">{classInfo.name}</h4>
                        <p className="text-sm text-orange-600">{classInfo.grade} · {classInfo.studentCount}名学生</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-orange-600">📝</span>
                        <span className="font-medium">{classInfo.pendingHomework}待批</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm mt-1">
                        <span className="text-orange-600">📊</span>
                        <span className="font-medium">{classInfo.averageScore}分</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      查看详情
                    </Button>
                    <Button size="sm">
                      布置作业
                    </Button>
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
                教学记录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-orange-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900">{activity.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-orange-600">
                      <span>{activity.time}</span>
                      <span>·</span>
                      <span>{activity.class}</span>
                    </div>
                  </div>
                  <div className="text-lg">
                    {activity.type === 'homework' && '📝'}
                    {activity.type === 'grade' && '✅'}
                    {activity.type === 'student' && '👶'}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">🌿 快速操作</CardTitle>
            <CardDescription className="text-orange-600">
              常用功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📝</span>
                <span className="text-sm">布置作业</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📈</span>
                <span className="text-sm">查看统计</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📝</span>
                <span className="text-sm">布置作业</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📚</span>
                <span className="text-sm">课程管理</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📈</span>
                <span className="text-sm">查看统计</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">🌱</span>
                <span className="text-sm">学生管理</span>
              </Button>
              <Button variant="secondary" className="w-full h-20 flex-col space-y-2">
                <span className="text-2xl">📖</span>
                <span className="text-sm">课程管理</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}