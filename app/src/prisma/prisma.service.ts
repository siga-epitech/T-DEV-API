import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Connexion au démarrage du module
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Déconnexion propre lors de l'arrêt de l'application
  }
}
