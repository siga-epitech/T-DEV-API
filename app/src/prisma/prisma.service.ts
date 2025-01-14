import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  // Connexion à la base de données au démarrage du module
  async onModuleInit() {
    await this.$connect();
  }

  // Fermeture de la connexion lorsque l'application s'arrête
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

