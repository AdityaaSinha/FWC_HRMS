import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const hashedPasswordAdmin = await bcrypt.hash('12', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'a@a.com',
      password: hashedPasswordAdmin,
      name: 'Admin User',
      employeeId: 'ADM001',
      role: 'ADMIN',
      department: 'Administration'
    },
  });
  console.log({ adminUser });

  // Create HR User
  const hashedPasswordHR = await bcrypt.hash('123', 10);
  const hrUser = await prisma.user.create({
    data: {
      email: 'hr@gmail.com',
      password: hashedPasswordHR,
      name: 'HR User',
      employeeId: '123456',
      role: 'HR',
      department: 'HR'
    },
  });
  console.log({ hrUser });

  // Create Employee User
  const hashedPasswordEmployee = await bcrypt.hash('12', 10);
  const employeeUser = await prisma.user.create({
    data: {
      email: 'e@e.com',
      password: hashedPasswordEmployee,
      name: 'Employee User',
      employeeId: 'EMP001',
      role: 'EMPLOYEE',
      department: 'General'
    },
  });
  console.log({ employeeUser });

  // Create Manager User
  const hashedPasswordManager = await bcrypt.hash('12', 10);
  const managerUser = await prisma.user.create({
    data: {
      email: 's@s.com',
      password: hashedPasswordManager,
      name: 'Manager User',
      employeeId: 'MGR001',
      role: 'MANAGER',
      department: 'Management'
    },
  });
  console.log({ managerUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });