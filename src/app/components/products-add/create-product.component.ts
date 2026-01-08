import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { ProductFormData } from '../../core/models/product.model';
import { ToastService } from '../../core/services/utils/toast.service';

interface PreviewImage {
  file: File;
  url: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  previewImages: PreviewImage[] = [];
  selectedCatIds: number[] = [];
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  // Liste des catégories (statique pour l'instant)
  categories: Category[] = JSON.parse(localStorage.getItem('all_categories') || '[]')

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,// Injection du service
    private toastService: ToastService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      is_active: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.previewImages = []; // Réinitialise l'aperçu

      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
  }

  toggleCategory(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedCatIds.includes(id)) {
        this.selectedCatIds.push(id);
      }
    } else {
      this.selectedCatIds = this.selectedCatIds.filter(c => c !== id);
    }
  }

  onSubmit(): void {
    if (
      this.productForm.invalid ||
      this.previewImages.length === 0 ||
      this.selectedCatIds.length === 0
    ) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const productData: ProductFormData = {
      name: this.productForm.get('name')!.value.trim(),
      description: this.productForm.get('description')!.value.trim(),
      price: this.productForm.get('price')!.value,
      quantity: this.productForm.get('quantity')!.value,
      is_active: this.productForm.get('is_active')!.value,
      rating: this.productForm.get('rating')!.value,
      images: this.previewImages.map(img => img.file),
      cat_ids: this.selectedCatIds
    };

    this.productService.createProduct(productData).subscribe({
      next: (response) => {
        console.log('Produit créé avec succès', response);
        this.toastService.showSuccess('Produit créé avec succès !');
        this.submitSuccess = true;
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la création du produit', err);

        // Gestion intelligente des erreurs de validation Laravel
        if (err.error && err.error.errors) {
          // Cas classique Laravel validation (422)
          this.toastService.showValidationErrors(err.error.errors);
        } else if (err.error && err.error.message) {
          // Message générique
          this.toastService.showError(err.error.message);
        } else {
          this.toastService.showError('Une erreur est survenue lors de la création du produit.');
        }

        this.submitError = true;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      is_active: true,
      rating: 0
    });
    this.previewImages = [];
    this.selectedCatIds = [];
  }
}