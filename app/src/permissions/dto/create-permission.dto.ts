import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Nom de la permission' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description de la permission', required: false })
  @IsString()
  description?: string;
}
