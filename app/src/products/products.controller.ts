import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/common/public.decorator';

@Controller('products') // Définit la route de base pour ce contrôleur
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Route pour obtenir un produit par son code-barres
  @Public()
  @Get(':barcode') // Route GET /products/:barcode
  async getProduct(@Param('barcode') barcode: string) {
    try {
      const product = await this.productsService.getProductFromOpenFoodFacts(barcode);
      return product; // Retourner le produit trouvé
    } catch (error) {
      // Gestion d'erreur simple : retourner une réponse personnalisée
      return { status: 404, message: 'Produit introuvable ou erreur avec Open Food Facts' };
    }
  }
}
