import { ApiProperty } from '@nestjs/swagger'; 

export class CreateUserDto {
  @ApiProperty({ description: 'Le prénom de l\'utilisateur' })
  firstName: string;

  @ApiProperty({ description: 'Le nom de l\'utilisateur' })
  lastName: string;

  @ApiProperty({ description: 'Le numéro de téléphone de l\'utilisateur' })
  phoneNumber: string;

  @ApiProperty({ description: 'L\'adresse de facturation de l\'utilisateur' })
  billingAddress: string;

  @ApiProperty({ description: 'Le code postal de l\'utilisateur' })
  zipCode: string;

  @ApiProperty({ description: 'La ville de l\'utilisateur' })
  city: string;

  @ApiProperty({ description: 'Le pays de l\'utilisateur' })
  country: string;

  @ApiProperty({ description: 'L\'email de l\'utilisateur', uniqueItems: true })
  email: string;

  @ApiProperty({ description: 'Le mot de passe de l\'utilisateur' })
  password: string;

  @ApiProperty({ description: 'Le rôle de l\'utilisateur', default: 'user', required: false })
  role?: string;

  @ApiProperty({ description: 'L\'état de l\'utilisateur', default: true, required: false })
  isActive?: boolean;
}