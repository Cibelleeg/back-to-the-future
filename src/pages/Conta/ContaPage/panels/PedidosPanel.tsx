import { ORDERS, type OrderStatus } from '../mockData';
import { useCart } from '../../../../contexts/useCart';
import * as S from '../ContaPage.styles';

const FILM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M7 2v20M17 2v20M2 7h5M2 12h20M2 17h5M17 7h5M17 17h5" />
  </svg>
);

const STATUS_LABEL: Record<OrderStatus, string> = {
  confirmado: 'Confirmado',
  utilizado: 'Utilizado',
  cancelado: 'Cancelado',
};

export function PedidosPanel() {
  const { userOrders } = useCart();
  const orders = [...userOrders, ...ORDERS];

  return (
    <S.PanelWrap>
      <S.PanelHead>
        <h1>Meus pedidos</h1>
        <p>Histórico de ingressos e itens da bomboniere. Apresente o código na entrada da sala.</p>
      </S.PanelHead>

      {orders.map(order => (
        <S.OrderCard key={order.id}>
          <S.OrderPoster>{FILM_ICON}</S.OrderPoster>

          <S.OrderMain>
            <h3>{order.title}</h3>
            <S.OrderMeta>
              <S.OrderMetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg>
                {order.cinema}
              </S.OrderMetaItem>
              <S.OrderMetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                {order.date}
              </S.OrderMetaItem>
              <S.OrderMetaItem>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12h20M2 12a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3M6 18v-6M18 18v-6" /></svg>
                {order.room}
              </S.OrderMetaItem>
            </S.OrderMeta>
            <S.Seats>
              <S.SeatLabel>Assentos</S.SeatLabel>
              {order.seats.map(s => <S.SeatChip key={s}>{s}</S.SeatChip>)}
            </S.Seats>
            {order.extras && (
              <S.OrderExtras>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16l-1.5 13a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 7zM9 7V5a3 3 0 0 1 6 0v2" /></svg>
                {order.extras}
              </S.OrderExtras>
            )}
          </S.OrderMain>

          <S.OrderStub>
            <S.Badge $s={order.status}>{STATUS_LABEL[order.status]}</S.Badge>
            <S.OrderTotal>
              <small>Total · {order.totalNote}</small>
              <S.OrderTotalValue>{order.total}</S.OrderTotalValue>
            </S.OrderTotal>
            <S.OrderCode>{order.code}</S.OrderCode>
          </S.OrderStub>
        </S.OrderCard>
      ))}
    </S.PanelWrap>
  );
}
