'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function StudentHomeworkPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  // 模拟学生作业数据
  const studentHomeworkList = [
    {
      id: '1',
      title: '26个字母发音练习',
      description: '请录制26个英文字母的标准发音',
      type: 'AUDIO_RECORDING',
      teacherName: '王老师',
      className: '拼读启蒙班',
      dueDate: new Date('2026-02-15T23:59:59'),
      createdAt: new Date('2026-02-10T10:00:00'),
      status: 'pending' as const,
      difficulty: '简单',
      estimatedTime: '15分钟',
      score: null,
      feedback: null,
      submittedAt: null,
    },
    {
      id: '2',
      title: '短元音拼读测试',
      description: '选择题测试，考查对短元音的掌握',
      type: 'MULTIPLE_CHOICE',
      teacherName: '王老师',
      className: '拼读启蒙班',
      dueDate: new Date('2026-02-12T23:59:59'),
      createdAt: new Date('2026-02-08T14:30:00'),
      status: 'graded' as const,
      difficulty: '中等',
      estimatedTime: '10分钟',
      score: 92,
      feedback: '表现很好！对短元音的掌握很扎实。',
      submittedAt: new Date('2026-02-11T20:15:00'),
    },
    {
      id: '3',
      title: 'CVC单词拼读练习',
      description: '练习辅音+元音+辅音的三字母单词拼读',
      type: 'DRAG_DROP',
      teacherName: '王老师',
      className: '拼读启蒙班',
      dueDate: new Date('2026-02-18T23:59:59'),
      createdAt: new Date('2026-02-11T16:45:00'),
      status: 'submitted' as const,
      difficulty: '中等',
      estimatedTime: '20分钟',
      score: null,
      feedback: null,
      submittedAt: new Date('2026-02-13T19:30:00'),
    },
    {
      id: '4',
      title: '字母组合单词拼读',
      description: '学习sh, ch, th等字母组合的发音规则',
      type: 'TEXT_SUBMISSION',
      teacherName: '王老师',
      className: '拼读启蒙班',
      dueDate: new Date('2026-02-20T23:59:59'),
      createdAt: new Date('2026-02-12T09:00:00'),
      status: 'pending' as const,
      difficulty: '较难',
      estimatedTime: '25分钟',
      score: null,
      feedback: null,
      submittedAt: null,
    },
  ];

  const getHomeworkTypeIcon = (type: string) => {
    switch (type) {
      case 'AUDIO_RECORDING': return '🎤';
      case 'MULTIPLE_CHOICE': return '✅';
      case 'TEXT_SUBMISSION': return '📝';
      case 'DRAG_DROP': return '🎯';
      case 'QUIZ': return '📋';
      default: return '📄';
    }
  };

  const getHomeworkTypeName = (type: string) => {
    switch (type) {
      case 'AUDIO_RECORDING': return '录音练习';
      case 'MULTIPLE_CHOICE': return '选择题';
      case 'TEXT_SUBMISSION': return '文本提交';
      case 'DRAG_DROP': return '拖拽练习';
      case 'QUIZ': return '小测验';
      default: return '未知类型';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'graded': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待完成';
      case 'submitted': return '已提交';
      case 'graded': return '已批改';
      default: return '未知状态';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'bg-green-100 text-green-700';
      case '中等': return 'bg-yellow-100 text-yellow-700';
      case '较难': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 95) return '🌟';
    if (score >= 85) return '🎉';
    if (score >= 75) return '👍';
    if (score >= 60) return '😊';
    return '💪';
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  const filteredHomework = studentHomeworkList.filter(homework => {
    switch (filterStatus) {
      case 'pending':
        return homework.status === 'pending' && !isOverdue(homework.dueDate);
      case 'submitted':
        return homework.status === 'submitted';
      case 'graded':
        return homework.status === 'graded';
      default:
        return true;
    }
  });

  const handleStartHomework = (homeworkId: string) => {
    // 跳转到作业详情页面
    router.push(`/dashboard/student/homework/${homeworkId}`);
  };

  return (
    <Sidebar items={sidebarItems} title="作业信箱">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📬</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">作业信箱</h1>
              <p className="text-orange-600">查看和完成老师布置的作业</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 p-1 bg-orange-50 rounded-xl">
            {[
              { value: 'all', label: '全部作业', count: studentHomeworkList.length },
              { value: 'pending', label: '待完成', count: studentHomeworkList.filter(h => h.status === 'pending' && !isOverdue(h.dueDate)).length },
              { value: 'submitted', label: '已提交', count: studentHomeworkList.filter(h => h.status === 'submitted').length },
              { value: 'graded', label: '已批改', count: studentHomeworkList.filter(h => h.status === 'graded').length },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value as any)}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium transition-all",
                  filterStatus === filter.value
                    ? "bg-white text-orange-900 shadow-md"
                    : "text-orange-600 hover:text-orange-900 hover:bg-white/50"
                )}
              >
                {filter.label}
                <span className="ml-2 px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Homework List */}
        <div className="space-y-6">
          {filteredHomework.map((homework) => (
            <Card key={homework.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  {/* 作业信息 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getHomeworkTypeIcon(homework.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-orange-900">{homework.title}</h3>
                        <p className="text-sm text-orange-600">{homework.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center space-x-1">
                        <span>👨‍🏫</span>
                        <span>{homework.teacherName}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🏫</span>
                        <span>{homework.className}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🎯</span>
                        <span>{getHomeworkTypeName(homework.type)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>⏰</span>
                        <span>{homework.estimatedTime}</span>
                      </span>
                    </div>

                    {/* 标签 */}
                    <div className="flex items-center space-x-3">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(homework.status)}`}>
                        {getStatusText(homework.status)}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(homework.difficulty)}`}>
                        {homework.difficulty}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>📅</span>
                        <span>截止：{formatDate(homework.dueDate)}</span>
                        {isOverdue(homework.dueDate) && homework.status === 'pending' && (
                          <span className="text-red-600 font-medium">(已过期)</span>
                        )}
                      </div>
                    </div>

                    {/* 成绩和反馈 */}
                    {homework.status === 'graded' && homework.score && (
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold text-green-900">作业成绩</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{getScoreEmoji(homework.score)}</span>
                            <span className="text-2xl font-bold text-green-900">{homework.score}分</span>
                          </div>
                        </div>
                        {homework.feedback && (
                          <div className="text-sm text-green-800">
                            <strong>老师评语：</strong>{homework.feedback}
                          </div>
                        )}
                      </div>
                    )}

                    {homework.status === 'submitted' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center space-x-2 text-blue-800">
                          <span className="text-lg">✅</span>
                          <span className="font-medium">已提交</span>
                          <span className="text-sm">· 提交时间：{formatDate(homework.submittedAt!)}</span>
                        </div>
                        <div className="text-sm text-blue-700 mt-1">
                          老师正在批改中，请耐心等待...
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex space-x-3">
                  {homework.status === 'pending' && (
                    <Button 
                      onClick={() => handleStartHomework(homework.id)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
                      disabled={isOverdue(homework.dueDate)}
                    >
                      {isOverdue(homework.dueDate) ? '已过期' : '🚀 开始作业'}
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    👁️ 查看详情
                  </Button>
                  
                  {homework.status === 'graded' && (
                    <Button size="sm" variant="outline">
                      📝 查看答案
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredHomework.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-16 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-orange-900 mb-2">暂无作业</h3>
                <p className="text-orange-600">
                  {filterStatus === 'all' ? '老师还没有布置作业' : '该分类下没有作业'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Sidebar>
  );
}