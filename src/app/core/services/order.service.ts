import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = [
    { id: 1, client: 'Client A', date: '2025-12-23', amount: 1500, status: 'RESERVE' as const },
    { id: 2, client: 'Client B', date: '2025-12-22', amount: 2200, status: 'A_LIVRER' as const },
    { id: 3, client: 'Client C', date: '2025-12-21', amount: 800, status: 'LIVREE' as const },
    { id: 4, client: 'Client D', date: '2025-12-20', amount: 3000, status: 'ECHEC' as const },
    { id: 5, client: 'Client E', date: '2025-12-19', amount: 1200, status: 'RESERVE' as const }
  ];

  getOrders() {
    return this.orders;
  }

  updateStatus(id: number, newStatus: 'RESERVE' | 'A_LIVRER' | 'LIVREE' | 'ECHEC') {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = newStatus;
    }
  }
}