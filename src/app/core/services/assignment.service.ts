// src/app/core/services/assignment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order.models';
import { Courier } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'https://tp4buymore-production.up.railway.app/api/admin';

  constructor(private http: HttpClient) {}

  // Les commandes prêtes à être assignées à un livreur
  getPendingOrders(): Observable<Order[]> {
    return this.http.get<any>(`${this.baseUrl}/orders`).pipe(
      map(res => {
        const orders = res.data || res; // au cas où la structure change

        return orders.filter((o: any) =>
          // À ADAPTER selon ce que tu vois dans Network tab
          // D'après tes écrans, c'est très probablement 'pending' ou 'reserved'
          o.status === 'pending' ||
          o.status === 'reserved' ||
          o.status === 'paid' // parfois c'est paid avant confirmation
        );
      })
    );
  }

  getAvailableCouriers(): Observable<Courier[]> {
    return this.http
      .get<any>(`${this.baseUrl}/livreurs?is_active=true`)
      .pipe(map(res => res.data || res));
  }

  assignOrder(orderId: number, courierId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/${orderId}/assign`, {
      courier_id: courierId
    });
  }
}