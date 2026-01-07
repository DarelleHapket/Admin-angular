import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ OBLIGATOIRE pour ngModel

import { AssignmentService } from '../../../../core/services/assignment.service';
import { Order } from '../../../../core/models/order.models';
import { Courier } from '../../../../core/models/assignment.model';

@Component({
  selector: 'app-assignment-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // ✅ AJOUT CRUCIAL
  ],
  templateUrl: './assignment-board.component.html',
  styleUrls: ['./assignment-board.component.scss']
})
export class AssignmentBoardComponent implements OnInit {

  pendingOrders: (Order & { selectedCourierId?: number })[] = [];
  availableCouriers: Courier[] = [];
  isLoading = false;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.assignmentService.getPendingOrders().subscribe({
      next: (orders) => {
        this.pendingOrders = orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement commandes', err);
        alert('Erreur lors du chargement des commandes');
        this.isLoading = false;
      }
    });

    this.assignmentService.getAvailableCouriers().subscribe({
      next: (couriers) => {
        this.availableCouriers = couriers;
      },
      error: (err) => {
        console.error('Erreur chargement livreurs', err);
      }
    });
  }

  assign(orderId: number, courierId?: number): void {
    if (!courierId) return;

    this.assignmentService.assignOrder(orderId, courierId).subscribe({
      next: () => {
        this.pendingOrders = this.pendingOrders.filter(o => o.id !== orderId);
      },
      error: (err) => {
        console.error('Erreur assignation', err);
        alert('Impossible d’assigner cette commande');
      }
    });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Réservée',
      paid: 'Payée',
      processing: 'À livrer',
      in_transit: 'En livraison',
      delivered: 'Livrée',
      failed: 'Échec'
    };
    return map[status] || status;
  }
}
