-- CreateTable: Products
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "picture" TEXT,
    "category_id" INTEGER,
    "barcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Nutritional Infos
CREATE TABLE "nutritional_infos" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "energy_kcal_100g" DOUBLE PRECISION,
    "sugars_100g" DOUBLE PRECISION,
    "fats_100g" DOUBLE PRECISION,
    "proteins_100g" DOUBLE PRECISION,
    "carbohydrates_100g" DOUBLE PRECISION,
    "salt_100g" DOUBLE PRECISION,
    "fiber_100g" DOUBLE PRECISION,
    CONSTRAINT "nutritional_infos_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "nutritional_infos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex: Unique constraints on Products
CREATE UNIQUE INDEX "products_name_key" ON "products" ("name");
CREATE UNIQUE INDEX "products_barcode_key" ON "products" ("barcode");