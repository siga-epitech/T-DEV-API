import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private readonly openFoodFactsApiUrl = 'https://world.openfoodfacts.org/api/v0/product';

  // Méthode pour rechercher un produit et ne garder que certains champs
  async getProductFromOpenFoodFacts(barcode: string) {
    try {
      const url = `${this.openFoodFactsApiUrl}/${barcode}.json`;
      const response = await axios.get(url);
      const productData = response.data;

      // Vérifier si le produit est trouvé
      if (!productData || productData.status !== 1) {
        throw new Error('Produit non trouvé dans Open Food Facts');
      }

      const product = productData.product;

      // Filtrage des champs souhaités
      const filteredProduct = {
        name: product.product_name,
        brand: product.brands,
        picture: product.image_url,
        barcode: product._id,
        energy_kcal_100g: product.nutriments?.['energy-kcal_100g'],
        sugars_100g: product.nutriments?.['sugars_100g'],
        fats_100g: product.nutriments?.['fat_100g'],
        proteins_100g: product.nutriments?.['proteins_100g'],
        carbohydrates_100g: product.nutriments?.['carbohydrates_100g'],
        salt_100g: product.nutriments?.['salt_100g'],
        fiber_100g: product.nutriments?.['fiber_100g'],
      };

      return filteredProduct;
    } catch (error) {
      console.error('Erreur lors de la récupération ou du filtrage du produit', error);
      throw error;
    }
  }
}
