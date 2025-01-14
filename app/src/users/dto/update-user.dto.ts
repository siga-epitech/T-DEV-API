import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'L\'ID du rôle de l\'utilisateur', required: false })
  roleId?: number;
}
