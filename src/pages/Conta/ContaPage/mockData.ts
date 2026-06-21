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

export const ORDERS: MockOrder[] = [
  {
    id: '1',
    title: 'Duna: Parte Dois',
    cinema: 'CINEFESP São José dos Campos',
    date: '28 jun, 19h40',
    room: 'Sala 3 · 3D',
    seats: ['F7', 'F8'],
    extras: 'Bomboniere: 1 pipoca grande · 2 refrigerantes',
    status: 'confirmado',
    total: 'R$ 78,00',
    totalNote: '1 inteira + 1 meia',
    code: '#PED-2026-0412',
  },
  {
    id: '2',
    title: 'Cidade de Deus',
    cinema: 'CINEFESP São José dos Campos',
    date: '10 jun, 21h00',
    room: 'Sala 1 · 2D',
    seats: ['C12'],
    status: 'utilizado',
    total: 'R$ 16,00',
    totalNote: '1 meia',
    code: '#PED-2026-0388',
  },
  {
    id: '3',
    title: 'Bacurau',
    cinema: 'CINEFESP São José dos Campos',
    date: '02 jun, 18h30',
    room: 'Sala 2 · 2D',
    seats: ['D5', 'D6'],
    status: 'cancelado',
    total: 'R$ 44,00',
    totalNote: 'Reembolsado',
    code: '#PED-2026-0351',
  },
];

export const REVIEWS: MockReview[] = [
  {
    id: '1',
    title: 'Cidade de Deus',
    rating: 5,
    date: '12 jun 2026',
    text: 'Clássico absoluto do cinema nacional. A fotografia e a montagem são impecáveis — vale cada minuto na tela grande.',
  },
  {
    id: '2',
    title: 'Bacurau',
    rating: 4,
    date: '03 jun 2026',
    text: 'Mistura gêneros de um jeito ousado. Demora pra engrenar, mas o terceiro ato compensa. Recomendo.',
  },
];

export const ELIGIBLE: MockEligible[] = [
  { id: '1', title: 'Duna: Parte Dois', watchedOn: '28 jun' },
  { id: '2', title: 'Central do Brasil', watchedOn: '21 mai' },
];
