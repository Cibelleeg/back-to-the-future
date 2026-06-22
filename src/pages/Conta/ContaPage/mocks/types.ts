import type { OrderStatus, UserOrder } from '../../../../types/order';

export type { OrderStatus };
export type MockOrder = UserOrder;

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
