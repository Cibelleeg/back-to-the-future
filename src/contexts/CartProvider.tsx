import { useState, type ReactNode } from 'react';
import type { CartItem, Produto, Sessao } from '../types/cinema';
import type { UserOrder } from '../types/order';
import { CartContext, type SessaoVinculada } from './CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessaoVinculada, setSessaoVinculada] = useState<SessaoVinculada | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

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

  function isSameCartItem(a: CartItem, b: CartItem) {
    return a.idProduto === b.idProduto
      && (a.tamanho ?? null) === (b.tamanho ?? null)
      && (a.tipo ?? null) === (b.tipo ?? null);
  }

  function atualizarItem(item: CartItem, quantidade: number) {
    setItems(prev => {
      if (quantidade <= 0) return prev.filter(i => !isSameCartItem(i, item));
      return prev.map(i => isSameCartItem(i, item) ? { ...i, quantidade } : i);
    });
  }

  function removerItem(item: CartItem) {
    atualizarItem(item, 0);
  }

  function vincularSessao(sessao: Sessao, filmeTitulo: string, cinemaNome?: string) {
    setSessaoVinculada({ sessao, filmeTitulo, cinemaNome });
  }

  function desvincularSessao() { setSessaoVinculada(null); }

  function limpar() { setItems([]); setSessaoVinculada(null); }

  function abrirCarrinho() { setCartOpen(true); }

  function fecharCarrinho() { setCartOpen(false); }

  function registrarPedido(pedido: UserOrder) {
    setUserOrders(prev => [pedido, ...prev]);
  }

  const countProdutos = items.reduce((acc, i) => acc + i.quantidade, 0);
  const count = countProdutos + (sessaoVinculada ? 1 : 0);
  const total = items.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider value={{ items, count, total, cartOpen, userOrders, sessaoVinculada, abrirCarrinho, fecharCarrinho, atualizar, atualizarItem, removerItem, vincularSessao, desvincularSessao, registrarPedido, limpar }}>
      {children}
    </CartContext.Provider>
  );
}
