import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau prix' })
  @ApiResponse({ status: 201, description: 'Prix créé avec succès.' })
  async create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les prix' })
  @ApiResponse({ status: 200, description: 'Liste des prix récupérée.' })
  async findAll() {
    return this.pricesService.findAll();
  }

  @Get(':barcode')
  @ApiOperation({ summary: 'Récupérer un prix par code-barres' })
  @ApiParam({ name: 'barcode', description: 'Code-barres du produit' })
  @ApiResponse({ status: 200, description: 'Prix trouvé.' })
  @ApiResponse({ status: 404, description: 'Prix non trouvé.' })
  async findOne(@Param('barcode') barcode: string) {
    return this.pricesService.findOne(barcode);
  }

  @Put(':barcode')
  @ApiOperation({ summary: 'Mettre à jour un prix' })
  @ApiParam({ name: 'barcode', description: 'Code-barres du produit' })
  @ApiResponse({ status: 200, description: 'Prix mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Prix non trouvé.' })
  async update(@Param('barcode') barcode: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(barcode, updatePriceDto);
  }

  @Delete(':barcode')
  @ApiOperation({ summary: 'Supprimer un prix' })
  @ApiParam({ name: 'barcode', description: 'Code-barres du produit' })
  @ApiResponse({ status: 200, description: 'Prix supprimé.' })
  @ApiResponse({ status: 404, description: 'Prix non trouvé.' })
  async remove(@Param('barcode') barcode: string) {
    return this.pricesService.remove(barcode);
  }
}
