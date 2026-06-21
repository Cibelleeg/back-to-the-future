import { createContext } from 'react';
import type { CartItem, Produto, Sessao } from '../types/cinema';

export interface SessaoVinculada {
  sessao: Sessao;
  filmeTitulo: string;
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  sessaoVinculada: SessaoVinculada | null;
  atualizar: (produto: Produto, quantidade: number) => void;
  vincularSessao: (sessao: Sessao, filmeTitulo: string) => void;
  desvincularSessao: () => void;
  limpar: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
