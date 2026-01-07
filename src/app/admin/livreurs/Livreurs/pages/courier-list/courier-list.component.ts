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
}
