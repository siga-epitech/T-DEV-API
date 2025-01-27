import { Controller, Get, Post, Delete, Param, Body, BadRequestException, NotFoundException, ParseIntPipe, InternalServerErrorException } from '@nestjs/common';
import { StockService } from './stock.service';
import { Public } from 'src/common/public.decorator';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

 @Public()
  @Post(':productId')
  async createOrUpdateStock(
    @Param('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    if (quantity === undefined) {
      throw new BadRequestException('La quantité est requise');
    }

    try {
      const stock = await this.stockService.createOrUpdateStock(productId, quantity);
      return { status: 200, stock };
    } catch (error) {
      throw new BadRequestException('Impossible de créer ou de mettre à jour le stock');
    }
  }

  // Récupérer le stock d'un produit
  @Public()
  @Get(':productId')
  async getStockByProduct(@Param('productId', ParseIntPipe) productId: number) {
    try {
      const stock = await this.stockService.getStockByProduct(productId);
      return { 
        success: true,
        data: stock 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        success: false,
        message: "Erreur lors de la récupération du stock",
        error: error.message
      });
    }
  }

  // Supprimer le stock d'un produit
  @Public()
  @Delete(':productId')
  async deleteStock(@Param('productId') productId: number) {
    try {
      await this.stockService.deleteStock(productId);
      return { status: 200, message: 'Stock supprimé avec succès' };
    } catch (error) {
      throw new NotFoundException('Impossible de supprimer le stock, produit introuvable');
    }
  }
}
