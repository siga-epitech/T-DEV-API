import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    return this.prisma.rolePermission.create({
      data: createRolePermissionDto,
    });
  }

  async findAll() {
    return this.prisma.rolePermission.findMany();
  }

  async remove(roleId: number, permissionId: number) {
    return this.prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  }
}
