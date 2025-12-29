import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Router } from '@angular/router';




interface Order {
  id: number;
  client: string;
  date: Date;
  amount: number;
  statut: 'Réservée' | 'À livrer' | 'Livrée' | 'Échec';
}

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.css']
})
export class CommandesListComponent implements OnInit {

  // Toutes les commandes
  orders: Order[] = [
    { id: 1, client: 'Aminata Koné', date: new Date('2025-12-28'), amount: 24500, statut: 'À livrer' },
    { id: 2, client: 'Jean Dupont', date: new Date(), amount: 18900, statut: 'Réservée' },
    { id: 3, client: 'Fatoumata Diallo', date: new Date(), amount: 32000, statut: 'Livrée' },
    { id: 4, client: 'Moussa Traoré', date: new Date(), amount: 15700, statut: 'Échec' },
    { id: 5, client: 'Marie Claire', date: new Date(), amount: 29000, statut: 'À livrer' }
  ];

  filteredOrders: Order[] = [];

  // Filtres
  filterDate: string = '';
  filterStatus: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredOrders = this.orders;
  }

 
  /**
   * Application des filtres date / statut
   */
applyFilters(): void {
  this.filteredOrders = this.orders.filter(order => {
    // Filtre par date (si une date est sélectionnée)
    if (this.filterDate) {
      // Convertir les deux dates au format YYYY-MM-DD pour comparaison fiable
      const selectedDate = this.filterDate; // déjà au format YYYY-MM-DD depuis <input type="date">
      const orderDateStr = new Date(order.date).toISOString().split('T')[0];

      if (orderDateStr !== selectedDate) {
        return false;
      }
    }

    // Filtre par statut (si un statut est sélectionné)
    if (this.filterStatus) {
      // Attention : vérifie la cohérence du nom de propriété !
      // Dans ton interface, c'est probablement 'statut' et non 'status'
      if (order.statut !== this.filterStatus) {   // ← Utilise 'statut' ici
        return false;
      }
    }

    // Si les deux filtres passent → on garde la commande
    return true;
  });
}

  /**
   * Mise à jour du statut
   */
 updateStatus(order: any): void {
    alert(`Statut changé pour la commande #${order.id}`);
  }

  /**
   * Placeholder détails
   */
 viewDetails(order: Order): void {
    // Navigation vers la page détail avec l'ID de la commande
    this.router.navigate(['/admin/commandes', order.id]);
  }
}
