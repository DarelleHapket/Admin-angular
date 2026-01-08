import { OrderStatus } from "../types";
import { couriers } from "./courier.model";

export interface Order {
  id: number;
  client?: string;
  created_at: string;
  total_amount: number;
  cart: {
    user: {
      name: string
    }
  },
  status: OrderStatus,
  qr_code_url: string;
  livreur?: couriers | null;         
  livreur_id?: number | null;      
}