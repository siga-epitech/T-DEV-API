import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assurez-vous d'importer PrismaService

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  // Ajouter ou mettre à jour le stock d'un produit
  async createOrUpdateStock(productId: number, quantity: number) {
    const stock = await this.prisma.stock.findUnique({
      where: { productId: productId },  // Utilisation de productId ici
    });

    if (stock) {
      // Mise à jour du stock
      return this.prisma.stock.update({
        where: { productId: productId },  // Utilisation de productId ici
        data: { quantity },
      });
    } else {
      // Création d'un nouveau stock
      return this.prisma.stock.create({
        data: {
          productId: productId,
          quantity,
        },
      });
    }
  }

  // Récupérer le stock d'un produit
  async getStockByProduct(productId: number) {
    try {
      const stock = await this.prisma.stock.findUnique({
        where: { productId: productId },  // Utilisation de productId ici
      });
      if (!stock) {
        throw new NotFoundException('Stock non trouvé pour ce produit');
      }
      return stock;
    } catch (error) {
      throw new NotFoundException('Stock non trouvé pour ce produit');
    }
  }

  // Supprimer le stock d'un produit
  async deleteStock(productId: number) {
    try {
      await this.prisma.stock.delete({
        where: { productId: productId },  // Utilisation de productId ici
      });
    } catch (error) {
      throw new NotFoundException('Impossible de supprimer le stock, produit introuvable');
    }
  }
}
