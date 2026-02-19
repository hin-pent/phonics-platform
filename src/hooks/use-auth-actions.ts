'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/utils';
import { LoginRequest, LoginResponse, ApiResponse } from '@/types';

export function useAuthActions() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    console.log('Login attempt with credentials:', credentials);

    try {
      // 临时使用简化的登录API
      const response = await fetch('/api/v1/auth/login-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: ApiResponse<LoginResponse> = await response.json();

      if (data.success && data.data) {
        // 保存认证信息
        storage.set('token', data.data.token);
        storage.set('refreshToken', data.data.refreshToken);
        storage.set('user', data.data.user);

        // 跳转到对应的仪表板
        const role = credentials.role.toLowerCase();
        router.push(`/dashboard/${role}`);
        
        return { success: true };
      } else {
        setError(data.error?.message || '登录失败');
        return { success: false, error: data.error?.message };
      }
    } catch (err) {
      const errorMessage = '网络错误，请稍后重试';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // 清除本地存储
      storage.remove('token');
      storage.remove('refreshToken');
      storage.remove('user');
      
      // 跳转到登录页
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const refreshToken = async () => {
    const refreshToken = storage.get<string>('refreshToken');
    
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data: ApiResponse<{ token: string; expiresIn: number }> = await response.json();

      if (data.success && data.data) {
        storage.set('token', data.data.token);
        return true;
      } else {
        // 刷新失败，清除认证信息
        await logout();
        return false;
      }
    } catch (err) {
      console.error('Refresh token error:', err);
      await logout();
      return false;
    }
  };

  return {
    login,
    logout,
    refreshToken,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}