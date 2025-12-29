import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Delivery {
  id: number;
  orderId: number;
  courier: string;
  date: Date | string;
  status: 'EN_COURS' | 'LIVREE' | 'ECHEC';
}

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  // Données simulées pour tester (remplace plus tard par un service/API)
  deliveries: Delivery[] = [
    { id: 101, orderId: 1, courier: 'Traoré Moussa', date: new Date('2025-12-29'), status: 'EN_COURS' },
    { id: 102, orderId: 2, courier: 'Koffi Jean', date: new Date('2025-12-28'), status: 'LIVREE' },
    { id: 103, orderId: 3, courier: 'Konaté Fatoumata', date: new Date('2025-12-27'), status: 'EN_COURS' },
    { id: 104, orderId: 4, courier: 'Traoré Moussa', date: new Date('2025-12-26'), status: 'ECHEC' },
    { id: 105, orderId: 5, courier: 'Non assigné', date: new Date(), status: 'EN_COURS' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Ici tu pourras charger les données depuis un service plus tard
  }

  // ← Navigation vers le détail de la commande liée
  goToOrder(orderId: number): void {
    this.router.navigate(['/admin/commandes', orderId]);
  }

  // ← Classe CSS pour le badge selon le statut
  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  // ← Texte lisible pour l'affichage (optionnel mais plus joli)
  getStatusLabel(status: string): string {
    switch (status) {
      case 'EN_COURS': return 'En cours';
      case 'LIVREE': return 'Livrée';
      case 'ECHEC': return 'Échec';
      default: return status;
    }
  }

  // ← Modification du statut avec confirmation
  openStatusEdit(delivery: Delivery): void {
    const nouveauStatut = prompt(
      'Changer le statut de la livraison :\nEN_COURS / LIVREE / ECHEC',
      delivery.status
    );

    if (nouveauStatut && ['EN_COURS', 'LIVREE', 'ECHEC'].includes(nouveauStatut.toUpperCase())) {
      delivery.status = nouveauStatut.toUpperCase() as 'EN_COURS' | 'LIVREE' | 'ECHEC';
      this.updateStatus(delivery);
    }
  }

  // ← Méthode appelée après changement (simulation)
  updateStatus(delivery: Delivery): void {
    console.log(`Statut de la livraison #${delivery.id} changé en : ${delivery.status}`);
    alert(`Statut mis à jour : ${this.getStatusLabel(delivery.status)}`);
    // Plus tard : appel API ici, ex: this.deliveryService.updateStatus(delivery.id, delivery.status)
  }
}