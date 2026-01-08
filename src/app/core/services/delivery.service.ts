import { Injectable } from '@angular/core';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  // DOnnees mockee : liste des livraisons 
  // orderId fait le lien avec une commande(Order)

   private deliveries: Delivery[] = [
    {
      id: 1,
      orderId: 2,
      courier: 'Livreur A',
      date: '2025-12-23',
      status: 'EN_COURS'
    },
    {
      id: 2,
      orderId: 4,
      courier: 'Livreur B',
      date: '2025-12-22',
      status: 'LIVREE'
    }
  ];

  /**
   * Retourne toutes les livraisons
   */
  getDeliveries(): Delivery[] {
    return this.deliveries;
  }


  /**
   * Met à jour le statut d'une livraison
   * @param id identifiant de la livraison
   * @param newStatus nouveau statut (EN_COURS | LIVREE | ECHEC)
   */
  updateStatus(id: number, newStatus: Delivery['status']): void {
    const delivery = this.deliveries.find(d => d.id === id);
    if (delivery) {
      delivery.status = newStatus;
    }
}
}