import { createContext } from 'react';
import type { Assento, CartItem, Produto, Sessao, TipoIngresso } from '../types/cinema';
import type { UserOrder } from '../types/order';

export interface SessaoVinculada {
  sessao: Sessao;
  filmeTitulo: string;
  cinemaNome?: string;
  assentos: Assento[];
  tipoIngresso: TipoIngresso;
  precoIngresso: number;
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  cartOpen: boolean;
  userOrders: UserOrder[];
  sessaoVinculada: SessaoVinculada | null;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  atualizar: (produto: Produto, quantidade: number) => void;
  atualizarItem: (item: CartItem, quantidade: number) => void;
  removerItem: (item: CartItem) => void;
  vincularSessao: (sessao: Sessao, filmeTitulo: string, cinemaNome: string | undefined, assentos: Assento[], tipoIngresso: TipoIngresso) => void;
  desvincularSessao: () => void;
  registrarPedido: (pedido: UserOrder) => void;
  limpar: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
