import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 拼读乐园登录 API ===');
    
    // 解析请求体
    const body = await request.json();
    const { username, password, role } = body;

    console.log('登录请求:', { username, role });

    // 验证输入
    if (!username || !password || !role) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '请填写完整的登录信息' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });
    
    if (!user) {
      console.log('用户不存在:', username);
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '用户名或密码错误' },
        timestamp: new Date().toISOString(),
      }, { status: 401 });
    }

    // 验证角色
    if (user.role !== role) {
      console.log('角色不匹配:', { userRole: user.role, requestRole: role });
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '用户身份不匹配' },
        timestamp: new Date().toISOString(),
      }, { status: 401 });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log('密码错误:', username);
      return NextResponse.json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '密码错误' },
        timestamp: new Date().toISOString(),
      }, { status: 401 });
    }

    console.log('✅ 登录成功:', { username, role });

    // 生成模拟token
    const timestamp = Date.now();
    const token = `phonics-token-${user.username}-${user.role}-${timestamp}`;
    const refreshToken = `phonics-refresh-${user.username}-${timestamp}`;

    // 获取用户真实姓名
    let realName = user.username;
    if (user.studentProfile) realName = user.studentProfile.realName;
    if (user.teacherProfile) realName = user.teacherProfile.realName;
    if (user.parentProfile) realName = user.parentProfile.realName;

    // 返回用户信息（不包含密码）
    const safeUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: realName,
      email: user.email,
      status: user.status
    };

    return NextResponse.json({
      success: true,
      data: {
        token,
        refreshToken,
        user: safeUser,
        expiresIn: 86400, // 24小时
      },
      message: '登录成功！欢迎来到拼读乐园 🌟',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('❌ 登录失败:', error);
    return NextResponse.json({
      success: false,
      error: { 
        code: 'INTERNAL_ERROR', 
        message: '系统繁忙，请稍后重试' 
      },
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}