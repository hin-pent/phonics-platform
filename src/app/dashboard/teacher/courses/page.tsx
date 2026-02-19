'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn, formatDate } from '@/lib/utils';

export default function CourseManagementPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons'>('courses');

  const sidebarItems = [
    { title: '班级园地', href: '/dashboard/teacher', icon: '🌱' },
    { title: '作业信箱', href: '/dashboard/teacher/homework', icon: '📬' },
    { title: '成长日记', href: '/dashboard/teacher/progress', icon: '🌱' },
    { title: '消息树洞', href: '/dashboard/teacher/messages', icon: '🔔' },
    { title: '📝 布置作业', href: '/dashboard/teacher/create', icon: '📝' },
    { title: '📚 课程管理', href: '/dashboard/teacher/courses', icon: '📚' },
  ];

  // 模拟课程数据
  const [courses] = useState([
    {
      id: 'course-basic',
      name: '自然拼读基础班',
      description: '26个字母和基础拼读规则，适合零基础学生',
      difficultyLevel: '初级',
      status: 'active',
      studentCount: 28,
      lessonCount: 12,
      completedLessons: 8,
      createdAt: new Date('2026-01-15'),
      lastUpdated: new Date('2026-02-10'),
    },
    {
      id: 'course-advanced',
      name: '自然拼读进阶班',
      description: '字母组合和复杂拼读规则，适合有一定基础的学生',
      difficultyLevel: '中级',
      status: 'active',
      studentCount: 26,
      lessonCount: 16,
      completedLessons: 10,
      createdAt: new Date('2026-01-20'),
      lastUpdated: new Date('2026-02-08'),
    },
    {
      id: 'course-expert',
      name: '自然拼读高级班',
      description: '多音节单词和阅读理解，适合进阶学生',
      difficultyLevel: '高级',
      status: 'draft',
      studentCount: 0,
      lessonCount: 20,
      completedLessons: 5,
      createdAt: new Date('2026-02-01'),
      lastUpdated: new Date('2026-02-05'),
    },
  ]);

  // 模拟课时数据
  const [lessons] = useState([
    {
      id: 'lesson-1',
      courseId: 'course-basic',
      courseName: '自然拼读基础班',
      title: '26个字母认知',
      orderIndex: 1,
      duration: 45,
      content: '学习26个英文字母的形状、发音和书写...',
      type: 'video',
      status: 'published',
      studentProgress: 85,
      createdAt: new Date('2026-01-16'),
    },
    {
      id: 'lesson-2',
      courseId: 'course-basic',
      courseName: '自然拼读基础班',
      title: '短元音拼读规则',
      orderIndex: 2,
      duration: 40,
      content: '学习a, e, i, o, u的短元音拼读规则...',
      type: 'interactive',
      status: 'published',
      studentProgress: 72,
      createdAt: new Date('2026-01-18'),
    },
    {
      id: 'lesson-3',
      courseId: 'course-basic',
      courseName: '自然拼读基础班',
      title: 'CVC单词拼读',
      orderIndex: 3,
      duration: 50,
      content: '学习辅音+元音+辅音的三字母单词拼读...',
      type: 'practice',
      status: 'published',
      studentProgress: 60,
      createdAt: new Date('2026-01-20'),
    },
    {
      id: 'lesson-4',
      courseId: 'course-advanced',
      courseName: '自然拼读进阶班',
      title: '双字母组合',
      orderIndex: 1,
      duration: 45,
      content: '学习sh, ch, th, ph等双字母组合...',
      type: 'video',
      status: 'published',
      studentProgress: 78,
      createdAt: new Date('2026-01-22'),
    },
    {
      id: 'lesson-5',
      courseId: 'course-advanced',
      courseName: '自然拼读进阶班',
      title: '不发音字母e',
      orderIndex: 2,
      duration: 35,
      content: '学习不发音字母e的规则和应用...',
      type: 'interactive',
      status: 'draft',
      studentProgress: 0,
      createdAt: new Date('2026-02-05'),
    },
  ]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case '初级': return 'bg-green-100 text-green-700';
      case '中级': return 'bg-yellow-100 text-yellow-700';
      case '高级': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '进行中';
      case 'draft': return '草稿';
      case 'archived': return '已归档';
      default: return '未知';
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      case 'practice': return '✏️';
      case 'quiz': return '📝';
      default: return '📄';
    }
  };

  const getLessonTypeName = (type: string) => {
    switch (type) {
      case 'video': return '视频课程';
      case 'interactive': return '互动练习';
      case 'practice': return '练习作业';
      case 'quiz': return '测验';
      default: return '其他';
    }
  };

  const handleCreateCourse = () => {
    window.location.href = '/dashboard/teacher/courses/create';
  };

  const handleEditCourse = (courseId: string) => {
    router.push(`/dashboard/teacher/courses/${courseId}/edit`);
  };

  const handleCreateLesson = (courseId: string) => {
    router.push(`/dashboard/teacher/courses/${courseId}/lessons/create`);
  };

  const handleEditLesson = (lessonId: string) => {
    router.push(`/dashboard/teacher/lessons/${lessonId}/edit`);
  };

  return (
    <Sidebar items={sidebarItems} title="课程管理">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📚</div>
              <div>
                <h1 className="text-3xl font-bold text-orange-900">课程管理</h1>
                <p className="text-orange-600">创建和管理教学内容</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/dashboard/teacher/courses/analytics'}
              >
                📊 数据分析
              </Button>
              <Button 
                onClick={handleCreateCourse}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
              >
                ➕ 创建新课程
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-2 p-1 bg-orange-50 rounded-xl">
            {[
              { value: 'courses', label: '📚 课程管理', count: courses.length },
              { value: 'lessons', label: '📖 课时管理', count: lessons.length },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={cn(
                  "flex-1 p-4 rounded-lg font-medium transition-all text-center",
                  activeTab === tab.value
                    ? "bg-white text-orange-900 shadow-md"
                    : "text-orange-600 hover:text-orange-900 hover:bg-white/50"
                )}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-orange-900 mb-2">{course.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                        {getStatusText(course.status)}
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-orange-600">
                          <span>👥</span>
                          <span className="text-sm">{course.studentCount} 学生</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-blue-600">
                          <span>📖</span>
                          <span className="text-sm">{course.lessonCount} 课时</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>完成进度</span>
                        <span>{Math.round((course.completedLessons / course.lessonCount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${(course.completedLessons / course.lessonCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficultyLevel)}`}>
                        {course.difficultyLevel}
                      </span>
                      <span className="text-xs text-gray-500">
                        更新于 {formatDate(course.lastUpdated)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditCourse(course.id)}
                        className="flex-1"
                      >
                        ✏️ 编辑
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleCreateLesson(course.id)}
                        className="flex-1"
                      >
                        ➕ 添加课时
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border-2 border-orange-100 rounded-xl hover:border-orange-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{getLessonTypeIcon(lesson.type)}</div>
                        <div>
                          <h4 className="font-semibold text-orange-900">{lesson.title}</h4>
                          <p className="text-sm text-orange-600 mb-1">{lesson.courseName}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>📚 第{lesson.orderIndex}课时</span>
                            <span>⏰ {lesson.duration}分钟</span>
                            <span>🎯 {getLessonTypeName(lesson.type)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                          {getStatusText(lesson.status)}
                        </div>
                        {lesson.status === 'published' && (
                          <div className="text-sm text-gray-600">
                            学生进度: {lesson.studentProgress}%
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditLesson(lesson.id)}
                          >
                            ✏️ 编辑
                          </Button>
                          <Button size="sm">
                            👁️ 预览
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">🚀 快速操作</CardTitle>
            <CardDescription className="text-orange-600">
              常用功能快捷入口
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={handleCreateCourse}
                className="w-full h-20 flex-col space-y-2"
              >
                <span className="text-2xl">➕</span>
                <span className="text-sm">创建课程</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/dashboard/teacher/courses/import'}
                className="w-full h-20 flex-col space-y-2"
              >
                <span className="text-2xl">📥</span>
                <span className="text-sm">导入课程</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/dashboard/teacher/courses/templates'}
                className="w-full h-20 flex-col space-y-2"
              >
                <span className="text-2xl">📋</span>
                <span className="text-sm">课程模板</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/dashboard/teacher/courses/analytics'}
                className="w-full h-20 flex-col space-y-2"
              >
                <span className="text-2xl">📊</span>
                <span className="text-sm">数据分析</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}