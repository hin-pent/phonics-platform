'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function HomeworkListPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'expired'>('all');

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
  ];

  // 模拟作业数据
  const homeworkList = [
    {
      id: '1',
      title: '26个字母发音练习',
      description: '请录制26个英文字母的标准发音',
      type: 'AUDIO_RECORDING',
      className: '拼读启蒙班',
      classId: 'class-1',
      dueDate: new Date('2026-02-15T23:59:59'),
      createdAt: new Date('2026-02-10T10:00:00'),
      totalStudents: 28,
      submittedCount: 22,
      gradedCount: 18,
      status: 'active' as const,
    },
    {
      id: '2',
      title: '短元音拼读测试',
      description: '选择题测试，考查对短元音的掌握',
      type: 'MULTIPLE_CHOICE',
      className: '拼读进阶班',
      classId: 'class-2',
      dueDate: new Date('2026-02-12T23:59:59'),
      createdAt: new Date('2026-02-08T14:30:00'),
      totalStudents: 26,
      submittedCount: 24,
      gradedCount: 24,
      status: 'completed' as const,
    },
    {
      id: '3',
      title: 'CVC单词拼读练习',
      description: '练习辅音+元音+辅音的三字母单词拼读',
      type: 'DRAG_DROP',
      className: '拼读启蒙班',
      classId: 'class-1',
      dueDate: new Date('2026-02-08T23:59:59'),
      createdAt: new Date('2026-02-05T09:15:00'),
      totalStudents: 28,
      submittedCount: 25,
      gradedCount: 20,
      status: 'expired' as const,
    },
    {
      id: '4',
      title: '字母组合单词拼读',
      description: '学习sh, ch, th等字母组合的发音规则',
      type: 'TEXT_SUBMISSION',
      className: '拼读进阶班',
      classId: 'class-2',
      dueDate: new Date('2026-02-18T23:59:59'),
      createdAt: new Date('2026-02-11T16:45:00'),
      totalStudents: 26,
      submittedCount: 8,
      gradedCount: 5,
      status: 'active' as const,
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
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中';
      case 'completed': return '已完成';
      case 'expired': return '已过期';
      default: return '未知状态';
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  const filteredHomework = homeworkList.filter(homework => {
    switch (filterStatus) {
      case 'pending':
        return homework.status === 'active' && !isOverdue(homework.dueDate);
      case 'completed':
        return homework.status === 'completed';
      case 'expired':
        return homework.status === 'expired' || (homework.status === 'active' && isOverdue(homework.dueDate));
      default:
        return true;
    }
  });

  return (
    <Sidebar items={sidebarItems} title="作业信箱">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📬</div>
              <div>
                <h1 className="text-3xl font-bold text-orange-900">作业信箱</h1>
                <p className="text-orange-600">管理所有布置的作业</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard/teacher/create'}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
            >
              📝 布置新作业
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 p-1 bg-orange-50 rounded-xl">
            {[
              { value: 'all', label: '全部作业', count: homeworkList.length },
              { value: 'pending', label: '进行中', count: homeworkList.filter(h => h.status === 'active' && !isOverdue(h.dueDate)).length },
              { value: 'completed', label: '已完成', count: homeworkList.filter(h => h.status === 'completed').length },
              { value: 'expired', label: '已过期', count: homeworkList.filter(h => h.status === 'expired' || (h.status === 'active' && isOverdue(h.dueDate))).length },
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

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <span>🏫</span>
                        <span>{homework.className}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🎯</span>
                        <span>{getHomeworkTypeName(homework.type)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>截止：{formatDate(homework.dueDate)}</span>
                      </span>
                    </div>
                  </div>

                  {/* 状态和统计 */}
                  <div className="text-right space-y-3">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(homework.status)}`}>
                      {getStatusText(homework.status)}
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600">📤</span>
                        <span>{homework.submittedCount}/{homework.totalStudents} 已提交</span>
                      </div>
                      {homework.gradedCount < homework.submittedCount && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <span>⏰</span>
                          <span>{homework.submittedCount - homework.gradedCount} 待批改</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex space-x-3">
                  <Button size="sm" variant="outline">
                    👁️ 查看详情
                  </Button>
                  <Button size="sm" variant="outline">
                    📊 统计分析
                  </Button>
                  {homework.submittedCount > 0 && (
                    <Button 
                      size="sm" 
                      className={homework.submittedCount > homework.gradedCount ? "bg-orange-500 text-white" : ""}
                      onClick={() => window.location.href = `/dashboard/teacher/homework/${homework.id}/grade`}
                    >
                      📝 批改作业 ({homework.submittedCount - homework.gradedCount > 0 ? homework.submittedCount - homework.gradedCount : 0})
                    </Button>
                  )}
                  {homework.status === 'expired' && homework.submittedCount < homework.totalStudents && (
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                      📢 提醒未提交
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
                <p className="text-orange-600 mb-6">
                  {filterStatus === 'all' ? '还没有布置任何作业' : '该分类下没有作业'}
                </p>
                <Button 
                  onClick={() => window.location.href = '/dashboard/teacher/create'}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                >
                  📝 布置第一个作业
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Sidebar>
  );
}