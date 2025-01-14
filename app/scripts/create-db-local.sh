#!/bin/bash

# Vérification que PostgreSQL est prêt
echo "Vérification que PostgreSQL est disponible sur localhost..."
until pg_isready -h localhost -p 5432 -U postgres; do
  sleep 2
done

# Vérifier si l'utilisateur 'trinity' existe déjà
echo "Vérification de l'existence de l'utilisateur 'trinity'"
psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_roles WHERE rolname='trinity'" | grep -q 1 || psql -U postgres -h localhost -c "CREATE USER trinity WITH PASSWORD 'trinity';" || exit 1

# Donner la permission de création de base de données à 'trinity'
echo "Accorder la permission CREATE DATABASE à 'trinity'"
psql -U postgres -h localhost -c "ALTER USER trinity CREATEDB;" || exit 1

# Vérifier si la base de données 'trinity_dev' existe déjà
echo "Vérification de l'existence de la base de données 'trinity_dev'"
psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='trinity_dev'" | grep -q 1 || psql -U postgres -h localhost -c "CREATE DATABASE trinity_dev;" || exit 1

# Accorder les privilèges à l'utilisateur 'trinity' sur la base de données 'trinity_dev'
echo "Accorder les privilèges à 'trinity'"
psql -U postgres -h localhost -d trinity_dev -c "GRANT ALL PRIVILEGES ON DATABASE trinity_dev TO trinity;" || exit 1
psql -U postgres -h localhost -d trinity_dev -c "GRANT ALL PRIVILEGES ON SCHEMA public TO trinity;" || exit 1
psql -U postgres -h localhost -d trinity_dev -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO trinity;" || exit 1
psql -U postgres -h localhost -d trinity_dev -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO trinity;" || exit 1

# Base de données ok 
echo "Base de données locale prête à l'emploi."
