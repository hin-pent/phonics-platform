import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// 创建测试用户数据
const testUsers = {
  'student1': { 
    role: 'STUDENT', 
    passwordHash: '$2b$10$8wWj0qJKm6GqQzTnmKgpQLaF9da/0JtiG17Y8Ljt1zT90.68KM3.05',
    name: '小明同学',
    status: 'ACTIVE'
  },
  'teacher1': { 
    role: 'TEACHER', 
    passwordHash: '$2b$10$8xURzxMP3wQJvbNnPwvURxMh8ofnLJD7LEeS5G8ozC92b/Y1sA8hY8aV4EDlL76nJ/JYE0',
    name: '王老师',
    status: 'ACTIVE'
  },
  'parent1': { 
    role: 'PARENT', 
    passwordHash: '$2b$10$8gEvQeQ9IyMEpCg9xa33gEvQeQ9IyMEpCg7zbU9s0Y/k4nN/IJfWlGk2uwzL',
    name: '小明爸爸',
    status: 'ACTIVE'
  },
  'admin1': { 
    role: 'ADMIN', 
    passwordHash: '$2b$10$8i0.Ud06PZ66aEJ6Yp5hH7Nl5GqQ.QwT.GEZFQw3.5tPw',
    name: '系统管理员',
    status: 'ACTIVE'
  }
};

// 清理数据库
async function cleanupDatabase() {
  console.log('🧹 Cleaning up database...');
  
  try {
    // 删除现有数据
    await prisma.studentClass.deleteMany({});
    await prisma.notificationPreferences.deleteMany({});
    await prisma.parentProfile.deleteMany({});
    await prisma.teacherProfile.deleteMany({});
    await prisma.studentProfile.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.learningProgress.deleteMany({});
    await prisma.homework.deleteMany({});
    await prisma.submission.deleteMany({});
    await prisma.practiceRecord.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.class.deleteMany({});
    await prisma.institution.deleteMany({});
    
    console.log('✅ Database cleaned');
  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
}

// 创建基础数据
async function setupBasicData() {
  console.log('🚀 Setting up basic data...');
  
  try {
    // 4. 创建用户和档案
    for (const [username, userData] of Object.entries(testUsers)) {
      const user = await prisma.user.create({
        data: {
          username,
          email: `${username}@phonics.com`,
          passwordHash: userData.passwordHash,
          role: userData.role as any,
          status: 'ACTIVE' as any,
        },
      });

      console.log(`✅ Created user: ${username} (${userData.role})`);
      
      // 保存用户ID用于后续关联
      (testUsers[username as keyof typeof testUsers] as any).id = user.id;
    }

    // 1. 创建机构
    const institution = await prisma.institution.create({
      data: {
        name: '拼读乐园演示学校',
        code: 'PHONICS_DEMO',
        address: '演示地址',
        contactInfo: 'demo@phonics.com',
        adminUserId: (testUsers.admin1 as any).id,
      },
    });

    console.log(`✅ Created institution: ${institution.name}`);

    // 创建教师档案
    const teacherUser = await prisma.user.findUnique({
      where: { username: 'teacher1' }
    });

    if (!teacherUser) {
      throw new Error('Teacher user not found');
    }

    const teacherProfile = await prisma.teacherProfile.create({
      data: {
        userId: teacherUser.id,
        realName: '王老师',
        employeeId: 'T001',
        subjects: '自然拼读,英语',
        hireDate: new Date(),
      },
    });

    // 2. 创建班级
    const classes = await Promise.all([
      prisma.class.create({
        data: {
          institutionId: institution.id,
          name: '拼读启蒙班',
          grade: '三年级',
          maxStudents: 30,
          teacherId: teacherProfile.id,
        },
      }),
      prisma.class.create({
        data: {
          institutionId: institution.id,
          name: '拼读进阶班',
          grade: '四年级',
          maxStudents: 25,
          teacherId: teacherProfile.id,
        },
      }),
    ]);

    console.log(`✅ Created classes: ${classes.map(c => c.name).join(', ')}`);

    // 3. 创建课程和课时
    const courses = await Promise.all([
      prisma.course.create({
        data: {
          institutionId: institution.id,
          name: '自然拼读基础班',
          description: '26个字母和基础拼读规则',
          difficultyLevel: '初级',
          createdBy: teacherUser.id,
        },
      }),
      prisma.course.create({
        data: {
          institutionId: institution.id,
          name: '自然拼读进阶班',
          description: '字母组合和复杂拼读规则',
          difficultyLevel: '中级',
          createdBy: teacherUser.id,
        },
      }),
    ]);

    // 创建基础课时
    const lessons = [
      { title: '26个字母认知', content: '学习26个英文字母的发音和书写', orderIndex: 1 },
      { title: '短元音拼读规则', content: '学习a, e, i, o, u的短元音拼读规则', orderIndex: 2 },
      { title: '辅音拼读规则', content: '学习辅音字母的组合拼读规则', orderIndex: 3 },
      { title: 'CVC单词拼读', content: '辅音+元音+辅音的三字母单词拼读', orderIndex: 4 },
    ];

    await prisma.lesson.createMany({
      data: lessons.map(lesson => ({
        courseId: courses[0].id,
        ...lesson,
        multimediaResources: JSON.stringify([]),
      })),
    });

    console.log(`✅ Created ${lessons.length} lessons`);

    // 创建对应档案
    for (const [username, userData] of Object.entries(testUsers)) {
      const user = await prisma.user.findUnique({
        where: { username }
      });
      
      if (!user) continue;

      switch (userData.role) {
        case 'STUDENT':
          await prisma.studentProfile.create({
            data: {
              userId: user.id,
              realName: userData.name,
              age: 9,
              grade: '三年级',
            },
          });
          break;
        case 'TEACHER':
          await prisma.teacherProfile.create({
            data: {
              userId: user.id,
              realName: userData.name,
              employeeId: 'T001',
              subjects: '自然拼读,英语',
              hireDate: new Date(),
            },
          });
          break;
        case 'PARENT':
          await prisma.parentProfile.create({
            data: {
              userId: user.id,
              realName: userData.name,
              phone: '13800138001',
              relationship: userData.name.includes('爸爸') ? '父亲' : '母亲',
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

    // 5. 关联用户到班级
    await Promise.all([
      prisma.studentClass.create({
        data: {
          studentId: (testUsers.student1 as any).id,
          classId: classes[0].id,
          status: 'active',
        },
      }),
      prisma.studentClass.create({
        data: {
          studentId: (testUsers.student1 as any).id,
          classId: classes[0].id,
          status: 'active',
        },
      }),
      prisma.studentClass.create({
        data: {
          studentId: (testUsers.student3 as any).id,
          classId: classes[0].id,
          status: 'active',
        },
      }),
      prisma.studentClass.create({
        data: {
          studentId: testUsers.student4.id,
          classId: classes[0].id,
          status: 'active',
        },
        skipDuplicates: true,
      }),
      prisma.studentClass.create({
        data: {
          studentId: (testUsers.student5 as any).id,
          classId: classes[1].id,
          status: 'active',
        },
      }),
    ]);

    // 6. 分配教师到班级
    await Promise.all([
      prisma.class.update({
        where: { id: classes[0].id },
        data: { teacherId: teacherProfile.id },
      }),
      prisma.class.update({
        where: { id: classes[1].id },
        data: { teacherId: teacherProfile.id },
      }),
    ]);

    // 8. 创建作业
    await prisma.homework.create({
      data: {
        title: '26个字母认知练习',
        description: '请练习今天学习的26个字母，录制每个字母的发音',
        type: 'AUDIO_RECORDING',
        classId: classes[0].id,
        teacherId: testUsers.teacher1.id,
        lessonId: lessons[0].id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
    });

    // 9. 创建学习进度
    await prisma.learningProgress.create({
      data: {
        studentId: testUsers.student1.id,
        courseId: courses[0].id,
        completionRate: 15.5,
        lastAccessedAt: new Date(),
      },
    });

    console.log('✅ Data setup complete!');
    console.log('\n🎯 测试账户信息:');
    console.log('学生: student1 (密码: password123)');
    console.log('教师: teacher1 (密码: password123)');
    console.log('家长: parent1 (密码: password123)');
    console.log('管理员: admin1 (密码: password123)');

    return {
      success: true,
      message: '基础数据设置成功',
      data: {
        institution,
        classes,
        users: {
          students: Object.keys(testUsers).length,
          teachers: 1,
          parents: 1,
          admins: 1,
        }
      }
    };

  } catch (error) {
    console.error('❌ Setup error:', error);
    return {
      success: false,
      message: '设置失败',
      error: error instanceof Error ? error.message : '未知错误',
    };
  } finally {
    await prisma.$disconnect();
  }
}

// 清理并重新设置
async function resetAndSetup() {
  await cleanupDatabase();
  const result = await setupBasicData();
  return result;
}

// 如果直接运行此脚本
if (require.main === module) {
  resetAndSetup()
    .then((result) => {
      console.log('\n执行结果:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
  }
}