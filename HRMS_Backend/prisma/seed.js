import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Define all permissions your system will have
const allPermissions = [
  { id: 'manage_users', name: 'User Management', category: 'Users', description: 'Create, edit, delete users' },
  { id: 'manage_roles', name: 'Role Management', category: 'System', description: 'Manage roles and permissions' },
  { id: 'manage_jobs', name: 'Job Management', category: 'Jobs', description: 'Create, edit, archive jobs' },
  { id: 'view_reports', name: 'View Reports', category: 'Analytics', description: 'View all reports' },
  { id: 'manage_policies', name: 'Policy Management', category: 'Compliance', description: 'Manage company policies' },
  { id: 'view_audit_logs', name: 'View Audit Logs', category: 'Security', description: 'View system audit logs' },
  { id: 'view_profile', name: 'View Personal Profile', category: 'Personal', description: 'Access personal profile' },
  { id: 'manage_team', name: 'Manage Team', category: 'Teams', description: 'Manage one\'s own team' },
];

async function main() {
  console.log(`Start seeding ...`);

  // 1. Create all Permissions
  console.log('Creating permissions...');
  for (const perm of allPermissions) {
    await prisma.permission.upsert({
      where: { id: perm.id },
      update: {},
      create: perm,
    });
  }
  console.log('Permissions created.');

  // 2. Create Roles and connect permissions
  console.log('Creating roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' }, // <-- CHANGED from 'Super Admin'
    update: {},
    create: {
      name: 'ADMIN', // <-- CHANGED
      description: 'Full system access with all permissions',
      color: 'red',
      permissions: {
        connect: allPermissions.map(p => ({ id: p.id })),
      },
    },
  });

  const hrRole = await prisma.role.upsert({
    where: { name: 'HR' }, // <-- CHANGED from 'HR Manager'
    update: {},
    create: {
      name: 'HR', // <-- CHANGED
      description: 'Human resources management and employee operations',
      color: 'blue',
      permissions: {
        connect: [
          { id: 'manage_users' },
          { id: 'manage_jobs' },
          { id: 'view_reports' },
          { id: 'manage_policies' },
          { id: 'view_profile' },
        ],
      },
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: 'MANAGER' }, // <-- CHANGED from 'Department Manager'
    update: {},
    create: {
      name: 'MANAGER', // <-- CHANGED
      description: 'Team and project management within department',
      color: 'green',
      permissions: {
        connect: [
          { id: 'view_reports' },
          { id: 'view_profile' },
          { id: 'manage_team' },
        ],
      },
    },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: 'EMPLOYEE' }, // <-- CHANGED from 'Employee'
    update: {},
    create: {
      name: 'EMPLOYEE', // <-- CHANGED
      description: 'Standard employee access to personal features',
      color: 'gray',
      permissions: {
        connect: [
          { id: 'view_profile' },
        ],
      },
    },
  });
  console.log('Roles created.');

  // 3. Create Users and connect them to Roles
  console.log('Creating users...');
  const commonPassword = 'password123';
  const hashedPassword = await bcrypt.hash(commonPassword, 10);

  await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      employeeId: 'ADMIN001',
      name: 'Admin User',
      password: hashedPassword,
      department: 'Management',
      roleId: adminRole.id, // Connect to the created Admin Role
    },
  });

  await prisma.user.upsert({
    where: { email: 'hr@company.com' },
    update: {},
    create: {
      email: 'hr@company.com',
      employeeId: 'HR001',
      name: 'HR Manager',
      password: hashedPassword,
      department: 'Human Resources',
      roleId: hrRole.id, // Connect to the created HR Role
    },
  });

  await prisma.user.upsert({
    where: { email: 'hr5@gmail.com' },
    update: {},
    create: {
      email: 'hr5@gmail.com',
      employeeId: 'HR005',
      name: 'Aditya Sinha',
      password: await bcrypt.hash('123', 10),
      department: 'Product Engineering',
      roleId: hrRole.id, // Also an HR Role
    },
  });
  
  await prisma.user.upsert({
    where: { email: 'manager@company.com' },
    update: {},
    create: {
      email: 'manager@company.com',
      employeeId: 'MGR001',
      name: 'Department Manager',
      password: hashedPassword,
      department: 'Engineering',
      roleId: managerRole.id, // Connect to the created Manager Role
    },
  });

  await prisma.user.upsert({
    where: { email: 'employee@company.com' },
    update: {},
    create: {
      email: 'employee@company.com',
      employeeId: 'EMP001',
      name: 'Regular Employee',
      password: hashedPassword,
      department: 'Engineering',
      roleId: employeeRole.id, // Connect to the created Employee Role
    },
  });
  console.log('Users created.');

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
