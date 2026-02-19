'use client';

import { useState } from 'react';
import { 
  CartoonButton, 
  CartoonCard, 
  CartoonProgress, 
  CartoonBadge, 
  CartoonIcon,
  CartoonBorder 
} from '@/components/ui/cartoon';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout/sidebar';
import '@/styles/cartoon-design-system.css';

// 示例：成就系统页面 - 可以在未来的功能中使用卡通风格
export default function AchievementPage() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '🏅 成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  const achievements = [
    {
      id: 'first-letter',
      title: '字母新手',
      description: '完成第一个字母练习',
      icon: '🔤',
      unlocked: true,
      unlockedAt: '2026-02-10',
      rarity: 'common'
    },
    {
      id: 'week-streak',
      title: '学习小达人',
      description: '连续学习7天',
      icon: '🔥',
      unlocked: true,
      unlockedAt: '2026-02-12',
      rarity: 'rare'
    },
    {
      id: 'perfect-score',
      title: '拼读小能手',
      description: '连续10次练习获得满分',
      icon: '⭐',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: 'sound-master',
      title: '发音大师',
      description: '掌握所有26个字母发音',
      icon: '🎤',
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const progressStats = [
    { label: '学习天数', value: 12, icon: '📅', color: 'orange' },
    { label: '完成练习', value: 45, icon: '✏️', color: 'blue' },
    { label: '获得积分', value: 850, icon: '⭐', color: 'yellow' },
    { label: '连续学习', value: 5, icon: '🔥', color: 'green' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common': return '普通';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      default: return '普通';
    }
  };

  return (
    <Sidebar items={sidebarItems} title="成就柜">
      <div className="min-h-screen bg-pattern-cartoon p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <CartoonIcon size="xl" animate="float">
            🏆
          </CartoonIcon>
          <h1 className="font-heading text-5xl text-orange-800 mb-3">
            我的成就柜
          </h1>
          <p className="font-cartoon text-xl text-orange-600">
            收集学习徽章，记录成长足迹！
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {progressStats.map((stat, index) => (
            <CartoonCard key={index} variant={stat.color as any}>
              <div className="text-center">
                <CartoonIcon size="lg" animate="bounce">
                  {stat.icon}
                </CartoonIcon>
                <div className="mt-3">
                  <div className="font-heading text-3xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="font-cartoon text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CartoonCard>
          ))}
        </div>

        {/* Overall Progress */}
        <CartoonBorder className="mb-8">
          <div className="text-center">
            <h3 className="font-heading text-2xl text-orange-800 mb-4">
              总体进度
            </h3>
            <div className="max-w-md mx-auto">
              <CartoonProgress value={65} color="orange" showLabel={true} />
              <p className="font-cartoon text-gray-600 mt-2">
                已解锁 {achievements.filter(a => a.unlocked).length} / {achievements.length} 个成就
              </p>
            </div>
          </div>
        </CartoonBorder>

        {/* Achievements Grid */}
        <div className="mb-8">
          <h3 className="font-heading text-2xl text-orange-800 mb-6 text-center">
            成就徽章
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <CartoonCard 
                key={achievement.id}
                className={`cursor-pointer transition-all duration-300 ${
                  achievement.unlocked ? 'hover:scale-105' : 'opacity-60'
                } ${selectedBadge === achievement.id ? 'ring-4 ring-orange-400' : ''}`}
                onClick={() => setSelectedBadge(achievement.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${getRarityColor(achievement.rarity)}`}>
                    <CartoonIcon size="xl">
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </CartoonIcon>
                  </div>
                  <h4 className="font-cartoon font-bold text-gray-800 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="font-cartoon text-xs text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  <CartoonBadge 
                    variant={achievement.rarity === 'common' ? 'blue' : 
                              achievement.rarity === 'rare' ? 'purple' : 
                              achievement.rarity === 'epic' ? 'green' : 'orange'}
                    >
                    {getRarityBadge(achievement.rarity)}
                  </CartoonBadge>
                  {achievement.unlocked && (
                    <p className="font-cartoon text-xs text-gray-500 mt-2">
                      📅 {achievement.unlockedAt}
                    </p>
                  )}
                </div>
              </CartoonCard>
            ))}
          </div>
        </div>

        {/* Achievement Details Modal */}
        {selectedBadge && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <CartoonCard className="max-w-md w-full animate-slide-in-cartoon">
              <div className="text-center">
                {(() => {
                  const achievement = achievements.find(a => a.id === selectedBadge);
                  if (!achievement) return null;
                  return (
                    <>
                      <CartoonIcon size="xl" animate="bounce">
                        {achievement.unlocked ? achievement.icon : '🔒'}
                      </CartoonIcon>
                      <h3 className="font-heading text-2xl text-orange-800 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="font-cartoon text-gray-600 mb-4">
                        {achievement.description}
                      </p>
                      <CartoonBadge 
                        variant={achievement.rarity === 'common' ? 'blue' : 
                                  achievement.rarity === 'rare' ? 'purple' : 
                                  achievement.rarity === 'epic' ? 'green' : 'orange'}
                      >
                        {getRarityBadge(achievement.rarity)}
                      </CartoonBadge>
                      {achievement.unlocked ? (
                        <p className="font-cartoon text-green-600 mt-4">
                          🎉 已在 {achievement.unlockedAt} 解锁！
                        </p>
                      ) : (
                        <p className="font-cartoon text-orange-600 mt-4">
                          💪 继续努力，即将解锁！
                        </p>
                      )}
                      <CartoonButton 
                        variant="orange" 
                        className="mt-6"
                        onClick={() => setSelectedBadge(null)}
                      >
                        关闭
                      </CartoonButton>
                    </>
                  );
                })()}
              </div>
            </CartoonCard>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center">
          <div className="space-y-4 max-w-md mx-auto">
            <CartoonButton 
              variant="blue" 
              size="lg" 
              icon="🎮"
              className="w-full"
              onClick={() => alert('即将推出成就游戏模式！')}
            >
              成就挑战
            </CartoonButton>
            <CartoonButton 
              variant="green" 
              size="lg" 
              icon="🎁"
              className="w-full"
              onClick={() => alert('即将推出徽章商店！')}
            >
              徽章商店
            </CartoonButton>
          </div>
        </div>

        {/* Fun Decorations */}
        <div className="fixed top-10 right-10 animate-float-cartoon">
          <CartoonIcon size="xl">🌟</CartoonIcon>
        </div>
        <div className="fixed bottom-10 left-10 animate-float-cartoon" style={{ animationDelay: '1s' }}>
          <CartoonIcon size="xl">🎈</CartoonIcon>
        </div>
        <div className="fixed top-1/2 right-10 animate-float-cartoon" style={{ animationDelay: '2s' }}>
          <CartoonIcon size="lg">🌈</CartoonIcon>
        </div>
      </div>
    </Sidebar>
  );
}