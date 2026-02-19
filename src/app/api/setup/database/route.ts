// 数据库设置脚本
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 简单的用户数据
const testUsers = {
  'student1': { 
    role: 'STUDENT', 
    name: '小明同学',
    passwordHash: '$2b$10$8wWj0qJKmKX0Oq.RvRKsTqPdxgAAJtUbJ3LAJyT', 
    age: 9,
    grade: '三年级',
    status: 'ACTIVE'
  },
  'teacher1': { 
    role: 'TEACHER', 
    name: '王老师', 
    passwordHash: '$2b$10$8wWj0qJKmKX0Oq.RvRKsTqPdxgAAJtUbJ3LAJyT', 
    employeeId: 'T001',
    subjects: '自然拼读,英语',
    status: 'ACTIVE'
  },
  'parent1': { 
    role: 'PARENT', 
    name: '小明爸爸', 
    passwordHash: '$2b$10$8wWj0qJKmKX0Oq.RvRKsTqPdxgAAJtUbJ3LAJyT', 
    phone: '13800138001',
    relationship: '父亲',
    status: 'ACTIVE'
  },
  'admin1': { 
    role: 'ADMIN', 
    name: '系统管理员', 
    passwordHash: '$2b$10$8wWj0qJKmKX0Oq.RvRKsTqPdxgAAJtUbJ3LAJyT', 
    status: 'ACTIVE'
  },
};

export async function POST(request: NextRequest) {
  console.log('=== Database Setup API Called ===');
  
  try {
    const { action } = await request.json();
    console.log('Action requested:', action);

    switch (action) {
      case 'setup':
        console.log('🚀 Setting up database...');
        await setupDatabase();
        return NextResponse.json({
          success: true,
          message: '数据库设置完成',
          timestamp: new Date().toISOString(),
        });
        
      case 'reset':
        console.log('🧹 Resetting database...');
        await resetDatabase();
        return NextResponse.json({
          success: true,
          message: '数据库重置完成',
          timestamp: new Date().toISOString(),
        });
        
      case 'status':
        try {
          const userCount = await prisma.user.count();
          const studentCount = await prisma.studentProfile.count();
          const teacherCount = await prisma.teacherProfile.count();
          const parentCount = await prisma.parentProfile.count();
          
          return NextResponse.json({
            success: true,
            data: {
              users: userCount,
              students: studentCount,
              teachers: teacherCount,
              parents: parentCount,
            },
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : '未知错误',
            timestamp: new Date().toISOString(),
          });
        }
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          timestamp: new Date().toISOString(),
        });
    }
    
  } catch (error) {
    console.error('❌ Database setup error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      timestamp: new Date().toISOString(),
    });
  }
}

async function resetDatabase() {
  console.log('🗑️ Deleting existing data...');
  
  // 删除所有数据
  await prisma.homework.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.studentClass.deleteMany({});
  await prisma.practiceRecord.deleteMany({});
  await prisma.learningProgress.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.institution.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.notificationPreferences.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.teacherProfile.deleteMany({});
  await prisma.parentProfile.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('✅ Database cleared');
}

async function setupDatabase() {
  console.log('🏗 Creating basic data structure...');
  
  // 1. 创建机构
  const institution = await prisma.institution.upsert({
    where: { code: 'PHONICS_DEMO' },
    update: {
      name: '拼读乐园演示学校',
      address: '演示地址',
      contactInfo: 'demo@phonics.com',
    },
    create: {
      name: '拼读乐园演示学校',
      code: 'PHONICS_DEMO',
      address: '描述地址',
      contactInfo: 'demo@phonics.com',
    },
  });

  console.log(`✅ Created institution: ${institution.name}`);

  // 2. 创建班级
  const classes = await Promise.all([
    prisma.class.upsert({
      where: { name: '拼读启蒙班' },
      update: {
        grade: '三年级',
        maxStudents: 30,
      },
      create: {
        institutionId: institution.id,
        name: '拼读启蒙班',
        grade: '三年级',
        maxStudents: 30,
      },
    }),
    prisma.class.upsert({
      where: { name: '拼读进阶班' },
      update: {
        grade: '四年级',
        maxStudents: 25,
      },
      create: {
        institutionId: institution.id,
        name: '拼读进阶班',
        grade: '四年级',
        maxStudents: 25,
      },
    }),
  ]);

  console.log(`✅ Created classes: ${classes.map(c => c.name).join(', ')}`);

  // 3. 创建课程
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { name: '自然拼读基础班' },
      update: {
        description: '26个字母和基础拼读规则',
        difficultyLevel: '初级',
      },
      create: {
        institutionId: institution.id,
        name: '自然拼读基础班',
        description: '26个字母和基础拼读规则',
        difficultyLevel: '初级',
      },
    }),
    prisma.course.upsert({
      where: { name: '自然拼读进阶班' },
      update: {
        description: '字母组合和复杂拼读规则',
        difficultyLevel: '中级',
      },
      create: {
        institutionId: institution.id,
        name: '自然拼读进阶班',
        description: '字母组合和复杂拼读规则',
        difficultyLevel: '中级',
      },
    }),
  ]);

  console.log(`✅ Created courses: ${courses.map(c => c.name).join(', ')}`);

  // 4. 创建课时
  const lessons = [
    { title: '26个字母认知', content: '学习26个英文字母的发音和书写', orderIndex: 1 },
    { title: '短元音拼读规则', content: '学习a, e, i, o, u的短元音拼读规则', orderIndex: 2 },
    { title: '辅音拼读规则', content: '学习辅音字母的组合拼读规则', orderIndex: 3 },
    { title: 'CVC单词拼读', content: '辅音+元音+辅音的三字母单词拼读', orderIndex: 4 },
    { title: '双字母组合', content: '学习sh, ch, th, ph等双字母组合', orderIndex: 1 },
    { title: '不发音字母e', content: '学习不发音字母e的规则和应用', orderIndex: 2 },
    { title: 'R控制的元音', content: '学习ar, er, ir, or, ur等R控制的元音', orderIndex: 3 },
    { title: '元音字母组合', content: '学习ea, ee, ai, ay等元音字母组合', orderIndex: 4 },
  ];

  await prisma.lesson.createMany({
    data: lessons.map(lesson => ({
      courseId: courses[0].id,
      ...lesson,
      multimediaResources: '',
    })),
      skipDuplicates: true,
  });

  console.log(`✅ Created ${lessons.length} lessons`);

  // 5. 创建用户和档案
  console.log('👤 Creating users...');
  
  for (const [username, userData] of Object.entries(testUsers)) {
    const user = await prisma.user.create({
      data: {
        username,
        email: `${username}@phonics.com`,
        passwordHash: userData.passwordHash,
        role: userData.role,
        status: 'ACTIVE',
      },
    });

    console.log(`✅ Created user: ${username} (${userData.role})`);
    
    // 创建对应档案
    switch (userData.role) {
      case 'STUDENT':
        await prisma.studentProfile.create({
          data: {
            userId: user.id,
            realName: userData.name,
            age: userData.age,
            grade: userData.grade,
          },
        });
        break;
      case 'TEACHER':
        await prisma.teacherProfile.create({
          data: {
            userId: user.id,
            realName: userData.name,
            employeeId: 'T001',
            subjects: userData.subjects,
            hireDate: new Date(),
          },
        });
        break;
      case 'PARENT':
        await prisma.parentProfile.create({
          data: {
            userId: user.id,
            realName: userData.name,
            phone: userData.phone,
            relationship: userData.relationship,
          },
        });
        break;
      case 'ADMIN':
        await prisma.parentProfile.create({
          data: {
            userId: user.id,
            realName: userData.name,
            phone: '13800138000',
            relationship: '管理员',
          },
        });
        break;
    }
  }

  // 6. 创建学生班级关联
  const students = ['student1', 'student2', 'student3', 'student4', 'student5'];
  await Promise.all(students.map(async (username, index) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      await prisma.studentClass.create({
        data: {
          studentId: user.id,
          classId: classes[0].id,
          status: 'active',
        },
        skipDuplicates: true,
      });
    }
  }));

  // 7. 分配教师
  const teacher = await prisma.user.findUnique({ where: { username: 'teacher1' } });
  if (teacher) {
    await Promise.all(classes.map((classItem) => 
      prisma.class.update({
        where: { id: classItem.id },
        data: { teacherId: teacher.id },
      })
    ));
  }

  // 8. 创建管理员关联
  const admin = await prisma.user.findUnique({ where: { username: 'admin1' } });
  if (admin) {
    await prisma.institution.update({
      where: { id: institution.id },
      data: { adminUserId: admin.id },
    });
  }

  // 9. 创建一些作业
  await prisma.homework.create({
    data: {
      title: '26个字母认读练习',
      description: '请练习今天学习的26个字母，录制每个字母的发音',
      type: 'AUDIO_RECORDING',
      classId: classes[0].id,
      teacherId: teacher?.id,
      lessonId: lessons[0].id,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  });

  // 10. 创建学习进度
  await prisma.learningProgress.createMany({
    data: students.slice(0, 3).map(student => ({
      studentId: student.user?.id,
      courseId: courses[0].id,
      completionRate: Math.random() * 30 + 10,
      lastAccessedAt: new Date(),
    })),
    });

  console.log('✅ Database setup completed!');
  
  return {
    success: true,
    message: '基础数据库设置完成',
    data: {
      institution,
      classes,
      courses,
      users: {
        students: students.length,
        teachers: 1,
        parents: 1,
        admins: 1,
      }
    }
  };
}