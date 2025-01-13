import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Assurez-vous d'avoir un service Prisma configuré
import { Public } from 'src/common/public.decorator';

@Controller('products') // Définit la route de base pour ce contrôleur
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService, // Service pour interagir avec la base de données
  ) {}

  // Route pour obtenir un produit par son code-barres
  @Public()
  @Get(':barcode') // Route GET /products/:barcode
  async getProduct(@Param('barcode') barcode: string) {
    try {
      const product = await this.productsService.getProductFromOpenFoodFacts(barcode);
      return product; // Retourner le produit trouvé
    } catch (error) {
      return { status: 404, message: 'Produit introuvable ou erreur avec Open Food Facts' };
    }
  }

  // Route pour ajouter un produit par son code-barres
  @Public()
  @Post() // Route POST /products
  async addProduct(@Body('barcode') barcode: string) {
    if (!barcode) {
      throw new BadRequestException('Le code-barres est requis');
    }

    try {
      // Récupérer les informations du produit depuis Open Food Facts
      const productData = await this.productsService.getProductFromOpenFoodFacts(barcode);

      // Vérifier si le produit existe déjà dans la base de données
      const existingProduct = await this.prisma.products.findUnique({
        where: { barcode: productData.barcode },
      });

      if (existingProduct) {
        return { status: 409, message: 'Le produit existe déjà dans la base de données' };
      }

      // Créer le produit dans la table "products"
      const createdProduct = await this.prisma.products.create({
        data: {
          name: productData.name,
          brand: productData.brand,
          picture: productData.picture,
          barcode: productData.barcode,
        },
      });

      // Créer les informations nutritionnelles dans la table "nutritional_info"
      await this.prisma.nutritional_info.create({
        data: {
          product_id: createdProduct.id,
          energy_kcal_100g: productData.energy_kcal_100g,
          sugars_100g: productData.sugars_100g,
          fats_100g: productData.fats_100g,
          proteins_100g: productData.proteins_100g,
          carbohydrates_100g: productData.carbohydrates_100g,
          salt_100g: productData.salt_100g,
          fiber_100g: productData.fiber_100g,
        },
      });

      return { status: 201, message: 'Produit ajouté avec succès', product: createdProduct };
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
      throw new BadRequestException('Impossible d\'ajouter le produit');
    }
  }
}
