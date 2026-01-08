import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from '../core/services/utils/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div *ngFor="let toast of toasts" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
           [ngClass]="{'bg-danger text-white': toast.type === 'error', 'bg-success text-white': toast.type === 'success', 'bg-info text-white': toast.type === 'info'}">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.type | titlecase }}</strong>
          <button type="button" class="btn-close" (click)="removeToast(toast)"></button>
        </div>
        <div class="toast-body">{{ toast.message }}</div>
      </div>
    </div>
  `,
  styles: [``] // Ajoute des styles si besoin
})
export class ToastContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      // Auto-dismiss après 5s (optionnel)
      setTimeout(() => this.removeToast(toast), 5000);
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}