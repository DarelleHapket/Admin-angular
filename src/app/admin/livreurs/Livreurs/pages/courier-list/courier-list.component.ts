import { Component, OnInit } from '@angular/core';
import { couriers } from '../../../../../core/models/courier.model';
import { CourierService } from '../../../../../core/services/courier.service';

@Component({
  selector: 'app-courier-list',
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css']
})
export class CourierListComponent implements OnInit {

  couriers: couriers[] = [];
  loading = false;
  errorMessage = '';

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.loadCouriers();
  }

  loadCouriers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.courierService.getCouriers().subscribe({
      next: (data) => {
        console.log('Livreurs reçus :', data); // 🔍 DEBUG IMPORTANT
        this.couriers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors du chargement des livreurs';
        this.loading = false;
      }
    });
  }

  /** Obtenir les initiales du livreur */
  getCourierInitials(courier: couriers): string {
    if (!courier.name) return '??';
    const names = courier.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return courier.name.substring(0, 2).toUpperCase();
  }

  /** Nombre de livreurs actifs (mock) */
  getActiveCount(): number {
    return Math.min(this.couriers.length, Math.floor(this.couriers.length * 0.85));
  }

  /** Total livraisons effectuées (mock) */
  getTotalDeliveries(): number {
    return this.couriers.length * 42; // Mock: 42 livraisons par livreur en moyenne
  }
}
