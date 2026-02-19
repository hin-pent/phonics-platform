import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Login API Called ===');
    
    // 简单的JSON解析
    const body = await request.json();
    console.log('Request body:', body);

    const { username, password, role } = body;

    // 验证输入
    if (!username || !password || !role) {
      console.log('Validation failed');
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '缺少必要字段' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 模拟用户验证
    const validUsers = {
      'student1': { role: 'STUDENT' },
      'teacher1': { role: 'TEACHER' },
      'parent1': { role: 'PARENT' },
      'admin1': { role: 'ADMIN' }
    };

    const validUser = validUsers[username as keyof typeof validUsers];
    
    if (!validUser || validUser.role !== role) {
      console.log('User validation failed:', { username, role, validUser });
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '用户名或密码错误' },
        timestamp: new Date().toISOString(),
      }, { status: 401 });
    }

    if (password !== 'password123') {
      console.log('Password validation failed');
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '密码错误' },
        timestamp: new Date().toISOString(),
      }, { status: 401 });
    }

    console.log('Login successful for:', { username, role });

    // 生成简单的token
    const token = `fake-token-${username}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        token,
        refreshToken: `refresh-${username}-${Date.now()}`,
        user: { id: username, username, role, status: 'ACTIVE' },
        expiresIn: 86400,
      },
      message: '登录成功',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: '服务器错误' },
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}