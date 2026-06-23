import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { CartItem } from '../../../types/cinema';
import { useCart } from '../../../contexts/useCart';
import { useAuth, useUserInfo } from '../../../hooks';
import { fetchMe, finalizarCompra, setUserInfo } from '../../../services/api';
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
  const { items, count, sessaoVinculada, atualizarItem, removerItem, desvincularSessao, registrarPedido, limpar } = useCart();
  const { isLoggedIn } = useAuth();
  const userInfo = useUserInfo();
  const [finalizado, setFinalizado] = useState(false);
  const [pedidoId, setPedidoId] = useState<string | null>(null);
  const [salvandoPedido, setSalvandoPedido] = useState(false);
  const [erroPedido, setErroPedido] = useState<string | null>(null);

  const ingressoTotal = sessaoVinculada?.precoIngresso ?? 0;
  const ingressoCount = sessaoVinculada?.assentos.length ?? 0;
  const produtosTotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const temPedido = Boolean(sessaoVinculada) || items.length > 0;
  const taxaServico = temPedido ? 2.5 : 0;
  const totalPedido = ingressoTotal + produtosTotal + taxaServico;

  // Busca dados frescos do backend ao abrir o carrinho
  useEffect(() => {
    if (!open || !isLoggedIn) return;
    fetchMe().then(setUserInfo).catch(() => {});
  }, [open, isLoggedIn]);

  // Campos obrigatórios para compra de ingresso
  const camposFaltando: string[] = [];
  if (isLoggedIn) {
    if (!userInfo?.name)        camposFaltando.push('Nome completo');
    if (!userInfo?.cpf)         camposFaltando.push('CPF');
    if (!userInfo?.phoneNumber) camposFaltando.push('Telefone');
    if (!userInfo?.birthDate)   camposFaltando.push('Data de nascimento');
  }
  const perfilCompleto = isLoggedIn && camposFaltando.length === 0;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (finalizado) limpar();
        setFinalizado(false);
        setPedidoId(null);
        setErroPedido(null);
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
    setErroPedido(null);
    onClose();
  }

  function changeQuantity(item: CartItem, quantity: number) {
    atualizarItem(item, Math.max(0, quantity));
  }

  async function finalizarPedido() {
    if (!sessaoVinculada || !isLoggedIn || !perfilCompleto || salvandoPedido) return;
    setErroPedido(null);
    setSalvandoPedido(true);

    const produtosCount = items.reduce((acc, item) => acc + item.quantidade, 0);
    const extras = items.length > 0
      ? `Bomboniere: ${items.map(item => `${item.quantidade} ${item.nome}`).join(' · ')}`
      : undefined;

    try {
      const savedOrder = await finalizarCompra({
        sessao: sessaoVinculada.sessao,
        assentoIds: sessaoVinculada.assentos.map(assento => assento.idAssento),
        tipo: sessaoVinculada.tipoIngresso,
        items,
      });
      const fallbackPedidoId = String(Math.floor(100000 + Math.random() * 900000));
      const nextPedidoId = String(savedOrder.id ?? fallbackPedidoId);
      const code = savedOrder.code ?? `#PED-2026-${nextPedidoId}`;

      registrarPedido({
        id: String(nextPedidoId),
        title: sessaoVinculada.filmeTitulo,
        cinema: sessaoVinculada.cinemaNome ?? `CINEFESP #${sessaoVinculada.sessao.idCinema}`,
        date: `${formataData(sessaoVinculada.sessao.dataHora)}, ${formataHora(sessaoVinculada.sessao.dataHora)}`,
        room: `${sessaoVinculada.sessao.sala.nome} · ${sessaoVinculada.sessao.formato}`,
        seats: sessaoVinculada.assentos.map(assento => `${assento.fila}${assento.numero}`),
        extras,
        status: 'confirmado',
        total: formataPreco(totalPedido),
        totalNote: produtosCount > 0 ? `${ingressoCount} ingresso${ingressoCount === 1 ? '' : 's'} + ${produtosCount} produto${produtosCount === 1 ? '' : 's'}` : `${ingressoCount} ingresso${ingressoCount === 1 ? '' : 's'}`,
        code,
      });

      setPedidoId(nextPedidoId);
      setFinalizado(true);
    } catch (error) {
      setErroPedido(error instanceof Error ? error.message : 'Não foi possível salvar o pedido no banco. Tente novamente em instantes.');
    } finally {
      setSalvandoPedido(false);
    }
  }

  function novoPedido() {
    limpar();
    setFinalizado(false);
    setPedidoId(null);
    setErroPedido(null);
    onClose();
  }

  const temProdutos = items.length > 0;

  const drawer = (
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
            <p>
              Pedido {pedidoId ?? '#PED-2026-000000'} registrado.{' '}
              {temProdutos
                ? 'Apresente o código na entrada e retire seus produtos na bomboniere antes da sessão.'
                : 'Apresente o código na entrada da sessão.'}
            </p>
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
                <p>Escolha uma sessão para reservar seu ingresso ou adicione itens da bomboniere.</p>
                <S.EmptyActions>
                  <S.SecondaryLink as={Link} to="/" onClick={onClose}>
                    Escolher sessão
                  </S.SecondaryLink>
                  <S.SecondaryLink as={Link} to="/bomboniere" onClick={onClose}>
                    Bomboniere
                  </S.SecondaryLink>
                </S.EmptyActions>
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
                        <small>
                          {sessaoVinculada.sessao.sala.nome} · {sessaoVinculada.sessao.idioma} · Assentos {sessaoVinculada.assentos.map(assento => `${assento.fila}${assento.numero}`).join(', ')} · {sessaoVinculada.tipoIngresso === 'MEIA' ? 'Meia' : 'Inteira'}
                        </small>
                      </S.ItemInfo>

                      <S.ItemActions>
                        <S.ItemTotal>{formataPreco(sessaoVinculada.precoIngresso)}</S.ItemTotal>
                        <S.RemoveButton type="button" onClick={desvincularSessao}>
                          remover
                        </S.RemoveButton>
                        <S.ChangeSessionLink as={Link} to="/" onClick={handleClose}>
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
                  {sessaoVinculada && (
                    <S.TotalRow>
                      <span>Ingresso</span>
                      <strong>{formataPreco(ingressoTotal)}</strong>
                    </S.TotalRow>
                  )}
                  {temProdutos && (
                    <S.TotalRow>
                      <span>Produtos</span>
                      <strong>{formataPreco(produtosTotal)}</strong>
                    </S.TotalRow>
                  )}
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

                {!isLoggedIn && (
                  <S.RequiredLogin>
                    <div>
                      <strong>Login obrigatório</strong>
                      <span>Entre na sua conta para finalizar a compra e salvar o pedido no histórico.</span>
                    </div>
                    <S.RequiredSessionLink as={Link} to="/login#entrar" onClick={onClose}>
                      Entrar na conta
                    </S.RequiredSessionLink>
                  </S.RequiredLogin>
                )}

                {isLoggedIn && !perfilCompleto && (
                  <S.RequiredProfile>
                    <div>
                      <strong>Cadastro incompleto</strong>
                      <span>Para comprar ingressos, preencha: {camposFaltando.join(', ')}.</span>
                    </div>
                    <S.RequiredSessionLink as={Link} to="/conta" onClick={onClose} $profile>
                      Completar cadastro
                    </S.RequiredSessionLink>
                  </S.RequiredProfile>
                )}

                {erroPedido && (
                  <S.ErrorMessage>{erroPedido}</S.ErrorMessage>
                )}

                <S.Footer>
                  <S.SecondaryLink as={Link} to="/bomboniere" onClick={onClose}>
                    Explorar bomboniere
                  </S.SecondaryLink>
                  <S.PrimaryButton
                    onClick={finalizarPedido}
                    disabled={!sessaoVinculada || !isLoggedIn || !perfilCompleto || salvandoPedido}
                  >
                    {salvandoPedido ? 'Salvando pedido...' : 'Finalizar compra'}
                  </S.PrimaryButton>
                </S.Footer>
              </>
            )}
          </>
        )}
      </S.Drawer>
    </S.Backdrop>
  );

  return createPortal(drawer, document.body);
}
