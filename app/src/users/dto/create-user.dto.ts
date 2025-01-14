import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail, MinLength, IsBoolean, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Le prénom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Le nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Le numéro de téléphone de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'L\'adresse de facturation de l\'utilisateur', required: false })
  @IsString()
  @IsOptional()
  billingAddress?: string;

  @ApiProperty({ description: 'Le code postal de l\'utilisateur', required: false })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ description: 'La ville de l\'utilisateur', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'Le pays de l\'utilisateur', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'L\'email de l\'utilisateur', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Le mot de passe de l\'utilisateur' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'L\'ID du rôle de l\'utilisateur', required: false })
  @IsInt()
  @IsOptional()
  roleId?: number;

  @ApiProperty({ description: 'L\'état de l\'utilisateur', default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
