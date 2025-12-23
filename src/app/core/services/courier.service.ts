import { Injectable } from '@angular/core';
import { couriers } from '../models/courier.model';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  // Données MOCK (simulation d’une base de données)
  // Plus tard → remplacé par une API
  private couriers: couriers[] = [
    { id: 1, name: 'Livreur A', phone: '690000001', available: true },
    { id: 2, name: 'Livreur B', phone: '690000002', available: false }
  ];

  // =========================
  // READ → Lire les livreurs
  // =========================
  getCouriers(): couriers[] {
    return this.couriers;
  }

  // =========================
  // CREATE → Ajouter un livreur
  // =========================
  addCourier(courier: couriers) {
    this.couriers.push(courier);
  }

  // =========================
  // UPDATE → Modifier un livreur
  // =========================
  updateCourier(updated: couriers) {

    // On cherche l’index du livreur à modifier
    const index = this.couriers.findIndex(c => c.id === updated.id);

    // S’il existe, on le remplace
    if (index !== -1) {
      this.couriers[index] = updated;
    }
  }

  // =========================
  // DELETE → Supprimer un livreur
  // =========================
  deleteCourier(id: number) {

    // On garde tous les livreurs SAUF celui à supprimer
    this.couriers = this.couriers.filter(c => c.id !== id);
  }

  // =========================
  // MÉTIER → Disponibilité
  // =========================
  toggleAvailability(courier: couriers) {

    // On inverse l’état
    courier.available = !courier.available;
  }
}
