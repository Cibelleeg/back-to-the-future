import styled from 'styled-components';

export const Modal = styled.section`
  background: var(--bg-secondary);
  border-radius: 16px;
  max-width: 740px;
  width: 100%;
  border: 0.5px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  max-height: 92vh;
  overflow-y: auto;
`;

/* ── Cabeçalho do filme ───────────────────────────── */

export const Header = styled.div`
  display: flex;
  position: relative;
`;

export const Poster = styled.img`
  width: 180px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 16px 0 0 0;
`;

export const Info = styled.div`
  padding: 24px 24px 24px 20px;
  flex: 1;
  min-width: 0;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: var(--btn-overlay);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover { background: var(--surface-hover); }
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-family: "Bebas Neue", cursive;
  font-size: 26px;
  color: var(--text-primary);
  margin: 0 0 6px;
  line-height: 1.1;
  padding-right: 32px;
`;

export const Synopsis = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 10px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ── Seções com etapas ───────────────────────────── */

export const Section = styled.div`
  padding: 18px 24px;
  border-top: 0.5px solid var(--border-secondary);
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Bebas Neue", cursive;
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--text-soft);
  margin: 0 0 14px;
`;

export const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  ${SectionTitle} {
    margin-bottom: 0;
  }
`;

export const StepNum = styled.span<{ $done?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ $done }) => $done ? 'var(--primary)' : 'var(--surface)'};
  color: ${({ $done }) => $done ? '#04130b' : 'var(--text-muted)'};
  border: 1px solid ${({ $done }) => $done ? 'var(--primary)' : 'var(--border-glass)'};
  font-size: 10px;
  font-weight: 800;
  font-family: 'Space Mono', monospace;
  flex-shrink: 0;
  transition: background 0.2s, color 0.2s;
`;

export const AssentoTag = styled.span`
  padding: 3px 10px;
  border-radius: 8px;
  background: var(--primary-transparent);
  color: var(--primary-hover);
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid var(--primary-border);
`;

/* ── Grid de sessões ─────────────────────────────── */

export const SessionsGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

/* ── Tipo de ingresso ─────────────────────────────── */

export const TicketTypes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const TicketTypeButton = styled.button<{ $selected?: boolean }>`
  font-family: inherit;
  border: 1px solid ${({ $selected }) => $selected ? 'var(--primary)' : 'var(--border-primary)'};
  background: ${({ $selected }) => $selected ? 'rgba(31,158,87,0.10)' : 'var(--bg-card)'};
  color: var(--text-primary);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &:hover { border-color: var(--primary); }
`;

export const TicketTypeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 14px;
    font-weight: 700;
  }

  small {
    font-size: 11px;
    color: var(--text-muted);
  }
`;

export const TicketTypePrice = styled.span<{ $selected?: boolean }>`
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $selected }) => $selected ? 'var(--primary-hover)' : 'var(--text-muted)'};
`;

/* ── Mapa de assentos ────────────────────────────── */

export const SeatMap = styled.div`
  overflow-x: auto;
  padding-bottom: 4px;
`;

export const Screen = styled.div`
  position: relative;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--text-muted) 30%, var(--text-muted) 70%, transparent 100%);
  margin: 0 32px 20px;
  opacity: 0.45;

  &::after {
    content: 'TELA';
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    letter-spacing: 0.22em;
    color: var(--text-muted);
    font-family: 'Space Mono', monospace;
    opacity: 0.75;
  }
`;

export const SeatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

export const RowLabel = styled.span`
  width: 14px;
  font-size: 10px;
  font-weight: 700;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
  text-align: center;
  flex-shrink: 0;
`;

export const SeatRowSeats = styled.div`
  display: flex;
  gap: 5px;
`;

export const SeatButton = styled.button<{ $selected?: boolean; $ocupado?: boolean }>`
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  border: 1px solid ${({ $selected, $ocupado }) => {
    if ($ocupado) return 'rgba(217, 84, 79, 0.35)';
    return $selected ? 'var(--primary)' : 'var(--border-primary)';
  }};
  background: ${({ $selected, $ocupado }) => {
    if ($ocupado) return 'rgba(217, 84, 79, 0.12)';
    return $selected ? 'var(--primary)' : 'var(--bg-card)';
  }};
  color: ${({ $selected, $ocupado }) => {
    if ($ocupado) return 'rgba(255,255,255,0.28)';
    return $selected ? '#04130b' : 'var(--text-muted)';
  }};
  border-radius: 6px;
  width: 30px;
  height: 30px;
  cursor: ${({ $ocupado }) => $ocupado ? 'not-allowed' : 'pointer'};
  transition: border-color 0.12s, background 0.12s, color 0.12s;

  &:hover {
    border-color: ${({ $ocupado }) => $ocupado ? 'rgba(217, 84, 79, 0.35)' : 'var(--primary)'};
    background: ${({ $selected, $ocupado }) => {
      if ($ocupado) return 'rgba(217, 84, 79, 0.12)';
      return $selected ? 'var(--primary)' : 'var(--primary-transparent)';
    }};
    color: ${({ $selected, $ocupado }) => {
      if ($ocupado) return 'rgba(255,255,255,0.28)';
      return $selected ? '#04130b' : 'var(--primary-hover)';
    }};
  }
`;

export const SeatLegend = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 14px;
`;

export const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted);
`;

export const LegendDot = styled.span<{ $selected?: boolean; $ocupado?: boolean }>`
  width: 13px;
  height: 13px;
  border-radius: 4px;
  border: 1px solid ${({ $selected, $ocupado }) => {
    if ($ocupado) return 'rgba(217, 84, 79, 0.35)';
    return $selected ? 'var(--primary)' : 'var(--border-primary)';
  }};
  background: ${({ $selected, $ocupado }) => {
    if ($ocupado) return 'rgba(217, 84, 79, 0.12)';
    return $selected ? 'var(--primary)' : 'var(--bg-card)';
  }};
`;

export const SeatsStatus = styled.p`
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 13px;
`;

/* ── Footer ──────────────────────────────────────── */

export const Footer = styled.footer`
  padding: 16px 24px;
  border-top: 0.5px solid var(--border-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  background: var(--bg-secondary);
`;
