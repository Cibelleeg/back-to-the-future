import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { useCart } from '../../../contexts/useCart';
import { Navbar } from '../../../components/cinema';
import { ORDERS, REVIEWS } from './mockData';
import { DadosPanel } from './panels/DadosPanel';
import { PedidosPanel } from './panels/PedidosPanel';
import { AvaliacoesPanel } from './panels/AvaliacoesPanel';
import { config } from '../../../config';
import { atualizarAvaliacao, excluirAvaliacao, fetchUserOrders, fetchUserReviews } from '../../../services';
import type { UserOrder } from '../../../types/order';
import type { UserReview } from '../../../types/review';
import * as S from './ContaPage.styles';

type Tab = 'dados' | 'pedidos' | 'avaliacoes';

function buildNav(ordersCount: number, reviewsCount: number): { id: Tab; label: string; count?: number; icon: React.ReactNode }[] {
  return [
    {
      id: 'dados',
      label: 'Meus dados',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
    {
      id: 'pedidos',
      label: 'Meus pedidos',
      count: ordersCount,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" />
          <path d="M13 5v14" />
        </svg>
      ),
    },
    {
      id: 'avaliacoes',
      label: 'Minhas avaliações',
      count: reviewsCount,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];
}

function mergeOrders(localOrders: UserOrder[], remoteOrders: UserOrder[]): UserOrder[] {
  const orders = new Map<string, UserOrder>();
  [...localOrders, ...remoteOrders].forEach((order) => {
    if (!orders.has(order.id)) orders.set(order.id, order);
  });
  return [...orders.values()];
}

const reviewDate = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export function ContaPage() {
  const { isLoggedIn, logout } = useAuth();
  const { userOrders } = useCart();
  const [tab, setTab] = useState<Tab>('dados');
  const [remoteOrders, setRemoteOrders] = useState<UserOrder[]>(() => config.useMock ? ORDERS : []);
  const [reviews, setReviews] = useState<UserReview[]>(() => config.useMock ? REVIEWS : []);
  const [ordersLoading, setOrdersLoading] = useState(!config.useMock);
  const [reviewsLoading, setReviewsLoading] = useState(!config.useMock);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || config.useMock) return;

    let active = true;

    fetchUserOrders()
      .then((orders) => {
        if (active) setRemoteOrders(orders);
      })
      .catch(() => {
        if (active) setOrdersError('Não foi possível carregar seus pedidos agora.');
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
      });

    fetchUserReviews()
      .then((items) => {
        if (active) setReviews(items);
      })
      .catch(() => {
        if (active) setReviewsError('Não foi possível carregar suas avaliações agora.');
      })
      .finally(() => {
        if (active) setReviewsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isLoggedIn]);

  const orders = useMemo(() => mergeOrders(userOrders, remoteOrders), [remoteOrders, userOrders]);
  const nav = buildNav(orders.length, reviews.length);

  async function handleUpdateReview(id: string, payload: { nota: number; comentario: string }): Promise<void> {
    if (config.useMock) {
      setReviews((current) => current.map((review) => (
        review.id === id
          ? { ...review, rating: payload.nota, text: payload.comentario, date: reviewDate.format(new Date()) }
          : review
      )));
      return;
    }

    const updated = await atualizarAvaliacao(id, {
      nota: payload.nota,
      comentario: payload.comentario,
    });

    setReviews((current) => current.map((review) => (
      review.id === id
        ? {
            ...review,
            rating: Number(updated.nota),
            text: updated.comentario ?? '',
            date: reviewDate.format(new Date(updated.createdAt)),
          }
        : review
    )));
  }

  async function handleDeleteReview(id: string): Promise<void> {
    if (!config.useMock) {
      await excluirAvaliacao(id);
    }

    setReviews((current) => current.filter((review) => review.id !== id));
  }

  if (!isLoggedIn) return <Navigate to="/login#entrar" replace />;

  return (
    <S.Wrapper>
      <Navbar onMenuOpen={() => {}} />

      <S.Shell>
        <S.Side>
          <S.SideTitle>Minha conta</S.SideTitle>

          {nav.map(item => (
            <S.NavBtn key={item.id} $active={tab === item.id} onClick={() => setTab(item.id)}>
              {item.icon}
              {item.label}
              {item.count != null && <S.NavCount>{item.count}</S.NavCount>}
            </S.NavBtn>
          ))}

          <S.NavLogout onClick={logout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair
          </S.NavLogout>
        </S.Side>

        <main>
          {tab === 'dados'      && <DadosPanel     key="dados"      />}
          {tab === 'pedidos'    && <PedidosPanel    key="pedidos"    orders={orders} isLoading={ordersLoading} error={ordersError} />}
          {tab === 'avaliacoes' && (
            <AvaliacoesPanel
              key="avaliacoes"
              reviews={reviews}
              isLoading={reviewsLoading}
              error={reviewsError}
              showEligible={config.useMock}
              onUpdateReview={handleUpdateReview}
              onDeleteReview={handleDeleteReview}
            />
          )}
        </main>
      </S.Shell>
    </S.Wrapper>
  );
}
