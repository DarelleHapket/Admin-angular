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
}
