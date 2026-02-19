'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function LetterPracticePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  const sidebarItems = [
    { title: '学习旅程', href: '/dashboard/student', icon: '📖' },
    { title: '作业信箱', href: '/dashboard/student/homework', icon: '📬' },
    { title: '拼读乐园', href: '/dashboard/student/practice', icon: '🎪' },
    { title: '成就柜', href: '/dashboard/student/achievements', icon: '🏅' },
    { title: '消息树洞', href: '/dashboard/student/messages', icon: '🔔' },
  ];

  // 字母发音练习数据
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userRecording, setUserRecording] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<Set<number>>(new Set());
  const [practiceMode, setPracticeMode] = useState<'learn' | 'practice' | 'test'>('learn');

  const alphabet = [
    { letter: 'A', pronunciation: '/eɪ/', example: 'Apple', chinese: '苹果', audio: '/audio/a.mp3' },
    { letter: 'B', pronunciation: '/biː/', example: 'Ball', chinese: '球', audio: '/audio/b.mp3' },
    { letter: 'C', pronunciation: '/siː/', example: 'Cat', chinese: '猫', audio: '/audio/c.mp3' },
    { letter: 'D', pronunciation: '/diː/', example: 'Dog', chinese: '狗', audio: '/audio/d.mp3' },
    { letter: 'E', pronunciation: '/iː/', example: 'Elephant', chinese: '大象', audio: '/audio/e.mp3' },
    { letter: 'F', pronunciation: '/ef/', example: 'Fish', chinese: '鱼', audio: '/audio/f.mp3' },
    { letter: 'G', pronunciation: '/dʒiː/', example: 'Goat', chinese: '山羊', audio: '/audio/g.mp3' },
    { letter: 'H', pronunciation: '/eɪtʃ/', example: 'Hat', chinese: '帽子', audio: '/audio/h.mp3' },
    { letter: 'I', pronunciation: '/aɪ/', example: 'Ice', chinese: '冰', audio: '/audio/i.mp3' },
    { letter: 'J', pronunciation: '/dʒeɪ/', example: 'Jump', chinese: '跳', audio: '/audio/j.mp3' },
    { letter: 'K', pronunciation: '/keɪ/', example: 'Kite', chinese: '风筝', audio: '/audio/k.mp3' },
    { letter: 'L', pronunciation: '/el/', example: 'Lion', chinese: '狮子', audio: '/audio/l.mp3' },
    { letter: 'M', pronunciation: '/em/', example: 'Moon', chinese: '月亮', audio: '/audio/m.mp3' },
    { letter: 'N', pronunciation: '/en/', example: 'Nest', chinese: '鸟巢', audio: '/audio/n.mp3' },
    { letter: 'O', pronunciation: '/oʊ/', example: 'Orange', chinese: '橙子', audio: '/audio/o.mp3' },
    { letter: 'P', pronunciation: '/piː/', example: 'Pen', chinese: '笔', audio: '/audio/p.mp3' },
    { letter: 'Q', pronunciation: '/kjuː/', example: 'Queen', chinese: '女王', audio: '/audio/q.mp3' },
    { letter: 'R', pronunciation: '/ɑːr/', example: 'Rose', chinese: '玫瑰', audio: '/audio/r.mp3' },
    { letter: 'S', pronunciation: '/es/', example: 'Sun', chinese: '太阳', audio: '/audio/s.mp3' },
    { letter: 'T', pronunciation: '/tiː/', example: 'Tree', chinese: '树', audio: '/audio/t.mp3' },
    { letter: 'U', pronunciation: '/juː/', example: 'Umbrella', chinese: '雨伞', audio: '/audio/u.mp3' },
    { letter: 'V', pronunciation: '/viː/', example: 'Van', chinese: '面包车', audio: '/audio/v.mp3' },
    { letter: 'W', pronunciation: '/ˈdʌbəl.juː/', example: 'Water', chinese: '水', audio: '/audio/w.mp3' },
    { letter: 'X', pronunciation: '/eks/', example: 'X-ray', chinese: 'X射线', audio: '/audio/x.mp3' },
    { letter: 'Y', pronunciation: '/waɪ/', example: 'Yellow', chinese: '黄色', audio: '/audio/y.mp3' },
    { letter: 'Z', pronunciation: '/ziː/', example: 'Zebra', chinese: '斑马', audio: '/audio/z.mp3' },
  ];

  const currentLetter = alphabet[currentLetterIndex];
  const progress = Math.round(((completedLetters.size + (showAnswer ? 1 : 0)) / alphabet.length) * 100);

  const playAudio = (audioPath: string) => {
    // 模拟播放音频
    console.log('播放音频:', audioPath);
    // 实际实现: new Audio(audioPath).play();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const url = URL.createObjectURL(event.data);
          setUserRecording(url);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      }, 3000); // 3秒录音

    } catch (error) {
      console.error('录音失败:', error);
      alert('无法访问麦克风');
    }
  };

  const nextLetter = () => {
    if (currentLetterIndex < alphabet.length - 1) {
      setCompletedLetters(prev => new Set(prev).add(currentLetterIndex));
      setCurrentLetterIndex(prev => prev + 1);
      setShowAnswer(false);
      setUserRecording('');
    }
  };

  const prevLetter = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(prev => prev - 1);
      setShowAnswer(false);
      setUserRecording('');
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const completePractice = () => {
    alert(`🎉 恭喜完成字母发音练习！\n正确率：${Math.round((completedLetters.size / alphabet.length) * 100)}%`);
    router.push('/dashboard/student/practice');
  };

  return (
    <Sidebar items={sidebarItems} title="字母发音练习">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🔤</div>
              <div>
                <h1 className="text-3xl font-bold text-orange-900">字母发音练习</h1>
                <p className="text-orange-600">学习26个英文字母的标准发音</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard/student/practice')}
            >
              🔙 返回练习列表
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-orange-900">学习进度</span>
              <span className="text-lg font-bold text-orange-600">{progress}%</span>
            </div>
            <div className="w-full bg-orange-100 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-orange-600 mt-2">
              <span>已完成 {completedLetters.size} 个字母</span>
              <span>共 {alphabet.length} 个字母</span>
            </div>
          </CardContent>
        </Card>

        {/* Practice Mode Selection */}
        <div className="mb-8">
          <div className="flex space-x-2 p-1 bg-orange-50 rounded-xl">
            {[
              { value: 'learn', label: '📖 学习模式', description: '认识字母和发音' },
              { value: 'practice', label: '🎤 练习模式', description: '跟读练习' },
              { value: 'test', label: '📝 测试模式', description: '测试掌握程度' },
            ].map((mode) => (
              <button
                key={mode.value}
                onClick={() => setPracticeMode(mode.value as any)}
                className={cn(
                  "flex-1 p-4 rounded-lg transition-all text-center",
                  practiceMode === mode.value
                    ? "bg-white text-orange-900 shadow-md"
                    : "text-orange-600 hover:text-orange-900 hover:bg-white/50"
                )}
              >
                <div className="font-semibold">{mode.label}</div>
                <div className="text-xs mt-1">{mode.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Practice Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Letter Display */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="text-9xl font-bold text-orange-900 mb-4">
                    {currentLetter.letter}
                  </div>
                  
                  {showAnswer && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-3xl text-blue-600 font-medium">
                        {currentLetter.pronunciation}
                      </div>
                      <div className="text-xl text-gray-700">
                        {currentLetter.example}
                      </div>
                      <div className="text-lg text-gray-600">
                        ({currentLetter.chinese})
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                  <Button 
                    onClick={() => playAudio(currentLetter.audio)}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    size="lg"
                  >
                    🔊 播放发音
                  </Button>
                  
                  {!showAnswer && (
                    <Button 
                      onClick={handleShowAnswer}
                      className="bg-green-500 text-white hover:bg-green-600"
                      size="lg"
                    >
                      👁️ 显示答案
                    </Button>
                  )}
                </div>

                {/* Recording Section */}
                {showAnswer && practiceMode !== 'learn' && (
                  <div className="p-6 bg-orange-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-orange-900 mb-4">
                      {practiceMode === 'practice' ? '🎤 跟读练习' : '📝 录音测试'}
                    </h4>
                    
                    <div className="text-center">
                      {!userRecording ? (
                        <Button 
                          onClick={startRecording}
                          disabled={isRecording}
                          className={cn(
                            "text-white font-semibold px-8 py-4",
                            isRecording 
                              ? "bg-red-500 hover:bg-red-600" 
                              : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-lg"
                          )}
                          size="lg"
                        >
                          {isRecording ? '🔴 录音中...' : '🎤 开始录音'}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <audio controls className="w-full">
                            <source src={userRecording} type="audio/webm" />
                          </audio>
                          <Button 
                            onClick={() => setUserRecording('')}
                            variant="outline"
                          >
                            🔄 重新录音
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <Button 
                    onClick={prevLetter}
                    disabled={currentLetterIndex === 0}
                    variant="outline"
                    size="lg"
                  >
                    ⬅️ 上一个
                  </Button>

                  <div className="text-sm text-gray-600">
                    {currentLetterIndex + 1} / {alphabet.length}
                  </div>

                  {currentLetterIndex === alphabet.length - 1 ? (
                    <Button 
                      onClick={completePractice}
                      className="bg-green-500 text-white hover:bg-green-600"
                      size="lg"
                    >
                      🎉 完成练习
                    </Button>
                  ) : (
                    <Button 
                      onClick={nextLetter}
                      disabled={!showAnswer || (practiceMode !== 'learn' && !userRecording)}
                      className="bg-orange-500 text-white hover:bg-orange-600"
                      size="lg"
                    >
                      下一个 ➡️
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Letter Grid */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">🔤 字母表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {alphabet.map((letter, index) => (
                    <button
                      key={letter.letter}
                      onClick={() => setCurrentLetterIndex(index)}
                      className={cn(
                        "p-3 rounded-lg border-2 text-center transition-all",
                        index === currentLetterIndex
                          ? "border-orange-500 bg-orange-100 font-bold text-orange-900"
                          : completedLetters.has(index)
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                      )}
                    >
                      {letter.letter}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">💡 练习提示</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-sm text-gray-700">仔细听标准发音，注意口型</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600">•</span>
                  <span className="text-sm text-gray-700">大声跟读，发音要清晰</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600">•</span>
                  <span className="text-sm text-gray-700">录下自己的发音对比改进</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">📊 练习统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">已学习</span>
                  <span className="font-semibold">{completedLetters.size} 个字母</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">完成率</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">剩余</span>
                  <span className="font-semibold">{alphabet.length - completedLetters.size} 个字母</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}