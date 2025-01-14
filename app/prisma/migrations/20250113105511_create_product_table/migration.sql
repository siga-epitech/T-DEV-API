-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "picture" TEXT,
    "category_id" INTEGER,
    "barcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionalInfo" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "energy_kcal_100g" DOUBLE PRECISION,
    "sugars_100g" DOUBLE PRECISION,
    "fats_100g" DOUBLE PRECISION,
    "proteins_100g" DOUBLE PRECISION,
    "carbohydrates_100g" DOUBLE PRECISION,
    "salt_100g" DOUBLE PRECISION,
    "fiber_100g" DOUBLE PRECISION,

    CONSTRAINT "NutritionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- AddForeignKey
ALTER TABLE "NutritionalInfo" ADD CONSTRAINT "NutritionalInfo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
