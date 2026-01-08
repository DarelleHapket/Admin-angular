import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { couriers } from '../models/courier.model';
import { api_url } from '../../helpers/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class CourierService {


  constructor(private http: HttpClient) { }

  /**   Tous les livreurs */
  getCouriers(): Observable<couriers[]> {
    return this.http
      .get<ApiResponse<couriers[]>>(api_url.livreurs.getAll)
      .pipe(map(res => res.data));
  }

  /**   Créer un livreur */
  createCourier(payload: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<couriers> {
    return this.http
      .post<ApiResponse<couriers>>(api_url.livreurs.add, payload)
      .pipe(map(res => res.data));
  }

  /** assigner une commande */
  assignOrder(id_order: number, payload: {
    id: number;
  }): Observable<couriers> {
    return this.http
      .post<ApiResponse<couriers>>(api_url.livreurs.assignOrder(id_order), payload)
      .pipe(map(res => res.data));
  }
}
