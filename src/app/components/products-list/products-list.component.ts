
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { BASE_URL } from '../../helpers/api';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'is_active', 'rating'];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
        this.error = 'Impossible de charger les produits. Veuillez réessayer plus tard.';
        this.loading = false;
      },
    });
  }


  getMainImage(product: Product): string {
    console.log('productproductproductproduct:',product)
    if (!product.images || product.images.length === 0) {
      return BASE_URL + '/assets/no-image.png'; // Assure-toi que cette image existe côté backend
    }

    const first = product.images[0]; 

    return BASE_URL +'storage/'+first;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/no-image.png';
  }
}