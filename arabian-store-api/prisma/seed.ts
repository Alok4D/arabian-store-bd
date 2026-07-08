import 'dotenv/config';
import { prisma } from '../src/config/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@arabianstore.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log('Default admin created: admin@arabianstore.com / admin123');
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
