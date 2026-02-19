'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function HomeworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const homeworkId = params.id as string;

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  // 状态管理
  const [homework, setHomework] = useState<any>(null);
  const [studentId, setStudentId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // 获取学生ID和作业详情
  useEffect(() => {
    const loadData = async () => {
      try {
        // 从localStorage获取学生信息
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.role === 'STUDENT' && user.studentProfile?.id) {
            setStudentId(user.studentProfile.id);
          } else {
            // 如果没有学生ID，使用默认值（在实际项目中应该跳转到登录页）
            setStudentId('student-profile-1');
          }
        } else {
          setStudentId('student-profile-1');
        }

        // 获取作业详情
        const response = await fetch(`/api/v1/homework?homeworkId=${homeworkId}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data.length > 0) {
            const homeworkData = result.data[0];
            setHomework(homeworkData);
          }
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecordedChunks(chunks);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // 计时器
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // 模拟停止录音（实际应该有停止按钮）
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        clearInterval(timer);
      }, 30000); // 30秒后自动停止

    } catch (error) {
      console.error('录音失败:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // 这里会触发 mediaRecorder.onstop
  };

  const retakeRecording = () => {
    setAudioUrl('');
    setRecordedChunks([]);
    setRecordingTime(0);
  };

  const submitHomework = async () => {
    if (!audioUrl) {
      alert('请先完成录音再提交');
      return;
    }

    setIsSubmitting(true);

    try {
      // 使用真实API调用
      const formData = new FormData();
      if (recordedChunks.length > 0) {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        formData.append('audio', audioBlob, 'homework-audio.webm');
      }
      formData.append('homeworkId', homework.id);
      formData.append('studentId', studentId);
      formData.append('content', '音频文件已提交');

      const response = await fetch('/api/v1/submissions', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert('作业提交成功！🎉');
        router.push('/dashboard/student/homework');
      } else {
        alert(`提交失败: ${result.error?.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Sidebar items={sidebarItems} title="作业详情">
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
      <Sidebar items={sidebarItems} title="作业详情">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">作业不存在</h1>
            <Button onClick={() => router.push('/dashboard/student/homework')}>
              🔙 返回作业列表
            </Button>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar items={sidebarItems} title="作业详情">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getHomeworkTypeIcon(homework.type)}</span>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">{homework.title}</h1>
              <p className="text-orange-600">{getHomeworkTypeName(homework.type)} · 约15分钟</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 作业说明 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">📋 作业说明</CardTitle>
                <CardDescription className="text-orange-600">
                  认真阅读作业要求
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{homework.description}</p>
                
                <div className="bg-orange-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-orange-900 mb-3">📝 具体要求：</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">找一个安静的环境进行录音</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">点击录音按钮开始录制</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">按照要求完成发音练习</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">发音要清晰、标准、洪亮</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 录音区域 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-orange-900">🎤 录音练习</CardTitle>
                <CardDescription className="text-orange-600">
                  按要求完成发音录制
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!audioUrl ? (
                  <div className="text-center py-8">
                    <div className="mb-6">
                      {isRecording ? (
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500 rounded-full animate-pulse">
                          <span className="text-white text-4xl">🔴</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors cursor-pointer" onClick={startRecording}>
                          <span className="text-white text-4xl">🎤</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      {isRecording ? (
                        <div>
                          <p className="text-lg font-semibold text-red-600 mb-2">正在录音...</p>
                          <p className="text-3xl font-mono text-gray-700">{formatTime(recordingTime)}</p>
                          <Button 
                            onClick={stopRecording}
                            variant="outline"
                            className="mt-4 border-red-300 text-red-600 hover:bg-red-50"
                          >
                            ⏹️ 停止录音
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg text-gray-600 mb-4">点击麦克风开始录音</p>
                          <Button 
                            onClick={startRecording}
                            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
                          >
                            🎤 开始录音
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full">
                        <span className="text-white text-4xl">✅</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-lg font-semibold text-green-600 mb-4">录音完成！</p>
                      <audio controls className="w-full max-w-md mx-auto">
                        <source src={audioUrl} type="audio/webm" />
                        您的浏览器不支持音频播放
                      </audio>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={retakeRecording}
                        variant="outline"
                      >
                        🔄 重新录音
                      </Button>
                      <Button 
                        onClick={submitHomework}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold"
                      >
                        {isSubmitting ? '🚀 提交中...' : '📤 提交作业'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 作业信息 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">📊 作业信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">任课老师</span>
                  <span className="font-medium">{homework.teacherName || '未知教师'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">所属班级</span>
                  <span className="font-medium">{homework.className || '未知班级'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">作业类型</span>
                  <span className="font-medium">{getHomeworkTypeName(homework.type)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">难度等级</span>
                  <span className="font-medium">简单</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">预计时长</span>
                  <span className="font-medium">约15分钟</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">截止时间</span>
                    <span className="font-medium text-orange-600">{formatDate(new Date(homework.dueDate))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快捷操作 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">🔗 快捷操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📖 查看相关知识
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 咨询老师
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/dashboard/student/homework')}>
                  🔙 返回作业列表
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}