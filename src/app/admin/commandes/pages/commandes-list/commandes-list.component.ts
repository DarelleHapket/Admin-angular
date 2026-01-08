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
    this.ordersService
      .updateOrderStatus(order.id, order.status)
      .subscribe({
        next: () => console.log('Statut mis à jour'),
        error: err => console.error('Erreur mise à jour statut', err)
      });
  }

  /** 🔹 Voir les détails */
  viewDetails(order: Order): void {
    this.router.navigate(['/admin/commandes', order.id]);
  }

  /** 🔹 Obtenir le nombre de commandes par statut */
  getStatusCount(status: string): number {
    return this.orders.filter(order => order.status === status).length;
  }

  /** 🔹 Réinitialiser les filtres */
  resetFilters(): void {
    this.filterDate = '';
    this.filterStatus = '';
    this.applyFilters();
  }

  /** 🔹 Obtenir les initiales du client */
  getInitials(clientName: string | undefined): string {
    if (!clientName) return '??';
    const names = clientName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return clientName.substring(0, 2).toUpperCase();
  }
}
