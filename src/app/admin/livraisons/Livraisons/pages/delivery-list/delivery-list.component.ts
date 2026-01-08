import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../../../core/models/delivery.model';
import { DeliveryService } from '../../../../../core/services/delivery.service';

/**
 * Composant DeliveryListComponent
 * -------------------------------
 * Affiche la liste des livraisons
 * et permet de modifier leur statut.
 */
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  /** Liste des livraisons affichées */
  deliveries: Delivery[] = [];

  /** Injection du service DeliveryService */
  constructor(private deliveryService: DeliveryService) {}

  /** Chargement initial des données */
  ngOnInit(): void {
    this.loadDeliveries();
  }

  /** Récupère les livraisons depuis le service */
  loadDeliveries(): void {
    this.deliveries = this.deliveryService.getDeliveries();
  }

  /**
   * Mise à jour du statut d'une livraison
   */
  updateStatus(delivery: Delivery): void {
    this.deliveryService.updateStatus(delivery.id, delivery.status);
  }

  /* ===================== AJOUTS POUR LE TEMPLATE ===================== */

  goToOrder(orderId: number): void {
    console.log('Navigation vers la commande', orderId);
  }

  getStatusClass(status: string): string {
    return 'status-' + status;
  }

  getStatusLabel(status: string): string {
    return status;
  }

  openStatusEdit(delivery: Delivery): void {
    console.log('Ouverture édition statut', delivery);
  }

  /** Compte le nombre de livraisons par statut */
  getStatusCount(status: string): number {
    return this.deliveries.filter(d => d.status === status).length;
  }

  /** Obtenir les initiales du livreur */
  getCourierInitials(courierName: string | undefined): string {
    if (!courierName || courierName === 'Non assigné') return '?';
    const names = courierName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return courierName.substring(0, 2).toUpperCase();
  }
}
