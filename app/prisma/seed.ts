import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Création des rôles
  const roles = [
    { name: 'admin', description: 'Accès complet au système.' },
    { name: 'manager', description: 'Superviseur des opérations.' },
    { name: 'employee', description: 'Employé en magasin.' },
    { name: 'client', description: 'Utilisateur de l’application mobile.' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('Roles created.');

  // Création des permissions
  const permissions = [
    { name: 'manage_users', description: 'Gestion des utilisateurs.' },
    { name: 'manage_products', description: 'Gestion des produits.' },
    { name: 'view_reports', description: 'Accès aux rapports et KPI.' },
    { name: 'update_stock', description: 'Mise à jour des quantités de stock.' },
    { name: 'scan_products', description: 'Scanner des produits via l’application mobile.' },
    { name: 'manage_cart', description: 'Gestion du panier.' },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }
  console.log('Permissions created.');

  // Association des permissions aux rôles
  const rolePermissions = [
    // Admin
    { roleName: 'admin', permissionNames: ['manage_users', 'manage_products', 'view_reports', 'update_stock', 'scan_products', 'manage_cart'] },
    // Manager
    { roleName: 'manager', permissionNames: ['manage_products', 'view_reports'] },
    // Employee
    { roleName: 'employee', permissionNames: ['update_stock'] },
    // Client
    { roleName: 'client', permissionNames: ['scan_products', 'manage_cart'] },
  ];

  for (const { roleName, permissionNames } of rolePermissions) {
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    for (const permissionName of permissionNames) {
      const permission = await prisma.permission.findUnique({ where: { name: permissionName } });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }
  console.log('Role-permission associations created.');

  // Création d’un utilisateur admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });

    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        phoneNumber: '1234567890',
        email: 'admin@example.com',
        password: hashedPassword,
        roleId: adminRole.id,
        isActive: true,
      },
    });
    console.log('Admin user created with email: admin@example.com and password: admin123');
  } else {
    console.log('Admin user already exists. Skipping...');
  }

  console.log('Seeding completed.');
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
