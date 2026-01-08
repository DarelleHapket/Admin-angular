// toast.service.ts (mise à jour)
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastSubject.next({ message, type });
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  // Nouvelle méthode pour extraire un message clair des erreurs Laravel
  showValidationErrors(errors: any) {
    let message = 'Veuillez corriger les erreurs suivantes :\n';

    // Parcours des erreurs (ex: errors.images.0, errors.name, etc.)
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const fieldErrors = errors[field];
        fieldErrors.forEach((err: string) => {
          // Nettoyage du nom du champ pour l'affichage
          const cleanField = field.replace(/\.\d+/g, '').replace(/_/g, ' '); // images.0 → images
          message += `• ${this.capitalize(cleanField)} : ${err}\n`;
        });
      }
    }

    this.showError(message.trim());
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}