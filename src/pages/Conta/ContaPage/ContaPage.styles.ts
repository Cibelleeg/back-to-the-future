import styled, { css, keyframes } from 'styled-components';

const rise = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
`;

// ── Layout ──────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  min-height: 100vh;
  padding-top: 72px;
  background:
    radial-gradient(1200px 600px at 85% -10%, rgba(33, 90, 54, 0.35), transparent 60%),
    radial-gradient(900px 500px at -10% 110%, rgba(31, 158, 87, 0.10), transparent 55%),
    var(--bg-primary);
`;

export const Shell = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(20px, 4vw, 40px) clamp(18px, 4vw, 44px) 80px;
  display: grid;
  grid-template-columns: 248px 1fr;
  gap: clamp(20px, 3vw, 38px);
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

export const Side = styled.nav`
  position: sticky;
  top: 92px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (max-width: 860px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 6px;
    gap: 8px;
    &::-webkit-scrollbar { display: none; }
  }
`;

export const SideTitle = styled.div`
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 4px 14px 10px;
  font-weight: 600;
  @media (max-width: 860px) { display: none; }
`;

export const NavBtn = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: transparent;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  font-size: 14.5px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  svg { width: 19px; height: 19px; flex-shrink: 0; }

  ${({ $active }) =>
    $active &&
    css`
      background: rgba(31, 158, 87, 0.14);
      border-color: rgba(31, 158, 87, 0.4);
      svg { color: #2fc46e; }
    `}

  &:hover:not(:disabled) {
    background: var(--surface);
    color: var(--text-primary);
  }

  @media (max-width: 860px) {
    width: auto;
    white-space: nowrap;
  }
`;

export const NavCount = styled.span`
  margin-left: auto;
  font-size: 12px;
  font-family: 'Space Mono', monospace;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.07);
  padding: 1px 8px;
  border-radius: 20px;
  @media (max-width: 860px) { display: none; }
`;

export const NavLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: transparent;
  color: var(--text-muted);
  font-size: 14.5px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  margin-top: 14px;
  transition: background 0.18s, color 0.18s;
  svg { width: 19px; height: 19px; flex-shrink: 0; }
  &:hover { color: #d9544f; background: rgba(217, 84, 79, 0.08); }
  @media (max-width: 860px) { display: none; }
`;

export const PanelWrap = styled.section`
  animation: ${rise} 0.34s ease both;
`;

export const PanelHead = styled.div`
  margin-bottom: 22px;
  h1 {
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: clamp(26px, 4vw, 32px);
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }
  p { color: var(--text-muted); font-size: 14.5px; margin-top: 4px; }
`;

// ── Card base ────────────────────────────────────────────────────────────────

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  border-radius: 14px;
  box-shadow: 0 18px 50px -24px rgba(0, 0, 0, 0.85);
`;

// ── Meus dados ───────────────────────────────────────────────────────────────

export const ProgressCard = styled(Card)`
  padding: 20px 22px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(120deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06));
  border-color: rgba(31, 158, 87, 0.28);
`;

export const ProgressRing = styled.div<{ $pct: number }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: conic-gradient(
    #2fc46e calc(${p => p.$pct} * 1%),
    rgba(255, 255, 255, 0.12) 0
  );
`;

export const ProgressInner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-secondary, #12121a);
  display: grid;
  place-items: center;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  color: var(--text-primary);
`;

export const ProgressText = styled.div`
  flex: 1;
  strong {
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-size: 16px;
    display: block;
    color: var(--text-primary);
  }
  p { color: var(--text-muted); font-size: 13.5px; margin-top: 4px; }
  .warn { color: #e0a838; font-weight: 600; }
`;

export const FormCard = styled(Card)`
  padding: 24px 22px;
  margin-bottom: 18px;
`;

export const FormSectionTitle = styled.h2`
  font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--text-primary);
`;

export const FormSub = styled.p`
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 18px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const Field = styled.div<{ $span2?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 7px;
  ${({ $span2 }) => $span2 && 'grid-column: 1 / -1;'}
`;

export const FieldLabel = styled.label`
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TagMissing = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e0a838;
  background: rgba(224, 168, 56, 0.12);
  border: 1px solid rgba(224, 168, 56, 0.3);
  padding: 1px 7px;
  border-radius: 20px;
`;

export const TagOk = styled.span`
  font-size: 10px;
  color: #2fc46e;
  display: inline-flex;
  align-items: center;
  gap: 3px;
`;

export const Input = styled.input<{ $empty?: boolean; $readonly?: boolean }>`
  width: 100%;
  padding: 11px 13px;
  font-size: 14.5px;
  font-family: inherit;
  color: ${({ $readonly }) => ($readonly ? 'var(--text-muted)' : 'var(--text-primary)')};
  background: ${({ $empty }) => ($empty ? 'rgba(224, 168, 56, 0.04)' : 'var(--bg-secondary, #12121a)')};
  border: 1px solid ${({ $empty }) => ($empty ? 'rgba(224, 168, 56, 0.45)' : 'var(--border-glass)')};
  border-radius: 10px;
  cursor: ${({ $readonly }) => ($readonly ? 'default' : 'text')};
  transition: border-color 0.16s, background 0.16s;
  &::placeholder { color: rgba(255, 255, 255, 0.22); }
  &:focus:not([readonly]) {
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.03);
    outline: none;
  }
`;

export const Help = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 6px;
`;

export const BtnGhost = styled.button`
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid var(--border-glass);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.16s;
  &:hover { background: var(--surface); }
  &:active { transform: translateY(1px); }
`;

export const BtnPrimary = styled.button`
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid transparent;
  background: var(--primary);
  color: #04130b;
  cursor: pointer;
  transition: filter 0.16s;
  &:hover { filter: brightness(1.1); }
  &:active { transform: translateY(1px); }
`;

// ── Meus pedidos ─────────────────────────────────────────────────────────────

export const OrderCard = styled(Card)`
  display: grid;
  grid-template-columns: 92px 1fr 196px;
  margin-bottom: 18px;
  overflow: hidden;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const OrderPoster = styled.div`
  background: linear-gradient(160deg, var(--primary-deep, #215a36), #0c1d13);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.35);
  svg { width: 30px; height: 30px; }
  @media (max-width: 620px) { display: none; }
`;

export const OrderMain = styled.div`
  padding: 18px 20px;
  h3 {
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text-primary);
  }
`;

export const OrderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 12px;
`;

export const OrderMetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  svg { width: 14px; height: 14px; color: rgba(255, 255, 255, 0.28); }
`;

export const Seats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

export const SeatLabel = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  margin-right: 2px;
`;

export const SeatChip = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 7px;
  background: rgba(31, 158, 87, 0.14);
  border: 1px solid rgba(31, 158, 87, 0.32);
  color: #2fc46e;
`;

export const OrderExtras = styled.div`
  margin-top: 12px;
  font-size: 12.5px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 7px;
  svg { width: 14px; height: 14px; color: rgba(255, 255, 255, 0.28); }
`;

export const OrderStub = styled.div`
  position: relative;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  border-left: 2px dashed var(--border-glass);

  &::before, &::after {
    content: '';
    position: absolute;
    left: -9px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--bg-primary, #0a0a0f);
  }
  &::before { top: -8px; }
  &::after  { bottom: -8px; }

  @media (max-width: 620px) {
    border-left: none;
    border-top: 2px dashed var(--border-glass);
    text-align: left;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    &::before { left: -8px; top: auto; bottom: -8px; }
    &::after  { left: auto; right: -8px; top: -8px; bottom: auto; }
  }
`;

export const Badge = styled.span<{ $s: 'confirmado' | 'utilizado' | 'cancelado' }>`
  align-self: flex-end;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;

  ${({ $s }) =>
    $s === 'confirmado' &&
    css`
      color: #2fc46e;
      background: rgba(47, 196, 110, 0.12);
      border: 1px solid rgba(47, 196, 110, 0.3);
    `}
  ${({ $s }) =>
    $s === 'utilizado' &&
    css`
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
    `}
  ${({ $s }) =>
    $s === 'cancelado' &&
    css`
      color: #d9544f;
      background: rgba(217, 84, 79, 0.1);
      border: 1px solid rgba(217, 84, 79, 0.3);
    `}
`;

export const OrderTotal = styled.div`
  small { display: block; color: var(--text-muted); font-size: 11px; }
`;

export const OrderTotalValue = styled.span`
  font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
`;

export const OrderCode = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 8px;
`;

// ── Minhas avaliações ────────────────────────────────────────────────────────

export const ReviewCard = styled(Card)`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 16px;
  padding: 18px 20px;
  margin-bottom: 16px;
  align-items: start;
  @media (max-width: 620px) {
    grid-template-columns: 52px 1fr;
  }
`;

export const ReviewPoster = styled.div`
  width: 64px;
  height: 92px;
  border-radius: 9px;
  background: linear-gradient(160deg, var(--primary-deep, #215a36), #0c1d13);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.35);
  svg { width: 22px; height: 22px; }
  @media (max-width: 620px) { width: 52px; height: 76px; }
`;

export const ReviewBody = styled.div`
  h3 {
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-size: 16.5px;
    font-weight: 700;
    margin-bottom: 5px;
    color: var(--text-primary);
  }
  p { font-size: 14px; color: rgba(232, 230, 224, 0.8); line-height: 1.55; }
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 9px;
`;

export const ReviewDate = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;

export const ReviewActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 620px) {
    grid-column: 1 / -1;
    flex-direction: row;
  }
`;

export const IconBtn = styled.button<{ $danger?: boolean }>`
  width: 34px; height: 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: transparent;
  border: 1px solid var(--border-glass);
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  svg { width: 16px; height: 16px; }
  &:hover {
    background: var(--surface);
    color: ${({ $danger }) => ($danger ? '#d9544f' : 'var(--text-primary)')};
    ${({ $danger }) => $danger && 'border-color: rgba(217, 84, 79, 0.4);'}
  }
`;

export const EligibleBlock = styled.div`
  margin-top: 30px;
  h2 {
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--text-primary);
  }
  .sub { color: var(--text-muted); font-size: 13px; margin-bottom: 16px; }
`;

export const EligibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
`;

export const EligibleCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 14px;
`;

export const MiniPoster = styled.div`
  width: 44px; height: 62px;
  border-radius: 7px;
  background: linear-gradient(160deg, var(--primary-deep, #215a36), #0c1d13);
  flex-shrink: 0;
`;

export const EligibleInfo = styled.div`
  flex: 1;
  min-width: 0;
  strong {
    font-size: 14px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-primary);
  }
  small { font-size: 11.5px; color: var(--text-muted); font-family: 'Space Mono', monospace; }
`;

export const BtnMini = styled.button`
  padding: 7px 14px;
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 8px;
  background: rgba(31, 158, 87, 0.14);
  border: 1px solid rgba(31, 158, 87, 0.34);
  color: #2fc46e;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(31, 158, 87, 0.22); }
`;
