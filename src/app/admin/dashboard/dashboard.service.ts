import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  /**
   * Données fictives pour les cartes du dashboard
   * (simulation d’un appel API avec délai)
   */
  getStats(): Observable<any> {
    return of({
      totalOrders: 140,
      pendingOrders: 320,
      successfulDeliveries: 860,
      failedDeliveries: 60,
      successRate: 75,
      activeCouriers: 18,
      ongoingDeliveries: 42,
      cancelledOrders: 12,
      todayTotal: 96
    }).pipe(
      delay(2000) // Simule un délai réseau de 2 secondes
    );
  }

  /**
   * Données du graphique selon la période sélectionnée
   * @param period 'week' ou 'month'
   */
  getActivityStats(period: 'week' | 'month') {

    // Cas : affichage par semaine
    if (period === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        orders: [120, 190, 300, 250, 220, 170, 200],
        deliveries: [100, 160, 260, 210, 200, 150, 180]
      };
    }

    // Cas : affichage par mois
    return {
      labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
      orders: [820, 940, 1020, 880],
      deliveries: [760, 900, 980, 830]
    };
  }
}
