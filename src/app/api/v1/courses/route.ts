import { NextRequest, NextResponse } from 'next/server';

// 模拟教师ID（实际应该从认证token中获取）
const MOCK_TEACHER_ID = 'teacher-profile-1';
const MOCK_INSTITUTION_ID = 'institution-1';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 创建课程 API ===');
    
    const body = await request.json();
    const { name, description, difficultyLevel, targetAge, duration, objectives, outline } = body;

    // 验证必填字段
    if (!name || !description || !difficultyLevel) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: '请填写完整的课程信息' },
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // 模拟创建课程
    const mockCourse = {
      id: `course-${Date.now()}`,
      name,
      description,
      difficultyLevel,
      targetAge: targetAge || '',
      duration: duration || '',
      objectives: objectives || [],
      outline: outline || [],
      institutionId: MOCK_INSTITUTION_ID,
      createdBy: MOCK_TEACHER_ID,
      status: 'draft',
      studentCount: 0,
      lessonCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('✅ 课程创建成功:', mockCourse);

    return NextResponse.json({
      success: true,
      data: mockCourse,
      message: '课程创建成功！📚',
      timestamp: new Date().toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('❌ 创建课程失败:', error);
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
    console.log('=== 获取课程列表 API ===');

    const { searchParams } = new URL(request.url);
    const difficultyLevel = searchParams.get('difficultyLevel');
    const status = searchParams.get('status');

    // 模拟课程数据
    const mockCourses = [
      {
        id: 'course-basic',
        name: '自然拼读基础班',
        description: '26个字母和基础拼读规则，适合零基础学生',
        difficultyLevel: '初级',
        targetAge: '8-10岁',
        duration: '6周',
        objectives: [
          '掌握26个英文字母的发音',
          '学习短元音拼读规则',
          '能够拼读简单的CVC单词'
        ],
        outline: [
          '第1-2周：26个字母认知',
          '第3-4周：短元音拼读',
          '第5-6周：CVC单词练习'
        ],
        institutionId: MOCK_INSTITUTION_ID,
        createdBy: MOCK_TEACHER_ID,
        status: 'active',
        studentCount: 28,
        lessonCount: 12,
        completedLessons: 8,
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-02-10'),
      },
      {
        id: 'course-advanced',
        name: '自然拼读进阶班',
        description: '字母组合和复杂拼读规则，适合有一定基础的学生',
        difficultyLevel: '中级',
        targetAge: '9-11岁',
        duration: '8周',
        objectives: [
          '掌握双字母组合发音',
          '学习长元音规则',
          '能够拼读多音节单词'
        ],
        outline: [
          '第1-2周：双字母组合',
          '第3-4周：长元音规则',
          '第5-6周：多音节单词',
          '第7-8周：综合练习'
        ],
        institutionId: MOCK_INSTITUTION_ID,
        createdBy: MOCK_TEACHER_ID,
        status: 'active',
        studentCount: 26,
        lessonCount: 16,
        completedLessons: 10,
        createdAt: new Date('2026-01-20'),
        updatedAt: new Date('2026-02-08'),
      },
      {
        id: 'course-expert',
        name: '自然拼读高级班',
        description: '多音节单词和阅读理解，适合进阶学生',
        difficultyLevel: '高级',
        targetAge: '10-12岁',
        duration: '10周',
        objectives: [
          '掌握复杂拼读规则',
          '提高阅读速度',
          '培养阅读理解能力'
        ],
        outline: [
          '第1-2周：复杂拼读规则',
          '第3-4周：阅读技巧',
          '第5-10周：综合训练'
        ],
        institutionId: MOCK_INSTITUTION_ID,
        createdBy: MOCK_TEACHER_ID,
        status: 'draft',
        studentCount: 0,
        lessonCount: 20,
        completedLessons: 5,
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-05'),
      },
    ];

    // 过滤数据
    let filteredCourses = mockCourses;
    
    if (difficultyLevel) {
      filteredCourses = filteredCourses.filter(course => course.difficultyLevel === difficultyLevel);
    }
    
    if (status) {
      filteredCourses = filteredCourses.filter(course => course.status === status);
    }

    console.log('✅ 获取课程列表成功:', { count: filteredCourses.length });

    return NextResponse.json({
      success: true,
      data: filteredCourses,
      message: '获取课程列表成功',
      timestamp: new Date().toISOString(),
    }, { status: 200 });

  } catch (error) {
    console.error('❌ 获取课程列表失败:', error);
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