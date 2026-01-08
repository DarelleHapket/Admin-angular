// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductFormData } from '../models/product.model'; 
import { api_url } from '../../helpers/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  status?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  /** 🔹 Récupérer tous les produits */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<any>>(api_url.products.getAll).pipe(
      map(response => {
        if (!response.success || !response.data) {
          return [];
        }

        // Cas 1: data est un tableau direct de produits
        if (Array.isArray(response?.data?.data)) {
          return response.data;
        }

        // Cas 2: data contient une clé (ex: { products: [...] })
        // Si ton API renvoie { data: { products: [...] } } ou similaire
        const dataValues = Object.values(response.data);
        if (dataValues.length > 0 && Array.isArray(dataValues[0])) {
          return dataValues[0] as Product[];
        }

        // Cas 3: fallback sécurisé
        return [];
      })
    );
  }

  /** 🔹 Récupérer un produit par ID */
  getProductById(id: number): Observable<Product> {
    return this.http.get<ApiResponse<any>>(api_url.products.getOne(id)).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error('Produit non trouvé');
        }

        // Si data contient directement le produit
        if (response.data.id) {
          return response.data as Product;
        }

        // Si imbriqué dans une clé (ex: { product: { ... } })
        return Object.values(response.data)[0] as Product;
      })
    );
  }

  /** 🔹 Créer un produit */
  createProduct(productData: ProductFormData): Observable<any> {
    const formData = this.buildFormData(productData);
    return this.http.post<ApiResponse<any>>(api_url.products.add, formData).pipe(
      map(response => {
        // Retourne la réponse complète ou juste les données utiles
        return response.success ? response.data : null;
      })
    );
  }

  /** 🔹 Mettre à jour un produit */
  updateProduct(id: number, productData: ProductFormData): Observable<any> {
    const formData = this.buildFormData(productData);
    return this.http.put<ApiResponse<any>>(api_url.products.update(id), formData).pipe(
      map(response => {
        return response.success ? response.data : null;
      })
    );
  }

  /** Construire le FormData (partagé) */
  private buildFormData(data: ProductFormData): FormData {
    const formData = new FormData();

    formData.append('name', data.name.trim());
    formData.append('description', data.description.trim());
    formData.append('price', data.price.toString());
    formData.append('quantity', data.quantity.toString());
    formData.append('is_active', data.is_active ? 'true' : 'false');
    formData.append('rating', data.rating.toString());

    data.images.forEach(image => {
      formData.append('images[]', image);
    });

    data.cat_ids.forEach(id => {
      formData.append('cat_ids[]', id.toString());
    });

    return formData;
  }
}