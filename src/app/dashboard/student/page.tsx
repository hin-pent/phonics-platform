'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate, getScoreEmoji, getProgressColor } from '@/lib/utils';

export default function StudentDashboard() {
  const [stats] = useState({
    todayPracticeTime: 30,
    weeklyStreak: 5,
    totalPoints: 850,
    completedHomework: 3,
    pendingHomework: 2
  });

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  const recentActivities = [
    { type: 'practice', title: '完成字母练习', time: '2小时前', score: 95 },
    { type: 'homework', title: '提交作业：单词拼读', time: '5小时前', score: 88 },
    { type: 'achievement', title: '获得成就：连续学习5天', time: '昨天', score: null },
  ];

  const upcomingHomework = [
    { title: '字母组合练习', dueTime: '2小时后', difficulty: '简单' },
    { title: '单词拼读测试', dueTime: '明天', difficulty: '中等' },
  ];

  return (
    <Sidebar items={sidebarItems} title="学生端">
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🐻</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                小明同学，下午好！
              </h1>
              <p className="text-orange-600">今天又进步了呢！继续加油！</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-900 text-sm font-medium">今日学习</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.todayPracticeTime}分钟</p>
                </div>
                <div className="text-4xl">⏰</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-100 to-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-900 text-sm font-medium">连续学习</p>
                  <p className="text-3xl font-bold text-green-900">{stats.weeklyStreak}天</p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-100 to-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-900 text-sm font-medium">学习积分</p>
                  <p className="text-3xl font-bold text-yellow-900">{stats.totalPoints}</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-100 to-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-900 text-sm font-medium">作业完成</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.completedHomework}/{stats.completedHomework + stats.pendingHomework}</p>
                </div>
                <div className="text-4xl">📝</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📖 学习旅程</CardTitle>
              <CardDescription className="text-orange-600">
                本周学习进度
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-orange-900 font-medium">字母发音</span>
                    <span className="text-orange-700">85%</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-3">
                    <div className={cn("h-3 rounded-full transition-all duration-500", getProgressColor(85))} style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-orange-900 font-medium">单词拼读</span>
                    <span className="text-orange-700">72%</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-3">
                    <div className={cn("h-3 rounded-full transition-all duration-500", getProgressColor(72))} style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-orange-900 font-medium">句子练习</span>
                    <span className="text-orange-700">60%</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-3">
                    <div className={cn("h-3 rounded-full transition-all duration-500", getProgressColor(60))} style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4">
                继续学习
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🕰️ 最近活动</CardTitle>
              <CardDescription className="text-orange-600">
                学习记录
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-orange-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900">{activity.title}</p>
                    <p className="text-xs text-orange-600">{activity.time}</p>
                  </div>
                  {activity.score && (
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">{getScoreEmoji(activity.score)}</span>
                      <span className="text-sm font-bold text-orange-900">{activity.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Homework */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">📬 作业信箱</CardTitle>
            <CardDescription className="text-orange-600">
              待完成的作业
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingHomework.map((homework, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border-2 border-orange-100 bg-white">
                  <div>
                    <h4 className="font-medium text-orange-900">{homework.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-orange-600">⏰ {homework.dueTime}</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        homework.difficulty === '简单' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {homework.difficulty}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    开始
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}