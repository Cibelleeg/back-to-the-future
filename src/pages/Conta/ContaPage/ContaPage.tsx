import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { useCart } from '../../../contexts/useCart';
import { Navbar } from '../../../components/cinema';
import { ORDERS, REVIEWS } from './mockData';
import { DadosPanel } from './panels/DadosPanel';
import { PedidosPanel } from './panels/PedidosPanel';
import { AvaliacoesPanel } from './panels/AvaliacoesPanel';
import * as S from './ContaPage.styles';

type Tab = 'dados' | 'pedidos' | 'avaliacoes';

function buildNav(ordersCount: number): { id: Tab; label: string; count?: number; icon: React.ReactNode }[] {
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
      count: REVIEWS.length,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];
}

export function ContaPage() {
  const { isLoggedIn, logout } = useAuth();
  const { userOrders } = useCart();
  const [tab, setTab] = useState<Tab>('dados');
  const nav = buildNav(ORDERS.length + userOrders.length);

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
          {tab === 'pedidos'    && <PedidosPanel    key="pedidos"    />}
          {tab === 'avaliacoes' && <AvaliacoesPanel key="avaliacoes" />}
        </main>
      </S.Shell>
    </S.Wrapper>
  );
}
