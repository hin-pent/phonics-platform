'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate, getProgressColor } from '@/lib/utils';

export default function ParentDashboard() {
  const [child] = useState({
    name: '小明',
    grade: '三年级',
    todayPracticeTime: 30,
    weeklyStreak: 5,
    totalPoints: 850,
    completionRate: 78,
  });

  const sidebarItems = [
    { title: '学习概览', href: '/dashboard/parent', icon: '🌱' },
    { title: '作业完成', href: '/dashboard/parent/homework', icon: '📝' },
    { title: '成绩查看', href: '/dashboard/parent/grades', icon: '📈' },
    { title: '成长记录', href: '/dashboard/parent/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/parent/messages', icon: '🔔' },
  ];

  const recentHomework = [
    { title: '字母组合练习', score: 95, completedAt: '2小时前', feedback: '很棒！继续加油！' },
    { title: '单词拼读测试', score: 88, completedAt: '昨天', feedback: '发音有很大进步' },
    { title: '句子朗读', score: 92, completedAt: '2天前', feedback: '语调很自然' },
  ];

  const weeklyProgress = [
    { day: '周一', time: 25, completed: true },
    { day: '周二', time: 30, completed: true },
    { day: '周三', time: 0, completed: false },
    { day: '周四', time: 45, completed: true },
    { day: '周五', time: 35, completed: true },
    { day: '周六', time: 20, completed: true },
    { day: '周日', time: 15, completed: true },
  ];

  return (
    <Sidebar items={sidebarItems} title="家长端">
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🏡</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                小明爸爸，下午好！
              </h1>
              <p className="text-orange-600">{child.name}这周学习很认真呢！</p>
            </div>
          </div>
        </div>

        {/* Child Info Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-green-100 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-2xl">
                  👶
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">{child.name}</h3>
                  <p className="text-blue-700">{child.grade}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-700">连续学习</span>
                  <span className="text-xl font-bold text-blue-900">{child.weeklyStreak}天</span>
                  <span className="text-xl">🔥</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-700">学习积分</span>
                  <span className="text-xl font-bold text-green-900">{child.totalPoints}</span>
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-900 text-sm font-medium">今日学习</p>
                  <p className="text-3xl font-bold text-orange-900">{child.todayPracticeTime}分钟</p>
                </div>
                <div className="text-4xl">⏰</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-900 text-sm font-medium">完成率</p>
                  <p className="text-3xl font-bold text-green-900">{child.completionRate}%</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-900 text-sm font-medium">本周排名</p>
                  <p className="text-3xl font-bold text-purple-900">#3</p>
                </div>
                <div className="text-4xl">🏆</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Homework */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📝 作业完成情况</CardTitle>
              <CardDescription className="text-orange-600">
                最近的学习成果
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentHomework.map((homework, index) => (
                <div key={index} className="p-4 rounded-xl border-2 border-orange-100 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-900">{homework.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-orange-600">
                        <span>⏰ {homework.completedAt}</span>
                        <span>📊 {homework.score}分</span>
                      </div>
                      {homework.feedback && (
                        <p className="text-sm text-green-700 mt-2">
                          💬 {homework.feedback}
                        </p>
                      )}
                    </div>
                    <div className="text-2xl">
                      {homework.score >= 90 ? '🌟' : homework.score >= 80 ? '😊' : '🙂'}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📅 本周学习</CardTitle>
              <CardDescription className="text-orange-600">
                学习时间分布
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "w-3 h-3 rounded-full",
                      day.completed ? "bg-green-500" : "bg-gray-300"
                    )}></span>
                    <span className="text-sm font-medium text-orange-900">{day.day}</span>
                  </div>
                  <span className="text-sm text-orange-700">
                    {day.completed ? `${day.time}分钟` : '未学习'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Teacher Contact */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">👨‍🏫 联系老师</CardTitle>
            <CardDescription className="text-orange-600">
              与任课老师沟通
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border-2 border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🌿</div>
                <div>
                  <h4 className="font-semibold text-blue-900">王老师</h4>
                  <p className="text-sm text-blue-700">拼读课程 · 自然拼读老师</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                发消息
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}