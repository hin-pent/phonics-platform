import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'MISSING_REFRESH_TOKEN',
            message: '缺少刷新令牌',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 验证刷新令牌
    try {
      const jwtSecret = process.env.JWT_SECRET || 'demo-secret-key';
      const decoded = jwt.verify(refreshToken, jwtSecret) as any;
      
      // 生成新的访问令牌
      const newToken = jwt.sign(
        {
          userId: decoded.userId,
          username: decoded.username,
          role: decoded.role,
        },
        jwtSecret,
        { expiresIn: '24h' }
      );

      return NextResponse.json<ApiResponse<any>>(
        {
          success: true,
          data: {
            token: newToken,
            expiresIn: 86400,
          },
          message: '令牌刷新成功',
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );

    } catch (error) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'INVALID_REFRESH_TOKEN',
            message: '无效的刷新令牌',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '服务器内部错误',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}