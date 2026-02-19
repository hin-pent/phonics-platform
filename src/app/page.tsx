'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 自动跳转到登录页面
    router.push('/auth/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🐻</div>
        <h1 className="text-3xl font-bold text-orange-900 mb-2">拼读乐园</h1>
        <p className="text-lg text-orange-600">正在跳转到登录页面...</p>
      </div>
    </div>
  );
}