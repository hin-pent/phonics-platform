'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  const practiceCategories = [
    { 
      id: 'all', 
      name: '全部练习', 
      icon: '🎪', 
      color: 'from-purple-500 to-pink-500',
      description: '所有类型的拼读练习'
    },
    { 
      id: 'letters', 
      name: '字母发音', 
      icon: '🔤', 
      color: 'from-blue-500 to-cyan-500',
      description: '26个英文字母发音练习'
    },
    { 
      id: 'short-vowels', 
      name: '短元音', 
      icon: '🅰️', 
      color: 'from-green-500 to-emerald-500',
      description: 'a, e, i, o, u短元音练习'
    },
    { 
      id: 'long-vowels', 
      name: '长元音', 
      icon: '🅰️', 
      color: 'from-yellow-500 to-orange-500',
      description: '长元音发音规则练习'
    },
    { 
      id: 'consonants', 
      name: '辅音组合', 
      icon: '🔤', 
      color: 'from-red-500 to-pink-500',
      description: 'sh, ch, th等辅音组合'
    },
    { 
      id: 'cvc', 
      name: 'CVC单词', 
      icon: '📝', 
      color: 'from-indigo-500 to-purple-500',
      description: '三字母单词拼读练习'
    },
    { 
      id: 'sentences', 
      name: '句子跟读', 
      icon: '📖', 
      color: 'from-teal-500 to-green-500',
      description: '完整句子朗读练习'
    },
  ];

  const practiceModules = [
    {
      id: 'letter-recognition',
      category: 'letters',
      title: '字母认知',
      description: '学习26个英文字母的形状和发音',
      difficulty: '简单',
      duration: '10-15分钟',
      progress: 85,
      icon: '🔤',
      color: 'from-blue-100 to-blue-200',
      locked: false,
    },
    {
      id: 'letter-pronunciation',
      category: 'letters',
      title: '字母发音练习',
      description: '跟读练习，掌握标准发音',
      difficulty: '简单',
      duration: '15-20分钟',
      progress: 72,
      icon: '🎤',
      color: 'from-blue-100 to-blue-200',
      locked: false,
    },
    {
      id: 'short-vowel-a',
      category: 'short-vowels',
      title: '短元音 /æ/ (A)',
      description: '学习字母a的短元音发音',
      difficulty: '简单',
      duration: '10分钟',
      progress: 90,
      icon: '🅰️',
      color: 'from-green-100 to-green-200',
      locked: false,
    },
    {
      id: 'short-vowel-e',
      category: 'short-vowels',
      title: '短元音 /e/ (E)',
      description: '学习字母e的短元音发音',
      difficulty: '简单',
      duration: '10分钟',
      progress: 75,
      icon: '🅴️',
      color: 'from-green-100 to-green-200',
      locked: false,
    },
    {
      id: 'short-vowel-i',
      category: 'short-vowels',
      title: '短元音 /ɪ/ (I)',
      description: '学习字母i的短元音发音',
      difficulty: '简单',
      duration: '10分钟',
      progress: 60,
      icon: '🅸️',
      color: 'from-green-100 to-green-200',
      locked: false,
    },
    {
      id: 'cvc-words-basic',
      category: 'cvc',
      title: 'CVC基础单词',
      description: 'cat, dog, sun等简单CVC单词',
      difficulty: '中等',
      duration: '20分钟',
      progress: 45,
      icon: '📝',
      color: 'from-indigo-100 to-indigo-200',
      locked: false,
    },
    {
      id: 'sh-ch-th',
      category: 'consonants',
      title: 'SH/CH/TH组合',
      description: '学习常见辅音字母组合',
      difficulty: '中等',
      duration: '25分钟',
      progress: 30,
      icon: '🔤',
      color: 'from-red-100 to-red-200',
      locked: false,
    },
    {
      id: 'sentence-reading',
      category: 'sentences',
      title: '简单句子朗读',
      description: '朗读包含所学单词的简单句子',
      difficulty: '较难',
      duration: '30分钟',
      progress: 15,
      icon: '📖',
      color: 'from-teal-100 to-teal-200',
      locked: false,
    },
    {
      id: 'advanced-blends',
      category: 'consonants',
      title: '高级辅音组合',
      description: 'bl, cl, fl, gl等复杂组合',
      difficulty: '较难',
      duration: '30分钟',
      progress: 0,
      icon: '🔤',
      color: 'from-red-100 to-red-200',
      locked: true,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'bg-green-100 text-green-700';
      case '中等': return 'bg-yellow-100 text-yellow-700';
      case '较难': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const filteredModules = selectedCategory === 'all' 
    ? practiceModules 
    : practiceModules.filter(module => module.category === selectedCategory);

  const startPractice = (moduleId: string) => {
    router.push(`/dashboard/student/practice/${moduleId}`);
  };

  return (
    <Sidebar items={sidebarItems} title="拼读乐园">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🎪</div>
            <div>
              <h1 className="text-3xl font-bold text-orange-900">拼读乐园</h1>
              <p className="text-orange-600">有趣的互动练习，让学习更轻松！</p>
            </div>
          </div>
        </div>

        {/* Practice Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-900 mb-4">选择练习类型</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {practiceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all text-center group",
                  selectedCategory === category.id
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-orange-200 hover:border-orange-300 hover:bg-orange-50/50"
                )}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="text-xs font-medium text-orange-900 group-hover:text-orange-700">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Practice Modules */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-orange-900">
              {practiceCategories.find(c => c.id === selectedCategory)?.name || '全部练习'}
            </h2>
            <div className="text-sm text-orange-600">
              {filteredModules.filter(m => !m.locked).length} 个可练习 · {filteredModules.filter(m => m.locked).length} 个待解锁
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card 
                key={module.id} 
                className={cn(
                  "border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden",
                  module.locked && "opacity-75"
                )}
              >
                {/* Header */}
                <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                
                <CardContent className="p-6">
                  {/* Module Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{module.icon}</div>
                      <div>
                        <h3 className="font-semibold text-orange-900">{module.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                            {module.difficulty}
                          </span>
                          <span className="text-xs text-gray-600">⏰ {module.duration}</span>
                        </div>
                      </div>
                    </div>
                    {module.locked && (
                      <div className="text-2xl">🔒</div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                  {/* Progress */}
                  {module.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>学习进度</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(module.progress)}`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    onClick={() => startPractice(module.id)}
                    disabled={module.locked}
                    className={cn(
                      "w-full font-semibold",
                      module.locked 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg"
                    )}
                  >
                    {module.locked ? '🔒 未解锁' : module.progress > 0 ? '🔄 继续练习' : '🚀 开始练习'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-16 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-orange-900 mb-2">暂无练习</h3>
                <p className="text-orange-600">该分类下还没有练习内容</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Learning Tips */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">💡 学习小贴士</CardTitle>
            <CardDescription className="text-orange-600">
              高效练习的建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">专注练习</h4>
                  <p className="text-sm text-blue-700">每次选择1-2个模块，专心完成</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                <div className="text-2xl">🔄</div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">定期复习</h4>
                  <p className="text-sm text-green-700">已完成的内容也要经常复习巩固</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl">🏆</div>
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">循序渐进</h4>
                  <p className="text-sm text-purple-700">按照难度等级逐步提升练习</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
}