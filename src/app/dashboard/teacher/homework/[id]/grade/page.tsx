'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function GradeHomeworkPage() {
  const params = useParams();
  const router = useRouter();
  const homeworkId = params.id as string;

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
  ];

  // 状态管理
  const [homework, setHomework] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [gradingData, setGradingData] = useState<{ score: string; feedback: string }>({
    score: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取教师ID
  const [teacherId, setTeacherId] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // 从localStorage获取教师信息
        const userStr = localStorage.getItem('user');
        let currentTeacherId = '';
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.role === 'TEACHER' && user.teacherProfile?.id) {
            currentTeacherId = user.teacherProfile.id;
          } else {
            currentTeacherId = 'teacher-profile-1';
          }
        } else {
          currentTeacherId = 'teacher-profile-1';
        }
        
        setTeacherId(currentTeacherId);

        // 获取作业详情
        const homeworkResponse = await fetch(`/api/v1/homework?homeworkId=${homeworkId}`);
        if (homeworkResponse.ok) {
          const homeworkResult = await homeworkResponse.json();
          if (homeworkResult.success && homeworkResult.data.length > 0) {
            setHomework(homeworkResult.data[0]);
          }
        }

        // 获取提交记录
        const submissionsResponse = await fetch(`/api/v1/submissions?homeworkId=${homeworkId}&teacherId=${currentTeacherId}`);
        if (submissionsResponse.ok) {
          const submissionsResult = await submissionsResponse.json();
          if (submissionsResult.success) {
            setSubmissions(submissionsResult.data);
          }
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (homeworkId) {
      loadData();
    }
  }, [homeworkId]);

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
      case 'submitted': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'graded': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return '待批改';
      case 'graded': return '已批改';
      case 'expired': return '已过期';
      default: return '未知状态';
    }
  };

  const handleSubmitGrade = async () => {
    if (!selectedSubmission || !gradingData.score) {
      alert('请输入分数');
      return;
    }

    const score = parseInt(gradingData.score);
    if (isNaN(score) || score < 0 || score > 100) {
      alert('分数必须在0-100之间');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          score: score,
          feedback: gradingData.feedback,
          gradedBy: teacherId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('批改成功！');
        
        // 更新本地状态
        setSubmissions(submissions.map(sub => 
          sub.id === selectedSubmission.id 
            ? { ...sub, score, feedback: gradingData.feedback, status: 'graded' }
            : sub
        ));
        
        setSelectedSubmission(null);
        setGradingData({ score: '', feedback: '' });
      } else {
        alert(`批改失败: ${result.error?.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('批改失败:', error);
      alert('批改失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Sidebar items={sidebarItems} title="作业批改">
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }

  if (!homework) {
    return (
      <Sidebar items={sidebarItems} title="作业批改">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">作业不存在</h1>
            <Button onClick={() => router.push('/dashboard/teacher/homework')}>
              🔙 返回作业列表
            </Button>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar items={sidebarItems} title="作业批改">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getHomeworkTypeIcon(homework.type)}</span>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">{homework.title}</h1>
              <p className="text-orange-600">{getHomeworkTypeName(homework.type)} · 批改作业</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 提交列表 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">📤 学生提交 ({submissions.length})</CardTitle>
                <CardDescription className="text-orange-600">
                  点击查看和批改学生作业
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                        selectedSubmission?.id === submission.id 
                          ? "border-orange-400 bg-orange-50" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setGradingData({
                          score: submission.score?.toString() || '',
                          feedback: submission.feedback || ''
                        });
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                              <span className="text-orange-800 font-semibold">
                                {submission.student.realName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-orange-900">{submission.student.realName}</h4>
                              <p className="text-sm text-gray-600">{submission.student.grade}</p>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                            <span>提交时间：{formatDate(new Date(submission.submittedAt))}</span>
                            <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(submission.status)}`}>
                              {getStatusText(submission.status)}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {submission.score !== null ? (
                            <div className="text-2xl font-bold text-green-600">{submission.score}分</div>
                          ) : (
                            <div className="text-orange-600 font-medium">待批改</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {submissions.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📭</div>
                      <h3 className="text-xl font-semibold text-orange-900 mb-2">暂无提交</h3>
                      <p className="text-orange-600">还没有学生提交这个作业</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 批改面板 */}
          <div className="space-y-6">
            {selectedSubmission ? (
              <>
                {/* 学生信息 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-900">👤 学生信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-orange-800 font-semibold">
                          {selectedSubmission.student.realName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-900">{selectedSubmission.student.realName}</h4>
                        <p className="text-sm text-gray-600">{selectedSubmission.student.grade}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">提交时间</span>
                        <span>{formatDate(new Date(selectedSubmission.submittedAt))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">提交状态</span>
                        <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(selectedSubmission.status)}`}>
                          {getStatusText(selectedSubmission.status)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 提交内容 */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-900">📄 提交内容</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSubmission.filePath ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-3">音频文件</p>
                        <audio controls className="w-full">
                          <source src={selectedSubmission.filePath} type="audio/webm" />
                          您的浏览器不支持音频播放
                        </audio>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">文本内容</p>
                        <p className="text-gray-800">{selectedSubmission.content}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 批改表单 */}
                {selectedSubmission.status !== 'graded' && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-900">📝 批改作业</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          分数 (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradingData.score}
                          onChange={(e) => setGradingData(prev => ({ ...prev, score: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="请输入分数"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          评语
                        </label>
                        <textarea
                          value={gradingData.feedback}
                          onChange={(e) => setGradingData(prev => ({ ...prev, feedback: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="请输入评语..."
                        />
                      </div>

                      <Button 
                        onClick={handleSubmitGrade}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold"
                      >
                        {isSubmitting ? '🚀 提交中...' : '✅ 提交批改'}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* 已批改信息 */}
                {selectedSubmission.status === 'graded' && (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-900">✅ 批改结果</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {selectedSubmission.score}分
                        </div>
                        <div className="text-sm text-gray-600">
                          批改时间：{formatDate(new Date(selectedSubmission.gradedAt || new Date()))}
                        </div>
                      </div>

                      {selectedSubmission.feedback && (
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">评语：</h5>
                          <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                            {selectedSubmission.feedback}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="py-16 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-orange-900 mb-2">选择学生提交</h3>
                  <p className="text-orange-600">点击左侧的学生提交记录开始批改</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}