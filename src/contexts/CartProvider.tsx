import { useState, type ReactNode } from 'react';
import type { CartItem, Produto, Sessao } from '../types/cinema';
import { CartContext, type SessaoVinculada } from './CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessaoVinculada, setSessaoVinculada] = useState<SessaoVinculada | null>(null);

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

  function vincularSessao(sessao: Sessao, filmeTitulo: string) {
    setSessaoVinculada({ sessao, filmeTitulo });
  }

  function desvincularSessao() { setSessaoVinculada(null); }

  function limpar() { setItems([]); setSessaoVinculada(null); }

  const count = items.reduce((acc, i) => acc + i.quantidade, 0);
  const total = items.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider value={{ items, count, total, sessaoVinculada, atualizar, vincularSessao, desvincularSessao, limpar }}>
      {children}
    </CartContext.Provider>
  );
}
