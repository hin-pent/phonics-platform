'use client';

import { useState } from 'react';
import { 
  CartoonButton, 
  CartoonCard, 
  CartoonCardHeader, 
  CartoonInput, 
  CartoonProgress, 
  CartoonBadge, 
  CartoonIcon,
  CartoonBorder 
} from '@/components/ui/cartoon';
import '@/styles/cartoon-design-system.css';

// 卡通教育风格组件演示页面
export default function CartoonDemo() {
  const [inputValue, setInputValue] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-pattern-cartoon p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <CartoonIcon size="2xl" animate="bounce">
          🎨
        </CartoonIcon>
        <h1 className="font-heading text-4xl text-orange-800 mb-3">
          卡通教育风格组件展示
        </h1>
        <p className="font-cartoon text-lg text-orange-600">
          为拼读乐园设计的童趣UI组件库
        </p>
      </div>

      {/* Buttons Section */}
      <div className="mb-12">
        <h2 className="font-heading text-2xl text-orange-800 mb-6 text-center">
          🎯 卡通按钮
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <CartoonButton variant="orange" animate="bounce">
            🚀 开始
          </CartoonButton>
          <CartoonButton variant="blue" animate="wiggle">
            🎮 游戏
          </CartoonButton>
          <CartoonButton variant="green" animate="pulse">
            ✨ 学习
          </CartoonButton>
          <CartoonButton variant="purple" size="lg">
            🏆 成就
          </CartoonButton>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mb-12">
        <h2 className="font-heading text-2xl text-orange-800 mb-6 text-center">
          📋 卡通卡片
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <CartoonCard variant="orange" className="cursor-pointer hover:scale-105 transition-transform">
            <CartoonCardHeader 
              icon="🌱" 
              title="成长记录" 
              subtitle="见证学习的每一个进步"
            />
            <div className="text-center py-4">
              <CartoonProgress value={75} color="orange" />
              <p className="font-cartoon text-sm text-gray-600 mt-2">
                已完成75%的学习目标
              </p>
            </div>
          </CartoonCard>

          <CartoonCard variant="blue">
            <CartoonCardHeader 
              icon="📚" 
              title="今日课程" 
              subtitle="字母发音练习"
            />
            <div className="text-center py-4">
              <CartoonBadge variant="blue">进行中</CartoonBadge>
              <p className="font-cartoon text-sm text-gray-600 mt-2">
                还需要20分钟完成
              </p>
            </div>
          </CartoonCard>

          <CartoonCard variant="green">
            <CartoonCardHeader 
              icon="🎯" 
              title="今日目标" 
              subtitle="完成3个练习"
            />
            <div className="text-center py-4">
              <div className="flex justify-center space-x-2">
                <CartoonIcon size="lg">✅</CartoonIcon>
                <CartoonIcon size="lg">✅</CartoonIcon>
                <CartoonIcon size="lg">🔒</CartoonIcon>
              </div>
              <p className="font-cartoon text-sm text-gray-600 mt-2">
                已完成2/3个目标
              </p>
            </div>
          </CartoonCard>
        </div>
      </div>

      {/* Input and Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Input Demo */}
        <CartoonCard variant="purple">
          <CartoonCardHeader 
            icon="📝" 
            title="输入框演示" 
            subtitle="卡通风格的输入体验"
          />
          <div className="space-y-4">
            <CartoonInput 
              label="你的名字" 
              icon="👤"
              placeholder="请输入你的名字"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <CartoonInput 
              label="魔法密码" 
              icon="🔑"
              type="password"
              placeholder="输入密码"
              error={inputValue.length > 0 && inputValue.length < 3 ? "名字太短了！" : ""}
            />
          </div>
        </CartoonCard>

        {/* Progress Demo */}
        <CartoonCard variant="orange">
          <CartoonCardHeader 
            icon="📊" 
            title="进度条演示" 
            subtitle="学习进度可视化"
          />
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-cartoon">字母发音</span>
                <span className="font-cartoon">85%</span>
              </div>
              <CartoonProgress value={85} color="orange" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-cartoon">单词拼读</span>
                <span className="font-cartoon">60%</span>
              </div>
              <CartoonProgress value={60} color="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-cartoon">句子朗读</span>
                <span className="font-cartoon">45%</span>
              </div>
              <CartoonProgress value={45} color="green" />
            </div>
          </div>
        </CartoonCard>
      </div>

      {/* Badges and Icons Section */}
      <div className="mb-12">
        <h2 className="font-heading text-2xl text-orange-800 mb-6 text-center">
          🏅 徽章和图标
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <CartoonBadge variant="orange" className="mb-2">初级</CartoonBadge>
            <p className="font-cartoon text-sm text-gray-600">基础学习者</p>
          </div>
          <div className="text-center">
            <CartoonBadge variant="blue" className="mb-2">进阶</CartoonBadge>
            <p className="font-cartoon text-sm text-gray-600">掌握拼读规则</p>
          </div>
          <div className="text-center">
            <CartoonBadge variant="green" className="mb-2">高级</CartoonBadge>
            <p className="font-cartoon text-sm text-gray-600">流利阅读</p>
          </div>
          <div className="text-center">
            <CartoonBadge variant="purple" className="mb-2">大师</CartoonBadge>
            <p className="font-cartoon text-sm text-gray-600">拼读专家</p>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8 max-w-4xl mx-auto">
          <CartoonIcon size="lg" animate="bounce">🌟</CartoonIcon>
          <CartoonIcon size="lg" animate="wiggle">🎈</CartoonIcon>
          <CartoonIcon size="lg" animate="float">🎨</CartoonIcon>
          <CartoonIcon size="lg" animate="pulse">🎯</CartoonIcon>
          <CartoonIcon size="xl" animate="bounce">🏆</CartoonIcon>
          <CartoonIcon size="xl" animate="wiggle">🎪</CartoonIcon>
        </div>
      </div>

      {/* Border Decoration */}
      <div className="max-w-2xl mx-auto mb-12">
        <CartoonBorder>
          <div className="text-center">
            <h3 className="font-heading text-2xl text-orange-800 mb-4">
              🎊 特殊效果展示
            </h3>
            <p className="font-cartoon text-gray-600 mb-6">
              卡通边框装饰让内容更有趣
            </p>
            <CartoonButton 
              variant="green" 
              size="lg"
              onClick={() => alert('卡通效果演示！🎉')}
            >
              🎮 点击体验
            </CartoonButton>
          </div>
        </CartoonBorder>
      </div>

      {/* Color Palette */}
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl text-orange-800 mb-6 text-center">
          🎨 色彩系统
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-full h-20 rounded-cartoon bg-gradient-to-r from-orange-400 to-orange-500 mb-2"></div>
            <p className="font-cartoon text-sm">温暖橙色</p>
          </div>
          <div className="text-center">
            <div className="w-full h-20 rounded-cartoon bg-gradient-to-r from-blue-400 to-blue-500 mb-2"></div>
            <p className="font-cartoon text-sm">专业蓝色</p>
          </div>
          <div className="text-center">
            <div className="w-full h-20 rounded-cartoon bg-gradient-to-r from-green-400 to-green-500 mb-2"></div>
            <p className="font-cartoon text-sm">成长绿色</p>
          </div>
          <div className="text-center">
            <div className="w-full h-20 rounded-cartoon bg-gradient-to-r from-yellow-400 to-yellow-500 mb-2"></div>
            <p className="font-cartoon text-sm">快乐黄色</p>
          </div>
          <div className="text-center">
            <div className="w-full h-20 rounded-cartoon bg-gradient-to-r from-purple-400 to-purple-500 mb-2"></div>
            <p className="font-cartoon text-sm">创意紫色</p>
          </div>
        </div>
      </div>

      {/* Floating Decorations */}
      <CartoonIcon size="xl" animate="float" className="fixed top-10 right-10">🌟</CartoonIcon>
      <CartoonIcon size="xl" animate="float" className="fixed bottom-10 left-10" style={{ animationDelay: '1s' }}>🎈</CartoonIcon>
      <CartoonIcon size="lg" animate="float" className="fixed top-1/2 right-10" style={{ animationDelay: '2s' }}>🌈</CartoonIcon>
    </div>
  );
}