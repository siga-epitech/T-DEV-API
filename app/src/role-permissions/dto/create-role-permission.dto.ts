import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty({ description: "ID du rôle" })
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ description: "ID de la permission" })
  @IsInt()
  @IsNotEmpty()
  permissionId: number;
}