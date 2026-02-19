import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiResponse, User } from '@/types';

// 模拟用户数据
const mockUsers: Record<string, User> = {
  'student_123': {
    id: 'student_123',
    username: 'student1',
    email: 'student1@example.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'teacher_123': {
    id: 'teacher_123',
    username: 'teacher1',
    email: 'teacher1@example.com',
    role: 'TEACHER',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'parent_123': {
    id: 'parent_123',
    username: 'parent1',
    email: 'parent1@example.com',
    role: 'PARENT',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'admin_123': {
    id: 'admin_123',
    username: 'admin1',
    email: 'admin1@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

// 验证JWT token
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    const jwtSecret = process.env.JWT_SECRET || 'demo-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; role: string; username: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);
    
    if (!decoded) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '无效的访问令牌',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    // 获取用户信息
    const user = mockUsers[decoded.userId];

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: '用户不存在',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: { user },
        message: '获取用户信息成功',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get user info error:', error);
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