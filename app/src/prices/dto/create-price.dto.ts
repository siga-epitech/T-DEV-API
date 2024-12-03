import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({ description: "Code-barres du produit", example: "1234567890123" })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({ description: "Prix du produit", example: 19.99 })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "Devise du prix", example: "EUR", required: false, default: "EUR" })
  @IsString()
  @IsOptional()
  currency?: string;
}