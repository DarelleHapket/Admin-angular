import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../core/models/order.models';
import { OrderService } from '../../../../core/services/orders.service';
import { CourierService } from '../../../../core/services/courier.service';
import { formatDate } from '../../../../helpers/helpers';
import { OrderStatus } from '../../../../core/types';
import { couriers } from '../../../../core/models/courier.model';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent implements OnInit {

  formatOrderDate(order: Order): string {
    return formatDate(order.created_at);
  }

  livreur: couriers[] = [];
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  filterDate = '';
  filterStatus = '';

  /**
   * 🔹 Mapping des statuts BACK (API) → FRONT (UI en français)
   * Clés = valeurs stockées dans order.status (celles de l'API Laravel)
   */
  private statusMap: Record<OrderStatus, string> = {
    pending: 'En attente',
    processing: 'En cours',
    in_transit: 'En livraison',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  };

  get statusEntries(): { key: OrderStatus; value: string }[] {
    return (Object.keys(this.statusMap) as OrderStatus[]).map(key => ({
      key,
      value: this.statusMap[key]
    }));
  }

  constructor(
    private ordersService: OrderService,
    private router: Router,
    private courierService: CourierService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: data => {
        this.orders = data;
        this.filteredOrders = data;
        this.applyFilters(); // pour initialiser correctement les filtres
      },
      error: err => console.error('Erreur chargement commandes', err)
    });

    this.courierService.getCouriers().subscribe({
      next: data => {
        this.livreur = data;
      },
      error: err => console.error('Erreur chargement des livreurs', err)
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchStatus = !this.filterStatus || order.status === this.filterStatus;
      const matchDate = !this.filterDate || order.created_at?.startsWith(this.filterDate);
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

    this.ordersService.updateOrderStatus(order.id, backendStatus).subscribe({
      next: () => {
        console.log('Statut mis à jour avec succès');
        location.reload()
        // Optionnel : recharger les commandes ou notifier
      },
      error: err => {
        console.error('Erreur mise à jour statut', err)
        location.reload() 
      }
    });
  }

  /** 🔹 Mise à jour du livreur */
  updateCourier(order: Order): void {
    const courierId = order.livreur_id; // peut être null

    this.courierService.assignOrder(order.id, { id: courierId }).subscribe({
      next: () => {
        console.log('Livreur mis à jour avec succès');
        // Met à jour l'objet livreur complet si nécessaire
        const selectedCourier = this.livreur.find(c => c.id === courierId);
        order.livreur = selectedCourier || null;
      },
      error: err => {
        console.error('Erreur mise à jour livreur', err);
        // Optionnel : revert la sélection en cas d'erreur
      }
    });
  }

  viewDetails(order: Order): void {
    this.router.navigate(['/admin/commandes', order.id]);
  }
}