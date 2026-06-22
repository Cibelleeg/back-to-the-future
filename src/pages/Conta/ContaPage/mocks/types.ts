export type OrderStatus = 'confirmado' | 'utilizado' | 'cancelado';

export interface MockOrder {
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

export interface MockReview {
  id: string;
  title: string;
  rating: number;
  date: string;
  text: string;
}

export interface MockEligible {
  id: string;
  title: string;
  watchedOn: string;
}
