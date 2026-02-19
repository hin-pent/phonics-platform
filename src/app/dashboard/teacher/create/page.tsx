'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function CreateHomeworkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'MULTIPLE_CHOICE',
    classId: '',
    dueDate: '',
    lessonId: '',
  });

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
  ];

  const classes = [
    { id: 'class-1', name: '拼读启蒙班', grade: '三年级', studentCount: 28 },
    { id: 'class-2', name: '拼读进阶班', grade: '四年级', studentCount: 26 },
  ];

  const homeworkTypes = [
    { value: 'MULTIPLE_CHOICE', label: '选择题', description: '单选或多选题练习', icon: '✅' },
    { value: 'AUDIO_RECORDING', label: '录音练习', description: '学生录制发音练习', icon: '🎤' },
    { value: 'TEXT_SUBMISSION', label: '文本提交', description: '学生填写文本答案', icon: '📝' },
    { value: 'DRAG_DROP', label: '拖拽练习', description: '拖拽匹配练习', icon: '🎯' },
    { value: 'QUIZ', label: '小测验', description: '综合测试题', icon: '📋' },
  ];

  const lessons = [
    { id: 'lesson-1', title: '26个字母认知', course: '自然拼读基础班' },
    { id: 'lesson-2', title: '短元音拼读规则', course: '自然拼读基础班' },
    { id: 'lesson-3', title: '双字母组合', course: '自然拼读进阶班' },
    { id: 'lesson-4', title: 'CVC单词拼读', course: '自然拼读基础班' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 这里会调用API创建作业
    console.log('创建作业:', formData);
    
    // 模拟API调用
    try {
      const response = await fetch('/api/v1/homework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString(),
        }),
      });

      if (response.ok) {
        alert('作业布置成功！');
        router.push('/dashboard/teacher/homework');
      } else {
        alert('布置失败，请重试');
      }
    } catch (error) {
      console.error('创建作业失败:', error);
      alert('布置失败，请重试');
    }
  };

  return (
    <Sidebar items={sidebarItems} title="布置作业">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📝</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">布置新作业</h1>
              <p className="text-orange-600">为学生创建有趣的拼读练习</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* 作业基本信息 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📋 作业基本信息</CardTitle>
              <CardDescription className="text-orange-600">
                填写作业的基本信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 作业标题 */}
              <div>
                <label className="block text-sm font-medium text-orange-900 mb-2">
                  作业标题 *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例如：今日字母发音练习"
                  className="text-lg"
                  required
                />
              </div>

              {/* 作业描述 */}
              <div>
                <label className="block text-sm font-medium text-orange-900 mb-2">
                  作业描述 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="详细说明作业要求和练习内容..."
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none min-h-32 resize-none"
                  required
                />
              </div>

              {/* 截止时间 */}
              <div>
                <label className="block text-sm font-medium text-orange-900 mb-2">
                  截止时间 *
                </label>
                <Input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 选择班级 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🏫 选择班级</CardTitle>
              <CardDescription className="text-orange-600">
                选择要布置作业的班级
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((classInfo) => (
                  <label
                    key={classInfo.id}
                    className={cn(
                      "flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all",
                      formData.classId === classInfo.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-orange-200 hover:border-orange-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="classId"
                      value={classInfo.id}
                      checked={formData.classId === classInfo.id}
                      onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-orange-900">{classInfo.name}</h4>
                      <p className="text-sm text-orange-600">{classInfo.grade} · {classInfo.studentCount}名学生</p>
                    </div>
                    {formData.classId === classInfo.id && (
                      <div className="text-2xl">✅</div>
                    )}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 作业类型 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🎯 作业类型</CardTitle>
              <CardDescription className="text-orange-600">
                选择适合的作业类型
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {homeworkTypes.map((type) => (
                  <label
                    key={type.value}
                    className={cn(
                      "flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all",
                      formData.type === type.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-orange-200 hover:border-orange-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{type.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900">{type.label}</h4>
                        <p className="text-xs text-orange-600">{type.description}</p>
                      </div>
                    </div>
                    {formData.type === type.value && (
                      <div className="text-xl">✅</div>
                    )}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 关联课程（可选） */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📚 关联课程（可选）</CardTitle>
              <CardDescription className="text-orange-600">
                选择相关的课程章节
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={formData.lessonId}
                onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none"
              >
                <option value="">不关联课程</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title} - {lesson.course}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/teacher')}
              className="px-8 py-3"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
            >
              🚀 布置作业
            </Button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}