import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PricesModule } from './prices/prices.module';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';


@Module({
  imports: [UsersModule, AuthModule, PricesModule, ProductsModule,StockModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },
  ],
})
export class AppModule {}
