import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.models';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.css']
})
export class CommandesListComponent implements OnInit {

  // Toutes les commandes
  orders: Order[] = [];

  // Commandes filtrées (affichage)
  filteredOrders: Order[] = [];

  // Filtres
  filterDate: string = '';
  filterStatus: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /**
   * Chargement initial des commandes
   */
  loadOrders(): void {
    this.orders = this.orderService.getOrders();
    this.filteredOrders = [...this.orders]; // copie propre
  }

  /**
   * Application des filtres date / statut
   */
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      if (this.filterDate && order.date !== this.filterDate) return false;
      if (this.filterStatus && order.status !== this.filterStatus) return false;
      return true;
    });
  }

  /**
   * Mise à jour du statut
   */
  updateStatus(order: Order): void {
    this.orderService.updateStatus(order.id, order.status);
    this.loadOrders(); // recharge pour cohérence
  }

  /**
   * Placeholder détails
   */
  viewDetails(order: Order): void {
    alert(`Détails de la commande ${order.id} (à développer)`);
  }
}
