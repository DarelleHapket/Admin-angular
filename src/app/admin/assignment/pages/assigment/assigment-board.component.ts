import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Order {
  id: number;
  client: string;
  amount: number;
  date: Date | string;
  selectedCourierId?: number;  // Pour le select
}

interface Courier {
  id: number;
  name: string;
  phone: string;
  available: boolean;
  currentOrders: number;
}


@Component({
  selector: 'app-assigment-board',
  templateUrl: './assigment-board.component.html',
  styleUrls: ['./assigment-board.component.css']
})
export class AssigmentBoardComponent implements OnInit {

  

  // Commandes en attente d'assignation (simulées)
  pendingOrders: Order[] = [
    { id: 101, client: 'Aminata Koné', amount: 24500, date: new Date(), selectedCourierId: undefined },
    { id: 102, client: 'Jean Dupont', amount: 18900, date: new Date(), selectedCourierId: undefined },
    { id: 103, client: 'Fatoumata Diallo', amount: 32000, date: new Date(), selectedCourierId: undefined },
    { id: 104, client: 'Moussa Traoré', amount: 15700, date: new Date(), selectedCourierId: undefined }
  ];

  // Livreurs disponibles (simulés)
  availableCouriers: Courier[] = [
    { id: 1, name: 'Traoré Moussa', phone: '07 77 88 99 00', available: true, currentOrders: 2 },
    { id: 2, name: 'Koffi Jean', phone: '01 23 45 67 89', available: true, currentOrders: 1 },
    { id: 3, name: 'Konaté Fatou', phone: '05 55 55 55 55', available: false, currentOrders: 0 },
    { id: 4, name: 'Diallo Ibrahim', phone: '08 88 88 88 88', available: true, currentOrders: 3 }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Filtrer uniquement les livreurs disponibles au chargement
    this.availableCouriers = this.availableCouriers.filter(c => c.available);
  }

  // ← MÉTHODE MANQUANTE : assigner une commande à un livreur
  assignOrder(order: Order): void {
    if (!order.selectedCourierId) {
      alert('Veuillez choisir un livreur');
      return;
    }

    const courier = this.availableCouriers.find(c => c.id === order.selectedCourierId);
    if (courier) {
      alert(`Commande #${order.id} assignée à ${courier.name} !`);
      courier.currentOrders += 1;

      // Retire la commande de la liste des en attente
      this.pendingOrders = this.pendingOrders.filter(o => o.id !== order.id);

      // Réinitialise le select
      order.selectedCourierId = undefined;
    }
  }

  // ← MÉTHODE MANQUANTE : toggle disponibilité livreur
  toggleCourierAvailability(courier: Courier): void {
    courier.available = !courier.available;
    alert(`${courier.name} est maintenant ${courier.available ? 'disponible' : 'indisponible'}`);

    // Si on le rend indisponible, on le retire de la liste
    if (!courier.available) {
      this.availableCouriers = this.availableCouriers.filter(c => c.id !== courier.id);
    }
  }

  // Optionnel : navigation vers détail commande
  goToOrder(orderId: number): void {
    this.router.navigate(['/admin/commandes', orderId]);
  }
}