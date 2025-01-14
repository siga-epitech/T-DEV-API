import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { RolePermissionsService } from './role-permissions.service';
  import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('RolePermissions')
  @Controller('role-permissions')
  export class RolePermissionsController {
    constructor(
      private readonly rolePermissionsService: RolePermissionsService,
    ) {}
  
    @Post()
    @ApiOperation({ summary: 'Créer une association entre un rôle et une permission' })
    @ApiResponse({
      status: 201,
      description: 'Association créée avec succès.',
    })
    @ApiResponse({
      status: 400,
      description: 'Données invalides.',
    })
    async create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
      return this.rolePermissionsService.create(createRolePermissionDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Récupérer toutes les associations entre rôles et permissions' })
    @ApiResponse({
      status: 200,
      description: 'Liste des associations récupérée avec succès.',
    })
    async findAll() {
      return this.rolePermissionsService.findAll();
    }
  
    @Delete(':roleId/:permissionId')
    @ApiOperation({ summary: 'Supprimer une association entre un rôle et une permission' })
    @ApiResponse({
      status: 200,
      description: 'Association supprimée avec succès.',
    })
    @ApiResponse({
      status: 404,
      description: 'Association non trouvée.',
    })
    async remove(
      @Param('roleId', ParseIntPipe) roleId: number,
      @Param('permissionId', ParseIntPipe) permissionId: number,
    ) {
      return this.rolePermissionsService.remove(roleId, permissionId);
    }
  }
  