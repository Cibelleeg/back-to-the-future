import { useState, type ReactNode } from 'react';
import type { CartItem, Produto, Sessao } from '../types/cinema';
import { CartContext, type SessaoVinculada } from './CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessaoVinculada, setSessaoVinculada] = useState<SessaoVinculada | null>(null);

  function atualizar(produto: Produto, quantidade: number) {
    const sameItem = (item: CartItem) =>
      item.idProduto === produto.idProduto
      && (item.tamanho ?? null) === (produto.tamanho ?? null)
      && (item.tipo ?? null) === (produto.tipo ?? null);

    setItems(prev => {
      if (quantidade === 0) return prev.filter(i => !sameItem(i));
      const existente = prev.find(sameItem);
      if (existente) return prev.map(i => sameItem(i) ? { ...i, quantidade } : i);
      return [...prev, {
        idProduto: produto.idProduto,
        idCombo:   produto.idCombo,
        idCinema:  produto.idCinema,
        nome:      produto.nome,
        preco:     produto.preco,
        tamanho:   produto.tamanho ?? null,
        tipo:      produto.tipo ?? null,
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
