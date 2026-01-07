import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../core/models/order.models';
import { OrderService } from '../../../../core/services/orders.service';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent implements OnInit {

  orders: Order[] = [];
  filteredOrders: Order[] = [];

  filterDate = '';
  filterStatus = '';

  /**
   * 🔹 Mapping des statuts FRONT (UI) → BACK (API Laravel)
   */
  private statusMap: Record<string, string> = {
    RESERVE: 'pending',
    A_LIVRER: 'processing',
    LIVREE: 'delivered',
    ECHEC: 'failed'
  };

  constructor(
    private ordersService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /** 🔹 Charger les commandes */
  loadOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: data => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: err => console.error('Erreur chargement commandes', err)
    });
  }

  /** 🔹 Appliquer les filtres */
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {

      const matchStatus =
        !this.filterStatus || order.status === this.filterStatus;

      const matchDate =
        !this.filterDate ||
        order.created_at?.startsWith(this.filterDate);

      return matchStatus && matchDate;
    });
  }

  /** 🔹 Mise à jour du statut */
  updateStatus(order: Order): void {
    const backendStatus = this.statusMap[order.status];

    if (!backendStatus) {
      console.error('Statut non reconnu:', order.status);
      return;
    }

    this.ordersService
      .updateOrderStatus(order.id, backendStatus)
      .subscribe({
        next: () => console.log('Statut mis à jour'),
        error: err => console.error('Erreur mise à jour statut', err)
      });
  }

  /** 🔹 Voir les détails */
  viewDetails(order: Order): void {
    this.router.navigate(['/admin/commandes', order.id]);
  }
}
