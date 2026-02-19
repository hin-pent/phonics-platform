import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 提交作业 API ===');
    
    const formData = await request.formData();
    const homeworkId = formData.get('homeworkId') as string;
    const content = formData.get('content') as string;
    const audioFile = formData.get('audio') as File;
    const studentId = formData.get('studentId') as string;

    // 验证必填字段
    if (!homeworkId || !studentId) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '作业ID和学生ID不能为空' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证作业是否存在
    const homework = await prisma.homework.findUnique({
      where: { id: homeworkId },
    });

    if (!homework) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: '作业不存在' },
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // 验证学生是否存在
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: '学生不存在' },
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // 检查是否已经提交过
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        homeworkId_studentId: {
          homeworkId,
          studentId,
        },
      },
    });

    if (existingSubmission) {
      return NextResponse.json({
        success: false,
        error: { code: 'DUPLICATE_SUBMISSION', message: '您已经提交过这个作业了' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 处理文件上传
    let filePath = '';
    if (audioFile) {
      try {
        // 上传音频文件
        const uploadFormData = new FormData();
        uploadFormData.append('file', audioFile);
        uploadFormData.append('type', 'audio');

        const uploadResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/v1/upload`, {
          method: 'POST',
          body: uploadFormData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          if (uploadResult.success) {
            filePath = uploadResult.data.fileUrl;
            console.log('音频文件上传成功:', filePath);
          } else {
            console.error('音频文件上传失败:', uploadResult.error);
            return NextResponse.json({
              success: false,
              error: { code: 'UPLOAD_FAILED', message: '音频文件上传失败' },
              timestamp: new Date().toISOString(),
            }, { status: 500 });
          }
        } else {
          console.error('音频文件上传请求失败');
          return NextResponse.json({
            success: false,
            error: { code: 'UPLOAD_FAILED', message: '音频文件上传失败' },
            timestamp: new Date().toISOString(),
          }, { status: 500 });
        }
      } catch (uploadError) {
        console.error('音频文件上传异常:', uploadError);
        return NextResponse.json({
          success: false,
          error: { code: 'UPLOAD_FAILED', message: '音频文件上传失败' },
          timestamp: new Date().toISOString(),
        }, { status: 500 });
      }
    }

    // 创建提交记录
    const submission = await prisma.submission.create({
      data: {
        homeworkId,
        studentId,
        content: content || (audioFile ? '音频文件已提交' : '文本内容已提交'),
        filePath: filePath || null,
      },
      include: {
        homework: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
        student: {
          select: {
            id: true,
            realName: true,
          },
        },
      },
    });

    console.log('✅ 作业提交成功:', submission);

    return NextResponse.json({
      success: true,
      data: submission,
      message: '作业提交成功！🎉',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('❌ 提交作业失败:', error);
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

// 添加作业批改API
export async function PATCH(request: NextRequest) {
  try {
    console.log('=== 批改作业 API ===');
    
    const body = await request.json();
    const { submissionId, score, feedback, gradedBy } = body;

    // 验证必填字段
    if (!submissionId || !gradedBy) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '提交ID和教师ID不能为空' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证分数范围
    if (score !== null && (score < 0 || score > 100)) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '分数必须在0-100之间' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 验证提交是否存在
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        homework: {
          include: {
            class: true,
          },
        },
        student: true,
      },
    });

    if (!submission) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: '提交记录不存在' },
        timestamp: new Date().toISOString(),
      }, { status: 404 });
    }

    // 验证教师权限
    if (submission.homework.teacherId !== gradedBy) {
      return NextResponse.json({
        success: false,
        error: { code: 'PERMISSION_DENIED', message: '您没有权限批改这个作业' },
        timestamp: new Date().toISOString(),
      }, { status: 403 });
    }

    // 更新批改信息
    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        score: score !== null ? score : null,
        feedback: feedback || null,
        gradedAt: new Date(),
        gradedBy,
      },
      include: {
        homework: {
          select: {
            id: true,
            title: true,
            type: true,
            dueDate: true,
            class: {
              select: {
                id: true,
                name: true,
                grade: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            realName: true,
            grade: true,
          },
        },
      },
    });

    console.log('✅ 作业批改成功:', updatedSubmission);

    return NextResponse.json({
      success: true,
      data: updatedSubmission,
      message: '作业批改成功！✅',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('❌ 批改作业失败:', error);
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
    console.log('=== 获取提交记录 API ===');

    const { searchParams } = new URL(request.url);
    const homeworkId = searchParams.get('homeworkId');
    const studentId = searchParams.get('studentId');
    const teacherId = searchParams.get('teacherId');

    // 构建查询条件
    const where: any = {};
    
    if (homeworkId) {
      where.homeworkId = homeworkId;
    }
    
    if (studentId) {
      where.studentId = studentId;
    }

    // 如果提供了teacherId，需要验证权限并过滤该教师的作业
    if (teacherId) {
      const homeworkWhere = { ...where };
      delete homeworkWhere.studentId; // 移除学生ID条件，从作业层面过滤
      
      // 先查询该教师的作业
      const teacherHomeworks = await prisma.homework.findMany({
        where: { teacherId },
        select: { id: true },
      });
      
      const homeworkIds = teacherHomeworks.map(hw => hw.id);
      where.homeworkId = { in: homeworkIds };
    }

    // 查询提交记录
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        homework: {
          select: {
            id: true,
            title: true,
            type: true,
            description: true,
            dueDate: true,
            class: {
              select: {
                id: true,
                name: true,
                grade: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            realName: true,
            grade: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    // 计算提交状态
    const enrichedSubmissions = submissions.map(submission => {
      const now = new Date();
      const dueDate = new Date(submission.homework.dueDate);
      const isExpired = now > dueDate;
      
      // 计算状态
      let status = 'submitted';
      if (submission.score !== null && submission.feedback) {
        status = 'graded';
      } else if (isExpired && !submission.score) {
        status = 'expired';
      }
      
      return {
        ...submission,
        status,
        isLate: submission.submittedAt > dueDate,
        daysLate: Math.floor((submission.submittedAt.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)),
      };
    });

    console.log('✅ 获取提交记录成功:', { count: enrichedSubmissions.length });

    return NextResponse.json({
      success: true,
      data: enrichedSubmissions,
      message: '获取提交记录成功',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('❌ 获取提交记录失败:', error);
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