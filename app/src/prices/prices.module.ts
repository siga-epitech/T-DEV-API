import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PricesController],
  providers: [PricesService, PrismaService],
})
export class PricesModule {}
