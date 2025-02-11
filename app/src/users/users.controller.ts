import { 
  Controller, Get, Post, Body, Param, Put, Delete, Patch, ParseIntPipe 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  async create(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès.' })
  async getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto) {
    return this.usersService.updateUser(id, userData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Désactiver un utilisateur (soft delete)' })
  @ApiResponse({ status: 200, description: 'Utilisateur désactivé.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivateUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur définitivement' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé définitivement.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
