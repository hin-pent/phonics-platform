import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// 确保环境变量设置
process.env.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function initializeDatabase() {
  console.log('🚀 开始初始化基础数据...');

  try {
    // 0. 先创建管理员用户
    console.log('👑 创建管理员用户...');
    
    const adminUser = await prisma.user.upsert({
      where: { username: 'admin1' },
      update: {},
      create: {
        username: 'admin1',
        email: 'admin1@phonics.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    // 1. 创建机构和班級
    console.log('📚 创建机构和班級...');
    
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
        adminUserId: adminUser.id,
      },
    });

    // 先创建教师用户和档案
    const classTeacherUser = await prisma.user.upsert({
      where: { username: 'teacher1' },
      update: {},
      create: {
        username: 'teacher1',
        email: 'teacher1@phonics.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'TEACHER',
        status: 'ACTIVE',
      },
    });

    const teacherProfile = await prisma.teacherProfile.upsert({
      where: { userId: classTeacherUser.id },
      update: {
        realName: '张老师',
        employeeId: 'T001',
        subjects: '拼读教学',
      },
      create: {
        userId: classTeacherUser.id,
        realName: '张老师',
        employeeId: 'T001',
        subjects: '拼读教学',
      },
    });

    // 创建班级
    const beginnerClassId = 'class-beginner';
    const advancedClassId = 'class-advanced';
    
    const classes = await Promise.all([
      prisma.class.upsert({
        where: { id: beginnerClassId },
        update: {
          name: '拼读启蒙班',
          grade: '三年级',
          maxStudents: 30,
          teacherId: teacherProfile.id,
        },
        create: {
          id: beginnerClassId,
          institutionId: institution.id,
          name: '拼读启蒙班',
          grade: '三年级',
          maxStudents: 30,
          teacherId: teacherProfile.id,
        },
      }),
      prisma.class.upsert({
        where: { id: advancedClassId },
        update: {
          name: '拼读进阶班',
          grade: '四年级',
          maxStudents: 25,
          teacherId: teacherProfile.id,
        },
        create: {
          id: advancedClassId,
          institutionId: institution.id,
          name: '拼读进阶班',
          grade: '四年级',
          maxStudents: 25,
          teacherId: teacherProfile.id,
        },
      }),
    ]);

    console.log(`✅ 创建班级: ${classes.map(c => c.name).join(', ')}`);

    // 2. 创建课程和课时
    console.log('📚 创建课程和课时...');
    
    const courses = await Promise.all([
      prisma.course.upsert({
        where: { id: 'course-basic' },
        update: {
          name: '自然拼读基础班',
          description: '26个字母和基础拼读规则',
          difficultyLevel: '初级',
        },
        create: {
          id: 'course-basic',
          institutionId: institution.id,
          name: '自然拼读基础班',
          description: '26个字母和基础拼读规则',
          difficultyLevel: '初级',
          createdBy: classTeacherUser.id,
        },
      }),
      prisma.course.upsert({
        where: { id: 'course-advanced' },
        update: {
          name: '自然拼读进阶班',
          description: '字母组合和复杂拼读规则',
          difficultyLevel: '中级',
        },
        create: {
          id: 'course-advanced',
          institutionId: institution.id,
          name: '自然拼读进阶班',
          description: '字母组合和复杂拼读规则',
          difficultyLevel: '中级',
          createdBy: classTeacherUser.id,
        },
      }),
    ]);

    // 创建课时
    const baseCourseLessons = [
      { title: '26个字母认知', content: '学习26个英文字母的发音和书写', orderIndex: 1 },
      { title: '短元音拼读规则', content: '学习a, e, i, o, u的短元音拼读规则', orderIndex: 2 },
      { title: '辅音拼读规则', content: '学习辅音字母的组合拼读规则', orderIndex: 3 },
      { title: 'CVC单词拼读', content: '辅音+元音+辅音的三字母单词拼读', orderIndex: 4 },
    ];

    const advancedCourseLessons = [
      { title: '双字母组合', content: '学习sh, ch, th, ph等双字母组合', orderIndex: 1 },
      { title: '不发音字母e', content: '学习不发音字母e的规则和应用', orderIndex: 2 },
      { title: 'R控制的元音', content: '学习ar, er, ir, or, ur等R控制的元音', orderIndex: 3 },
      { title: '元音字母组合', content: '学习ea, ee, ai, ay等元音字母组合', orderIndex: 4 },
    ];

    const allLessons = [
      ...baseCourseLessons.map(lesson => ({ 
        ...lesson, 
        courseId: courses[0].id,
        multimediaResources: JSON.stringify([])
      })),
      ...advancedCourseLessons.map(lesson => ({ 
        ...lesson, 
        courseId: courses[1].id,
        multimediaResources: JSON.stringify([])
      })),
    ];

    await prisma.lesson.createMany({
      data: allLessons,
    });

    console.log(`✅ 创建课程: ${courses.map(c => c.name).join(', ')}`);
    console.log(`✅ 创建课时: ${allLessons.length} 个`);

    console.log(`✅ 创建教师: 张老师，管理 ${classes.length} 个班级`);

    // 4. 创建学生用户并关联班级
    console.log('🎓 创建学生用户...');
    
    const studentData = [
      { username: 'student1', name: '小明同学', grade: '三年级', classId: classes[0].id, age: 9 },
      { username: 'student2', name: '小红同学', grade: '三年级', classId: classes[0].id, age: 9 },
      { username: 'student3', name: '小华同学', grade: '三年级', classId: classes[0].id, age: 10 },
      { username: 'student4', name: '小丽同学', grade: '四年级', classId: classes[1].id, age: 10 },
      { username: 'student5', name: '小刚同学', grade: '四年级', classId: classes[1].id, age: 11 },
    ];

    const studentUsers = await Promise.all(studentData.map(async (student) => {
      const user = await prisma.user.upsert({
        where: { username: student.username },
        update: {},
        create: {
          username: student.username,
          email: `${student.username}@phonics.com`,
          passwordHash: await bcrypt.hash('password123', 10),
          role: 'STUDENT',
          status: 'ACTIVE',
        },
      });

      const studentProfile = await prisma.studentProfile.upsert({
        where: { userId: user.id },
        update: {
          realName: student.name,
          age: student.age,
          grade: student.grade,
        },
        create: {
          userId: user.id,
          realName: student.name,
          age: student.age,
          grade: student.grade,
        },
      });

      // 关联学生到班级
      await prisma.studentClass.upsert({
        where: {
          studentId_classId: {
            studentId: studentProfile.id,
            classId: student.classId,
          }
        },
        update: {
          status: 'active',
        },
        create: {
          studentId: studentProfile.id,
          classId: student.classId,
          status: 'active',
        },
      });

      return { user, profile: studentProfile };
    }));

    console.log(`✅ 创建学生: ${studentUsers.length} 个`);

    // 5. 创建家长用户并关联学生
    console.log('👨‍👩‍👧‍👦 创建家长用户...');
    
    const parentData = [
      { username: 'parent1', name: '小明爸爸', phone: '13800138001', relationship: '父亲', student: 'student1' },
      { username: 'parent2', name: '小红妈妈', phone: '13800138002', relationship: '母亲', student: 'student2' },
      { username: 'parent3', name: '小华爷爷', phone: '13800138003', relationship: '爷爷', student: 'student3' },
      { username: 'parent4', name: '小丽妈妈', phone: '13800138004', relationship: '母亲', student: 'student4' },
    ];

    const parentUsers = await Promise.all(parentData.map(async (parent) => {
      const user = await prisma.user.upsert({
        where: { username: parent.username },
        update: {},
        create: {
          username: parent.username,
          email: `${parent.username}@phonics.com`,
          passwordHash: await bcrypt.hash('password123', 10),
          role: 'PARENT',
          status: 'ACTIVE',
        },
      });

      await prisma.parentProfile.upsert({
        where: { userId: user.id },
        update: {
          realName: parent.name,
          phone: parent.phone,
          relationship: parent.relationship,
        },
        create: {
          userId: user.id,
          realName: parent.name,
          phone: parent.phone,
          relationship: parent.relationship,
        },
      });

      // 关联家长到学生
      const studentUser = await prisma.user.findUnique({
        where: { username: parent.student },
      });

      if (studentUser) {
        await prisma.studentProfile.update({
          where: { userId: studentUser.id },
          data: { parentId: user.id },
        });
      }

      return { user, profile: 'ParentProfile' };
    }));

    console.log(`✅ 创建家长: ${parentUsers.length} 个`);

    // 6. 创建管理员用户
    console.log('👑 创建管理员用户...');
    
    const adminUserMain = await prisma.user.upsert({
      where: { username: 'admin1' },
      update: {},
      create: {
        username: 'admin1',
        email: 'admin1@phonics.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    await prisma.parentProfile.upsert({
      where: { userId: adminUserMain.id },
      update: {
        realName: '系统管理员',
        phone: '13800138000',
        relationship: '管理员',
      },
      create: {
        userId: adminUserMain.id,
        realName: '系统管理员',
        phone: '13800138000',
        relationship: '管理员',
      },
    });

    // 关联机构管理员
    await prisma.institution.update({
      where: { id: institution.id },
      data: { adminUserId: adminUser.id },
    });

    console.log('✅ 创建管理员: admin1');

    // 7. 创建一些作业
    console.log('📝 创建作业...');
    
    const homeworkData = [
      {
        title: '26个字母认读练习',
        description: '请练习今天学习的26个字母，录制每个字母的发音',
        type: 'AUDIO_RECORDING' as const,
        classId: classes[0].id,
        teacherId: teacherProfile.id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        title: '短元音拼读测试',
        description: '测试你对短元音拼读规则的掌握程度',
        type: 'MULTIPLE_CHOICE' as const,
        classId: classes[0].id,
        teacherId: teacherProfile.id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    ];

    await prisma.homework.createMany({
      data: homeworkData,
    });

    console.log(`✅ 创建作业: ${homeworkData.length} 个`);

    // 8. 创建学习进度数据
    console.log('📊 创建学习进度...');
    
    // 为第一个学生创建学习进度
    const progressPromises = allLessons.map(lesson => 
      prisma.learningProgress.upsert({
        where: {
          studentId_courseId: {
            studentId: studentUsers[0].profile.id,
            courseId: lesson.courseId,
          }
        },
        update: {
          completionRate: Math.random() * 30 + 10,
          lastAccessedAt: new Date(),
        },
        create: {
          studentId: studentUsers[0].profile.id,
          courseId: lesson.courseId,
          completionRate: Math.random() * 30 + 10,
          lastAccessedAt: new Date(),
        },
      })
    );

    await Promise.all(progressPromises);

    console.log(`✅ 创建学习进度: ${progressPromises.length} 条`);

    console.log('🎉 基础数据初始化完成！');
    console.log('\n📋 账户信息:');
    console.log('学生: student1, student2, student3, student4, student5 (密码: password123)');
    console.log('家长: parent1, parent2, parent3, parent4 (密码: password123)');
    console.log('教师: teacher1 (密码: password123)');
    console.log('管理员: admin1 (密码: password123)');

    return {
      success: true,
      message: '基础数据初始化成功',
      data: {
        institution,
        classes,
        courses,
        users: {
          students: studentUsers.length,
          teachers: 1,
          parents: parentUsers.length,
          admins: 1,
        }
      }
    };

  } catch (error) {
    console.error('❌ 数据初始化失败:', error);
    return {
      success: false,
      message: '数据初始化失败',
      error: error instanceof Error ? error.message : '未知错误',
    };
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  initializeDatabase()
    .then((result) => {
      console.log('\n执行结果:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
}

export default initializeDatabase;