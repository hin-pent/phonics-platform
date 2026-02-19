import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {
  console.log('开始创建测试数据...');

  // 创建测试用户
  const studentUser = await prisma.user.create({
    data: {
      username: 'student1',
      email: 'student1@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'STUDENT',
      status: 'ACTIVE',
      studentProfile: {
        create: {
          realName: '小明同学',
          age: 10,
          grade: '三年级',
        },
      },
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      username: 'teacher1',
      email: 'teacher1@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'TEACHER',
      status: 'ACTIVE',
      teacherProfile: {
        create: {
          realName: '王老师',
          employeeId: 'T001',
          subjects: '自然拼读,英语',
        },
      },
    },
  });

  const parentUser = await prisma.user.create({
    data: {
      username: 'parent1',
      email: 'parent1@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'PARENT',
      status: 'ACTIVE',
      parentProfile: {
        create: {
          realName: '小明爸爸',
          phone: '13800138000',
          relationship: '父亲',
        },
      },
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      username: 'admin1',
      email: 'admin1@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  // 创建测试机构
  const institution = await prisma.institution.create({
    data: {
      name: '拼读乐园演示学校',
      code: 'PHONICS_DEMO',
      address: '演示地址',
      contactInfo: 'demo@example.com',
      adminUser: {
        connect: { id: adminUser.id },
      },
    },
  });

  console.log('✅ 测试数据创建完成!');
  console.log(`📚 用户: student1, teacher1, parent1, admin1`);
  console.log(`🔑 密码: password123`);

  return {
    studentUser,
    teacherUser,
    parentUser,
    adminUser,
    institution,
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ 创建数据失败:', e);
    await prisma.$disconnect();
    process.exit(1);
  });