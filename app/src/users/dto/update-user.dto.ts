import { ApiProperty, PartialType } from '@nestjs/swagger'; 
import { CreateUserDto } from './create-user.dto';  

export class UpdateUserDto extends PartialType(CreateUserDto) { 
  @ApiProperty({ description: 'Le prénom de l\'utilisateur', required: false })
  firstName?: string;

  @ApiProperty({ description: 'Le nom de l\'utilisateur', required: false })
  lastName?: string;

  @ApiProperty({ description: 'Le numéro de téléphone de l\'utilisateur', required: false })
  phoneNumber?: string;

  @ApiProperty({ description: 'L\'adresse de facturation de l\'utilisateur', required: false })
  billingAddress?: string;

  @ApiProperty({ description: 'Le code postal de l\'utilisateur', required: false })
  zipCode?: string;

  @ApiProperty({ description: 'La ville de l\'utilisateur', required: false })
  city?: string;

  @ApiProperty({ description: 'Le pays de l\'utilisateur', required: false })
  country?: string;

  @ApiProperty({ description: 'L\'email de l\'utilisateur', required: false })
  email?: string;

  @ApiProperty({ description: 'Le mot de passe de l\'utilisateur', required: false })
  password?: string;

  @ApiProperty({ description: 'Le rôle de l\'utilisateur', required: false })
  role?: string;

  @ApiProperty({ description: 'L\'état de l\'utilisateur', required: false })
  isActive?: boolean;
}
