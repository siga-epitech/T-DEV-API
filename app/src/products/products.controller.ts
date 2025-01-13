import { Controller, Get, Post, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Public } from 'src/common/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Get(':barcode')
  async getProduct(@Param('barcode') barcode: string) {
    try {
      const product = await this.productsService.getProductFromOpenFoodFacts(barcode);
      return product;
    } catch (error) {
      return { status: 404, message: 'Produit introuvable ou erreur avec Open Food Facts' };
    }
  }

  @Public()
  @Post()
  async addProduct(@Body('barcode') barcode: string) {
    if (!barcode) {
      throw new BadRequestException('Le code-barres est requis');
    }

    try {
      const productData = await this.productsService.getProductFromOpenFoodFacts(barcode);
      const existingProduct = await this.prisma.product.findUnique({
        where: { barcode: productData.barcode },
      });

      if (existingProduct) {
        return { status: 409, message: 'Le produit existe déjà dans la base de données' };
      }

      const createdProduct = await this.prisma.product.create({
        data: {
          name: productData.name,
          brand: productData.brand,
          picture: productData.picture,
          barcode: productData.barcode,
        },
      });

      await this.prisma.nutritionalInfo.create({
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

  @Public()
  @Get()
  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          nutritionalInfo: true,
        },
      });
      return { status: 200, products };
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
      throw new BadRequestException('Impossible de récupérer les produits');
    }
  }

  @Public()
  @Get('id/:id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          nutritionalInfo: true, // Inclut les infos nutritionnelles si elles existent
        },
      });

      if (!product) {
        throw new NotFoundException(`Produit avec l'ID ${id} introuvable`);
      }

      return { status: 200, product };
    } catch (error) {
      console.error('Erreur lors de la récupération du produit par ID', error);
      throw new BadRequestException('Impossible de récupérer le produit');
    }
  }
}
