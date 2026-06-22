export type OrderStatus = 'confirmado' | 'utilizado' | 'cancelado';

export interface UserOrder {
  id: string;
  title: string;
  cinema: string;
  date: string;
  room: string;
  seats: string[];
  extras?: string;
  status: OrderStatus;
  total: string;
  totalNote: string;
  code: string;
}
