import type { OrderStatus, UserOrder } from '../../../../types/order';
import type { UserReview } from '../../../../types/review';

export type { OrderStatus };
export type MockOrder = UserOrder;
export type MockReview = UserReview;

export interface MockEligible {
  id: string;
  title: string;
  watchedOn: string;
}
