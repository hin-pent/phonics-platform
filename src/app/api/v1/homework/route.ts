import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 创建作业 API ===');
    
    const body = await request.json();
    const { title, description, type, classId, dueDate, lessonId, teacherId } = body;

    // 验证必填字段
    if (!title || !description || !type || !classId || !dueDate || !teacherId) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '请填写完整的作业信息' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证班级是否存在
    const classExists = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classExists) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: '班级不存在' },
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // 创建作业
    const homework = await prisma.homework.create({
      data: {
        title,
        description,
        type,
        classId,
        dueDate: new Date(dueDate),
        lessonId: lessonId || null,
        teacherId,
      },
    });

    console.log('✅ 作业创建成功:', homework);

    return NextResponse.json({
      success: true,
      data: homework,
      message: '作业布置成功！📝',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('❌ 创建作业失败:', error);
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

export async function GET(request: NextRequest) {
  try {
    console.log('=== 获取作业列表 API ===');

    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const teacherId = searchParams.get('teacherId');
    const homeworkId = searchParams.get('homeworkId');

    // 构建查询条件
    const where: any = {};
    
    if (classId) {
      where.classId = classId;
    }
    
    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (homeworkId) {
      where.id = homeworkId;
    }

    // 查询作业列表
    const homeworkList = await prisma.homework.findMany({
      where,
      include: {
        class: {
          select: {
            id: true,
            name: true,
            grade: true,
          },
        },
        teacher: {
          select: {
            id: true,
            realName: true,
          },
        },
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
        submissions: {
          select: {
            id: true,
            score: true,
            submittedAt: true,
            gradedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 计算作业状态和统计信息
    const enrichedHomeworkList = homeworkList.map(homework => {
      const now = new Date();
      const dueDate = new Date(homework.dueDate);
      const isExpired = now > dueDate;
      
      const totalStudents = homework.class ? 30 : 0; // 简化处理
      const submittedCount = homework.submissions.length;
      const gradedCount = homework.submissions.filter(s => s.gradedAt).length;
      
      // 计算状态
      let status = 'active';
      if (isExpired) status = 'expired';
      if (submittedCount === totalStudents && gradedCount === totalStudents) status = 'completed';
      
      return {
        ...homework,
        className: homework.class?.name || '未知班级',
        teacherName: homework.teacher?.realName || '未知教师',
        lessonTitle: homework.lesson?.title || null,
        totalStudents,
        submittedCount,
        gradedCount,
        status,
      };
    });

    console.log('✅ 获取作业列表成功:', { count: enrichedHomeworkList.length });

    return NextResponse.json({
      success: true,
      data: enrichedHomeworkList,
      message: '获取作业列表成功',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('❌ 获取作业列表失败:', error);
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