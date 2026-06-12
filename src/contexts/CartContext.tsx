import { createContext, useState, type ReactNode } from 'react';
import type { CartItem, Produto } from '../types/cinema';

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  atualizar: (produto: Produto, quantidade: number) => void;
  limpar: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function atualizar(produto: Produto, quantidade: number) {
    setItems(prev => {
      if (quantidade === 0) return prev.filter(i => i.idProduto !== produto.idProduto);
      const existente = prev.find(i => i.idProduto === produto.idProduto);
      if (existente) return prev.map(i => i.idProduto === produto.idProduto ? { ...i, quantidade } : i);
      return [...prev, {
        idProduto: produto.idProduto,
        idCinema:  produto.idCinema,
        nome:      produto.nome,
        preco:     produto.preco,
        quantidade,
      }];
    });
  }

  function limpar() { setItems([]); }

  const count = items.reduce((acc, i) => acc + i.quantidade, 0);
  const total = items.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider value={{ items, count, total, atualizar, limpar }}>
      {children}
    </CartContext.Provider>
  );
}
