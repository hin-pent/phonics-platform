'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function CreateCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficultyLevel: '初级',
    targetAge: '',
    duration: '',
    objectives: [''],
    outline: [''],
  });

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
    { title: '📚 课程管理', href: '/dashboard/teacher/courses', icon: '📚' },
  ];

  const difficultyLevels = [
    { value: '初级', label: '初级', description: '零基础学生，从字母开始', color: 'from-green-500 to-emerald-500' },
    { value: '中级', label: '中级', description: '有一定基础，学习拼读规则', color: 'from-yellow-500 to-orange-500' },
    { value: '高级', label: '高级', description: '基础扎实，学习复杂规则', color: 'from-red-500 to-pink-500' },
  ];

  const courseTemplates = [
    {
      id: 'basic-phonics',
      name: '自然拼读基础课程模板',
      description: '包含26个字母、短元音、CVC单词等基础内容',
      lessons: 12,
      duration: '6周',
    },
    {
      id: 'advanced-phonics',
      name: '自然拼读进阶课程模板',
      description: '包含字母组合、长元音、多音节单词等进阶内容',
      lessons: 16,
      duration: '8周',
    },
    {
      id: 'reading-practice',
      name: '阅读练习课程模板',
      description: '包含短文阅读、理解练习等内容',
      lessons: 20,
      duration: '10周',
    },
  ];

  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, '']
    });
  };

  const removeObjective = (index: number) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, i) => i !== index)
    });
  };

  const updateObjective = (index: number, value: string) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.map((obj, i) => i === index ? value : obj)
    });
  };

  const addOutline = () => {
    setFormData({
      ...formData,
      outline: [...formData.outline, '']
    });
  };

  const removeOutline = (index: number) => {
    setFormData({
      ...formData,
      outline: formData.outline.filter((_, i) => i !== index)
    });
  };

  const updateOutline = (index: number, value: string) => {
    setFormData({
      ...formData,
      outline: formData.outline.map((item, i) => i === index ? value : item)
    });
  };

  const useTemplate = (template: any) => {
    setFormData({
      ...formData,
      name: template.name,
      description: template.description,
      objectives: [
        '掌握字母发音规则',
        '能够拼读简单单词',
        '培养阅读兴趣'
      ],
      outline: [
        '第1-2周：26个字母认知',
        '第3-4周：短元音拼读',
        '第5-6周：CVC单词练习'
      ]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 模拟API调用
      const response = await fetch('/api/v1/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          objectives: formData.objectives.filter(obj => obj.trim()),
          outline: formData.outline.filter(item => item.trim()),
        }),
      });

      if (response.ok) {
        alert('课程创建成功！📚');
        router.push('/dashboard/teacher/courses');
      } else {
        alert('创建失败，请重试');
      }
    } catch (error) {
      console.error('创建课程失败:', error);
      alert('创建失败，请重试');
    }
  };

  return (
    <Sidebar items={sidebarItems} title="创建课程">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">➕</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">创建新课程</h1>
              <p className="text-orange-600">设计你的自然拼读教学内容</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* 课程基本信息 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📋 课程基本信息</CardTitle>
              <CardDescription className="text-orange-600">
                填写课程的基本信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 课程名称 */}
              <div>
                <label className="block text-sm font-medium text-orange-900 mb-2">
                  课程名称 *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例如：自然拼读基础班"
                  className="text-lg"
                  required
                />
              </div>

              {/* 课程描述 */}
              <div>
                <label className="block text-sm font-medium text-orange-900 mb-2">
                  课程描述 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="详细说明课程内容、目标和特色..."
                  className="w-full p-4 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none min-h-32 resize-none"
                  required
                />
              </div>

              {/* 目标年龄和课程时长 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-2">
                    目标年龄
                  </label>
                  <Input
                    value={formData.targetAge}
                    onChange={(e) => setFormData({ ...formData, targetAge: e.target.value })}
                    placeholder="例如：8-10岁"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-2">
                    课程时长
                  </label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="例如：6周"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 难度等级选择 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🎯 难度等级</CardTitle>
              <CardDescription className="text-orange-600">
                选择适合的难度等级
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {difficultyLevels.map((level) => (
                  <label
                    key={level.value}
                    className={cn(
                      "relative block p-4 border-2 rounded-xl cursor-pointer transition-all",
                      formData.difficultyLevel === level.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-orange-200 hover:border-orange-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="difficultyLevel"
                      value={level.value}
                      checked={formData.difficultyLevel === level.value}
                      onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3 bg-gradient-to-r ${level.color}`}>
                        {level.label}
                      </div>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                    {formData.difficultyLevel === level.value && (
                      <div className="absolute top-2 right-2 text-green-500">
                        <span className="text-xl">✅</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 学习目标 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">🎯 学习目标</CardTitle>
              <CardDescription className="text-orange-600">
                设置学生的学习目标
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-orange-600">•</span>
                    <Input
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      placeholder="输入学习目标..."
                      className="flex-1"
                    />
                    {formData.objectives.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeObjective(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        ❌
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addObjective}
                  variant="outline"
                  className="w-full border-dashed border-2"
                >
                  ➕ 添加学习目标
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 课程大纲 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📋 课程大纲</CardTitle>
              <CardDescription className="text-orange-600">
                制定课程的教学大纲
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.outline.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-orange-600">📖</span>
                    <Input
                      value={item}
                      onChange={(e) => updateOutline(index, e.target.value)}
                      placeholder="输入课程章节内容..."
                      className="flex-1"
                    />
                    {formData.outline.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeOutline(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        ❌
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addOutline}
                  variant="outline"
                  className="w-full border-dashed border-2"
                >
                  ➕ 添加课程章节
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 课程模板 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">📋 使用模板</CardTitle>
              <CardDescription className="text-orange-600">
                快速基于模板创建课程
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courseTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 border-2 border-orange-200 rounded-xl hover:border-orange-300 transition-colors"
                  >
                    <h4 className="font-semibold text-orange-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>📖 {template.lessons} 课时</span>
                      <span>⏰ {template.duration}</span>
                    </div>
                    <Button
                      type="button"
                      onClick={() => useTemplate(template)}
                      variant="outline"
                      className="w-full"
                    >
                      📋 使用模板
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/teacher/courses')}
              className="px-8 py-3"
            >
              取消
            </Button>
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
            >
              🚀 创建课程
            </Button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}