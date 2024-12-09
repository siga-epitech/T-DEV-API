import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Nom du rôle' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description du rôle', required: false })
  @IsString()
  description?: string;
}