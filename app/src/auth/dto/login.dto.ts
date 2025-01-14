import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur', example: 'password123' })
  password: string;
}