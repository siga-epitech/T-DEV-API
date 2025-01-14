import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une permission' })
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les permissions' })
  async findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une permission par ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une permission' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une permission' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.remove(id);
  }
}
