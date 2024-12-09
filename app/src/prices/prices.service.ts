import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPriceDto: CreatePriceDto) {
    return this.prisma.price.create({
      data: createPriceDto,
    });
  }

  async findAll() {
    return this.prisma.price.findMany();
  }

  async findOne(barcode: string) {
    const price = await this.prisma.price.findUnique({
      where: { barcode },
    });
    if (!price) {
      throw new NotFoundException(`Prix avec le code-barres ${barcode} non trouvé.`);
    }
    return price;
  }

  async update(barcode: string, updatePriceDto: UpdatePriceDto) {
    const price = await this.findOne(barcode); // Vérifie l'existence
    return this.prisma.price.update({
      where: { barcode },
      data: updatePriceDto,
    });
  }

  async remove(barcode: string) {
    const price = await this.findOne(barcode); // Vérifie l'existence
    return this.prisma.price.delete({
      where: { barcode },
    });
  }
}
