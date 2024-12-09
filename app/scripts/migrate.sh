#!/bin/bash

set -e  # Arrêter en cas d'erreur

echo "Waiting for database to be ready..."
./scripts/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is ready!"

echo "Regenerating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy
echo "Prisma migrations completed."

echo "Running seed script..."
npx ts-node --require tsconfig-paths/register ./prisma/seed.ts
echo "Seed script executed successfully."