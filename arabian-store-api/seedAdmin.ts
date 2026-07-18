import 'dotenv/config';
import { prisma } from './src/config/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@arabianstore.com';
  const password = 'admin123';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        name: 'Admin',
        email,
        password: hashedPassword,
      }
    });
    console.log(`Created default admin: ${email}`);
  } else {
    // If it exists, update the password to ensure it matches
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    });
    console.log(`Updated existing admin password to default: ${email}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
