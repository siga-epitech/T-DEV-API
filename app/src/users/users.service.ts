import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Vérifier si un rôle existe
  private async validateRole(roleId: number) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Rôle avec l'ID ${roleId} non trouvé.`);
    }
  }

  // Créer un utilisateur
  async createUser(createUserDto: CreateUserDto) {
    // Attribuer un rôle par défaut si `roleId` n'est pas fourni
    const defaultRole = await this.prisma.role.findUnique({ where: { name: 'client' } });
    const roleId = createUserDto.roleId || defaultRole.id;

    // Vérifier si le rôle existe
    await this.validateRole(roleId);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        roleId,
      },
    });
  }

  // Récupérer tous les utilisateurs
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // Récupérer un utilisateur par son ID
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }
    return user;
  }

  // Mettre à jour un utilisateur
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    if (updateUserDto.roleId) {
      // Vérifier si le rôle existe
      await this.validateRole(updateUserDto.roleId);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Désactiver un utilisateur (soft delete)
  async deactivateUser(id: number) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Supprimer un utilisateur définitivement
  async deleteUser(id: number) {
    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
