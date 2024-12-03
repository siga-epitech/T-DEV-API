import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10); 
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '1234567890', 
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      },
    });
    console.log('Admin user created with email: admin@example.com and password: admin123');
  } else {
    console.log('Admin user already exists. Skipping...');
  }
}

main()
  .then(() => {
    console.log('Seeding completed.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    prisma.$disconnect();
    process.exit(1);
  });