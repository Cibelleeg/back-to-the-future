import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../../../types/cinema';
import { useCart } from '../../../contexts/useCart';
import { formataData, formataHora, formataPreco } from '../../../utils/formatters';
import * as S from './CartDrawer.styles';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function itemLabel(item: CartItem) {
  return [item.tamanho, item.tipo].filter(Boolean).join(' · ');
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, count, total, sessaoVinculada, atualizarItem, removerItem, desvincularSessao, registrarPedido, limpar } = useCart();
  const [finalizado, setFinalizado] = useState(false);
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  const ingressoTotal = sessaoVinculada?.sessao.precoBase ?? 0;
  const temPedido = Boolean(sessaoVinculada) || items.length > 0;
  const taxaServico = temPedido ? 2.5 : 0;
  const totalPedido = ingressoTotal + total + taxaServico;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (finalizado) limpar();
        setFinalizado(false);
        setPedidoId(null);
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [finalizado, limpar, open, onClose]);

  if (!open) return null;

  function handleClose() {
    if (finalizado) limpar();
    setFinalizado(false);
    setPedidoId(null);
    onClose();
  }

  function changeQuantity(item: CartItem, quantity: number) {
    atualizarItem(item, Math.max(0, quantity));
  }

  function finalizarPedido() {
    if (!sessaoVinculada) return;
    const nextPedidoId = Math.floor(100000 + Math.random() * 900000);
    const produtosCount = items.reduce((acc, item) => acc + item.quantidade, 0);
    const extras = items.length > 0
      ? `Bomboniere: ${items.map(item => `${item.quantidade} ${item.nome}`).join(' · ')}`
      : undefined;

    registrarPedido({
      id: String(nextPedidoId),
      title: sessaoVinculada.filmeTitulo,
      cinema: sessaoVinculada.cinemaNome ?? `CINEFESP #${sessaoVinculada.sessao.idCinema}`,
      date: `${formataData(sessaoVinculada.sessao.dataHora)}, ${formataHora(sessaoVinculada.sessao.dataHora)}`,
      room: `${sessaoVinculada.sessao.sala.nome} · ${sessaoVinculada.sessao.formato}`,
      seats: ['A definir'],
      extras,
      status: 'confirmado',
      total: formataPreco(totalPedido),
      totalNote: produtosCount > 0 ? `1 ingresso + ${produtosCount} produto${produtosCount === 1 ? '' : 's'}` : '1 ingresso',
      code: `#PED-2026-${nextPedidoId}`,
    });

    setPedidoId(nextPedidoId);
    setFinalizado(true);
  }

  function novoPedido() {
    limpar();
    setFinalizado(false);
    setPedidoId(null);
    onClose();
  }

  return (
    <S.Backdrop onClick={handleClose}>
      <S.Drawer onClick={(event) => event.stopPropagation()}>
        <S.Header>
          <div>
            <S.Kicker>Seu pedido</S.Kicker>
            <S.Title>{finalizado ? 'Pedido confirmado' : 'Carrinho'}</S.Title>
          </div>
          <S.CloseButton onClick={handleClose} aria-label="Fechar carrinho">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </S.CloseButton>
        </S.Header>

        {finalizado ? (
          <S.Success>
            <S.SuccessIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </S.SuccessIcon>
            <h3>Compra finalizada</h3>
            <p>Pedido #{pedidoId ?? '000000'} registrado. Retire seus produtos na bomboniere antes da sessão.</p>
            <S.SuccessTotal>{formataPreco(totalPedido)}</S.SuccessTotal>
            <S.PrimaryButton onClick={novoPedido}>Concluir</S.PrimaryButton>
          </S.Success>
        ) : (
          <>
            {!temPedido ? (
              <S.Empty>
                <S.EmptyIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </S.EmptyIcon>
                <h3>Seu carrinho está vazio</h3>
                <p>Escolha pipoca, bebidas ou combos na bomboniere para montar seu pedido.</p>
                <S.SecondaryLink as={Link} to="/bomboniere" onClick={onClose}>
                  Ir para bomboniere
                </S.SecondaryLink>
              </S.Empty>
            ) : (
              <>
                <S.SummaryLine>
                  <span>{count} {count === 1 ? 'item' : 'itens'}</span>
                  <button type="button" onClick={limpar}>Limpar carrinho</button>
                </S.SummaryLine>

                <S.ItemsList>
                  {sessaoVinculada && (
                    <S.Item>
                      <S.ItemInfo>
                        <S.ItemBadge>Ingresso</S.ItemBadge>
                        <strong>{sessaoVinculada.filmeTitulo}</strong>
                        <span>
                          {formataData(sessaoVinculada.sessao.dataHora)} · {formataHora(sessaoVinculada.sessao.dataHora)} · {sessaoVinculada.sessao.formato}
                        </span>
                        <small>{sessaoVinculada.sessao.sala.nome} · {sessaoVinculada.sessao.idioma}</small>
                      </S.ItemInfo>

                      <S.ItemActions>
                        <S.ItemTotal>{formataPreco(sessaoVinculada.sessao.precoBase)}</S.ItemTotal>
                        <S.RemoveButton type="button" onClick={desvincularSessao}>
                          remover
                        </S.RemoveButton>
                        <S.ChangeSessionLink as={Link} to="/" onClick={onClose}>
                          trocar sessão
                        </S.ChangeSessionLink>
                      </S.ItemActions>
                    </S.Item>
                  )}

                  {items.map((item) => (
                    <S.Item key={`${item.idProduto}-${item.tamanho ?? 'sem-tamanho'}-${item.tipo ?? 'sem-tipo'}`}>
                      <S.ItemInfo>
                        <strong>{item.nome}</strong>
                        {itemLabel(item) && <span>{itemLabel(item)}</span>}
                        <small>{formataPreco(item.preco)} cada</small>
                      </S.ItemInfo>

                      <S.ItemActions>
                        <S.Quantity>
                          <button type="button" onClick={() => changeQuantity(item, item.quantidade - 1)} aria-label={`Diminuir ${item.nome}`}>
                            -
                          </button>
                          <span>{item.quantidade}</span>
                          <button type="button" onClick={() => changeQuantity(item, item.quantidade + 1)} aria-label={`Aumentar ${item.nome}`}>
                            +
                          </button>
                        </S.Quantity>
                        <S.ItemTotal>{formataPreco(item.preco * item.quantidade)}</S.ItemTotal>
                        <S.RemoveButton type="button" onClick={() => removerItem(item)}>
                          remover
                        </S.RemoveButton>
                      </S.ItemActions>
                    </S.Item>
                  ))}
                </S.ItemsList>

                <S.Totals>
                  <S.TotalRow>
                    <span>Ingresso</span>
                    <strong>{formataPreco(ingressoTotal)}</strong>
                  </S.TotalRow>
                  <S.TotalRow>
                    <span>Produtos</span>
                    <strong>{formataPreco(total)}</strong>
                  </S.TotalRow>
                  <S.TotalRow>
                    <span>Taxa de serviço</span>
                    <strong>{formataPreco(taxaServico)}</strong>
                  </S.TotalRow>
                  <S.GrandTotal>
                    <span>Total</span>
                    <strong>{formataPreco(totalPedido)}</strong>
                  </S.GrandTotal>
                </S.Totals>

                {!sessaoVinculada && (
                  <S.RequiredSession>
                    <div>
                      <strong>Sessão obrigatória</strong>
                      <span>Escolha um filme e uma sessão para vincular antes de finalizar o pedido.</span>
                    </div>
                    <S.RequiredSessionLink as={Link} to="/" onClick={onClose}>
                      Escolher sessão
                    </S.RequiredSessionLink>
                  </S.RequiredSession>
                )}

                <S.Footer>
                  <S.SecondaryLink as={Link} to="/bomboniere" onClick={onClose}>
                    Alterar pedido
                  </S.SecondaryLink>
                  <S.PrimaryButton onClick={finalizarPedido} disabled={!sessaoVinculada}>
                    Finalizar compra
                  </S.PrimaryButton>
                </S.Footer>
              </>
            )}
          </>
        )}
      </S.Drawer>
    </S.Backdrop>
  );
}
