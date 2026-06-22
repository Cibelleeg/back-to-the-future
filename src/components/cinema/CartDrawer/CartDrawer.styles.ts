import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.78);
`;

export const Drawer = styled.aside`
  width: min(440px, 100vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  overflow-y: auto;
  background:
    radial-gradient(90% 45% at 50% 0%, rgba(31,158,87,0.16), transparent 60%),
    var(--bg-secondary);
  border-left: 1px solid var(--border-glass);
  box-shadow: -30px 0 70px rgba(0,0,0,0.45);
  animation: ${slideIn} .24s cubic-bezier(.2,.8,.2,1);

  @media (max-width: 520px) {
    padding: 20px 16px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const Kicker = styled.span`
  display: block;
  margin-bottom: 4px;
  color: var(--primary);
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 28px;
  line-height: 1;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text-primary);
  display: grid;
  place-items: center;

  svg { width: 18px; height: 18px; }
  &:hover { background: var(--surface-hover); }
`;

export const SessionBox = styled.div`
  padding: 14px 16px;
  border: 1px solid rgba(31,158,87,0.32);
  border-radius: 14px;
  background: rgba(31,158,87,0.08);

  span,
  small {
    display: block;
    color: var(--text-muted);
    font-size: 12px;
  }

  strong {
    display: block;
    margin: 3px 0;
    color: var(--text-primary);
    font-size: 15px;
  }
`;

export const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 13px;

  button {
    border: none;
    background: transparent;
    color: var(--primary);
    font: inherit;
    font-weight: 600;
  }
`;

export const ItemsList = styled.div`
  display: grid;
  gap: 12px;
`;

export const Item = styled.article`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 14px;
  border: 1px solid var(--border-glass);
  border-radius: 14px;
  background: rgba(255,255,255,0.04);

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemInfo = styled.div`
  min-width: 0;

  strong,
  span,
  small {
    display: block;
  }

  strong {
    color: var(--text-primary);
    font-size: 15px;
    line-height: 1.25;
  }

  span {
    margin-top: 3px;
    color: var(--primary);
    font-size: 12px;
  }

  small {
    margin-top: 7px;
    color: var(--text-muted);
  }
`;

export const ItemBadge = styled.em`
  display: inline-flex;
  width: fit-content;
  margin-bottom: 7px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--primary-transparent);
  color: var(--primary-hover);
  font-style: normal;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 420px) {
    align-items: stretch;
  }
`;

export const Quantity = styled.div`
  display: inline-grid;
  grid-template-columns: 34px 38px 34px;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--primary-border);
  border-radius: 10px;
  background: var(--primary-transparent);

  button {
    height: 34px;
    border: none;
    background: transparent;
    color: var(--primary);
    font-size: 18px;
    font-weight: 800;
  }

  span {
    color: var(--text-primary);
    text-align: center;
    font-weight: 700;
  }
`;

export const ItemTotal = styled.strong`
  color: var(--text-primary);
  font-family: 'Space Mono', monospace;
  font-size: 13px;
`;

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 12px;
  text-decoration: underline;

  &:hover { color: var(--text-primary); }
`;

export const ChangeSessionLink = styled.a`
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;

  &:hover {
    color: var(--primary-hover);
    text-decoration: underline;
  }
`;

export const Totals = styled.div`
  display: grid;
  gap: 9px;
  padding: 16px;
  border: 1px solid var(--border-glass);
  border-radius: 14px;
  background: rgba(255,255,255,0.035);
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--text-muted);
  font-size: 13px;
`;

export const GrandTotal = styled(TotalRow)`
  padding-top: 11px;
  border-top: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-size: 16px;

  strong {
    color: var(--primary-hover);
    font-family: 'Space Mono', monospace;
  }
`;

export const RequiredSession = styled.div`
  display: grid;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(245, 200, 66, 0.26);
  border-radius: 12px;
  background: rgba(245, 200, 66, 0.08);

  strong,
  span {
    display: block;
  }

  strong {
    color: var(--text-primary);
    font-size: 13px;
    margin-bottom: 3px;
  }

  span {
    color: rgba(255,255,255,0.72);
    font-size: 12px;
    line-height: 1.45;
  }
`;

export const RequiredSessionLink = styled.a`
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(245, 200, 66, 0.38);
  background: rgba(245, 200, 66, 0.10);
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;

  &:hover {
    border-color: rgba(245, 200, 66, 0.58);
    background: rgba(245, 200, 66, 0.16);
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const PrimaryButton = styled.button`
  min-height: 44px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(180deg, var(--primary), var(--primary-deep));
  color: #04130b;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 10px 24px -10px var(--primary-shadow);

  &:hover {
    box-shadow: 0 14px 30px -10px var(--primary-shadow-hover);
    transform: translateY(-1px);
  }

  &:disabled {
    background: var(--bg-disabled);
    color: var(--text-disabled);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryLink = styled.a`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 700;

  &:hover { background: var(--surface-hover); }
`;

export const Empty = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 12px;
  min-height: 420px;
  text-align: center;

  h3 {
    margin: 8px 0 0;
    color: var(--text-primary);
    font-size: 18px;
  }

  p {
    max-width: 30ch;
    margin: 0 0 8px;
    color: var(--text-muted);
    line-height: 1.5;
  }
`;

export const EmptyIcon = styled.div`
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: var(--surface);
  color: var(--primary);

  svg { width: 32px; height: 32px; }
`;

export const Success = styled(Empty)`
  min-height: 520px;
`;

export const SuccessIcon = styled(EmptyIcon)`
  background: var(--primary-transparent);
  border: 1px solid var(--primary-border);
`;

export const SuccessTotal = styled.strong`
  color: var(--primary-hover);
  font-family: 'Space Mono', monospace;
  font-size: 22px;
`;
