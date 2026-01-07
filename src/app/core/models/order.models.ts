// src/app/core/models/order.models.ts

export interface Order {
  id: number;
  client?: string;
  created_at: string;
  total_amount: number;
  status:
    | 'pending'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'failed'
    | 'in_transit';
}
