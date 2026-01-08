import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourierService } from '../../../../../core/services/courier.service';

@Component({
  selector: 'app-courier-form',
  templateUrl: './courier-form.component.html',
  styleUrls: ['./courier-form.component.css']
})
export class CourierFormComponent {

  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.courierService.createCourier(this.form.value).subscribe({
      next: () => {
        // ✅ retour vers la liste
        this.router.navigate(['/admin/livreurs']);
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la création du livreur';
        this.loading = false;
      }
    });
  }
}
