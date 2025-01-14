import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un rôle' })
  @ApiResponse({ status: 201, description: 'Rôle créé avec succès.' })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les rôles' })
  @ApiResponse({ status: 200, description: 'Liste des rôles récupérée avec succès.' })
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un rôle par ID' })
  @ApiResponse({ status: 200, description: 'Rôle récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un rôle' })
  @ApiResponse({ status: 200, description: 'Rôle mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un rôle' })
  @ApiResponse({ status: 200, description: 'Rôle supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
