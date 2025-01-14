import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // Correct pour importer le module Prisma

@Module({
  imports: [PrismaModule], // Utilisez "imports" pour ajouter des modules
  providers: [ProductsService], // Seuls les services spécifiques à ce module
  controllers: [ProductsController], // Les contrôleurs pour ce module
})
export class ProductsModule {}
