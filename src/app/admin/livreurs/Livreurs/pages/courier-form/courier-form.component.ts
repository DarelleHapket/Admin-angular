import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { couriers } from '../../../../../core/models/courier.model';
import { CourierService } from '../../../../../core/services/courier.service';

@Component({
  selector: 'app-courier-form',
  templateUrl: './courier-form.component.html'
})
export class CourierFormComponent {

  // Objet lié au formulaire
  courier: couriers = {
    id: 0,
    name: '',
    phone: '',
    available: true
  };

  constructor(
    private courierService: CourierService,
    private router: Router
  ) {}

  // SUBMIT DU FORMULAIRE
  saveCourier() {

    // Génération simple d’ID (mock)
    this.courier.id = Date.now();

    // Appel du service (CREATE)
    this.courierService.addCourier(this.courier);

    // Retour à la liste
    this.router.navigate(['/admin/couriers']);
  }
}
