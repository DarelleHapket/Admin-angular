import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { couriers } from '../models/courier.model';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  private baseUrl =
    'https://tp4buymore-production.up.railway.app/api/admin/livreurs';

  constructor(private http: HttpClient) {}

  /** 🔹 Tous les livreurs */
  getCouriers(): Observable<couriers[]> {
    return this.http
      .get<ApiResponse<couriers[]>>(this.baseUrl)
      .pipe(map(res => res.data));
  }

  /** 🔹 Créer un livreur */
  createCourier(payload: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<couriers> {
    return this.http
      .post<ApiResponse<couriers>>(this.baseUrl, payload)
      .pipe(map(res => res.data));
  }
}
