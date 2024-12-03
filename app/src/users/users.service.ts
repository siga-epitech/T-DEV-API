import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client'; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Créer un utilisateur
  async createUser(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    billingAddress: string,
    zipCode: string,
    city: string,
    country: string,
    email: string,
    password: string,
    role: string = 'user', 
    isActive: boolean = true, 
  ): Promise<User> {  
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le "salt rounds"

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        billingAddress,
        zipCode,
        city,
        country,
        email,
        password: hashedPassword, 
        role,
        isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Récupérer tous les utilisateurs
  async getAllUsers(): Promise<User[]> {  // Ajouter Promise<User[]> pour indiquer qu'on retourne un tableau d'utilisateurs
    return this.prisma.user.findMany();
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: number): Promise<User | null> {  // Ajouter Promise<User | null> pour gérer le cas où l'utilisateur n'existe pas
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Mettre à jour un utilisateur
  async updateUser(
    id: number,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    billingAddress?: string,
    zipCode?: string,
    city?: string,
    country?: string,
    email?: string,
    password?: string,
    role?: string,
    isActive?: boolean,
  ): Promise<User> {  // Ajouter Promise<User> pour indiquer qu'on retourne un utilisateur
    const data: any = {
      firstName,
      lastName,
      phoneNumber,
      billingAddress,
      zipCode,
      city,
      country,
      email,
      role,
      isActive,
      updatedAt: new Date(), // Mettre à jour le champ updatedAt
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10); 
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deactivateUser(id: number): Promise<User> {  
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async deleteUser(id: number): Promise<User> {  
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async validateUserPassword(email: string, password: string): Promise<User | null> {  // Ajouter Promise<User | null> pour gérer le cas où l'utilisateur n'existe pas ou le mot de passe est incorrect
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; 
    }

    return user; 
  }
}
