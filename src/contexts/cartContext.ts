import { createContext } from 'react';
import type { CartItem, Produto } from '../types/cinema';

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  atualizar: (produto: Produto, quantidade: number) => void;
  limpar: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
