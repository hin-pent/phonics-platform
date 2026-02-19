// 删除所有数据并重新设置
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('🗑️ Resetting database...');
  
  try {
    // 删除所有数据
    await prisma.homework.deleteMany({});
    await prisma.submission.deleteMany({});
    await prisma.studentClass.deleteMany({});
    await prisma.practiceRecord.deleteMany({});
    await prisma.learningProgress.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.course.deleteMany({});
    prisma.class.deleteMany({});
    await prisma.institution.deleteMany({});
    await prisma.notification.deleteMany({});
    await prisma.notificationPreferences.deleteMany({});
    await prisma.studentProfile.deleteMany({});
    await prisma.teacherProfile.deleteMany({});
    await prisma.parentProfile.deleteMany({});
    await prisma.user.deleteMany({});
    
    console.log('✅ Database cleared');
  } catch (error) {
    console.error('❌ Reset failed:', error);
  }
}

async function setupDatabase() {
  console.log('🏗️ Setting up database...');
  
  try {
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
        address: '演示地址',
        contactInfo: 'demo@phonics.com',
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
        },
      }),
      prisma.class.create({
        data: {
          institutionId: institution.id,
          name: '拼读进阶班',
          grade: '四年级',
          maxStudents: 25,
        },
      }),
    ]);

    // 3. 创建课程
    const courses = await Promise.all([
      prisma.course.create({
        data: {
          institutionId: institution.id,
          name: '自然拼读基础班',
          description: '26个字母和基础拼读规则',
          difficultyLevel: '初级',
        },
      }),
      prisma.course.create({
        data: {
          institutionId: institution.id,
          name: '自然拼读进阶班',
          description: '字母组合和复杂拼读规则',
          difficultyLevel: '中级',
        },
      }),
    ]);

    // 4. 创建课时
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
        multimediaResources: '',
      })),
    });

    // 5. 创建测试用户
    const testUserHash = await require('bcryptjs').hash('password123', 10);
    
    const users = [
      { username: 'student1', passwordHash: testUserHash, role: 'STUDENT', name: '小明同学' },
      { username: 'teacher1', passwordHash: testUserHash, role: 'TEACHER', name: '王老师' },
      { username: 'parent1', passwordHash: testUserHash, role: 'PARENT', name: '小明爸爸' },
      { username: 'admin1', passwordHash: testUserHash, role: 'ADMIN', name: '系统管理员' },
    ];

    for (const userData of users) {
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          email: `${userData.username}@phonics.com`,
          passwordHash: userData.passwordHash,
          role: userData.role,
          status: 'ACTIVE',
        },
      });

      // 创建对应档案
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
              relationship: '父亲',
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

    // 创建班级关联
    await prisma.studentClass.create({
      data: {
        studentId: users.find(u => u.username === 'student1')?.id,
        classId: classes[0].id,
        status: 'active',
      },
    });

    // 分配教师
    await prisma.class.update({
      where: { id: classes[0].id },
      data: { teacherId: users.find(u => u.username === 'teacher1')?.id },
    });

    // 创建管理员关联
    await prisma.institution.update({
      where: { id: institution.id },
      data: { adminUserId: users.find(u => u.username === 'admin1')?.id },
    });

    console.log('✅ Database setup complete!');
    console.log('\n📋 用户信息:');
    console.log('学生: student1 (密码: password123)');
    console.log('教师: teacher1 (密码: password123)');
    console.log('家长: parent1 (密码: password123)');
    console.log('管理员: admin1 (密码: password123)');

    return {
      success: true,
      message: '数据库设置完成'
    };

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    return {
      success: false,
      message: '设置失败: ' + error.message
    };
  } finally {
    await prisma.$disconnect();
  }
}

// 运行设置
if (require.main === module) {
  resetDatabase()
    .then(() => {
      setupDatabase()
        .then((result) => {
          console.log('\n🎉 执行结果:', result);
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ 执行失败:', error);
          process.exit(1);
        });
    })
}

module.exports = { resetDatabase, setupDatabase };