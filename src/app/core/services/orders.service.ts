import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order.models';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl =
    'https://tp4buymore-production.up.railway.app/api/admin/orders';

  constructor(private http: HttpClient) {}

  /** 🔹 Récupérer toutes les commandes */
  getAllOrders(): Observable<Order[]> {
    return this.http
      .get<ApiResponse<{ data: Order[] }>>(this.baseUrl)
      .pipe(
        map(res => res.data.data)
      );
  }

  /** 🔹 Mettre à jour le statut d’une commande */
  updateOrderStatus(
    orderId: number,
    status: string
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/${orderId}/status`,
      { status }
    );
  }
}
