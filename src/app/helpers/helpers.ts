import { OrderStatus } from "../core/types";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  in_transit: 'En livraison',
  delivered: 'Livrée',
  cancelled: 'Annulée'
};

/**
 * Formate une date ISO en "dd/MM/yyyy HH:mm"
 * @param dateStr - chaîne ISO (ex: "2026-01-07T16:53:11.000000Z")
 * @returns date formatée
 */
export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return '—';

  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');  
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
