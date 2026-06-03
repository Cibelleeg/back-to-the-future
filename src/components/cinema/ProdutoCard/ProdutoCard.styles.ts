import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

export const Card = styled.article`
  background: var(--bg-secondary);
  border: 0.5px solid var(--border-secondary);
  border-radius: 10px;
  overflow: hidden;
  transition: 0.2s;

  &:hover { border-color: var(--primary-border); }
`;

export const ImageWrapper = styled.div`
  background: var(--bg-card);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const Body = styled.div`
  padding: 12px 14px;
`;

export const Name = styled.h3`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0 0 3px;
  cursor: pointer;
  transition: 0.2s;

  &:hover { color: var(--green); }
`;

export const Description = styled.p`
  font-size: 11px;
  color: var(--text-soft);
  margin: 0 0 10px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Price = styled.span`
  color: var(--green);
  font-weight: 700;
  font-size: 15px;
`;

/* ── Add wrapper ── */

export const AddWrapper = styled.div<{ $on?: boolean }>`
  position: relative;
  height: 40px;
  width: 100%;
`;

export const AddMain = styled.button<{ $on?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 13px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(180deg, var(--green), var(--green-deep));
  box-shadow: 0 6px 18px -7px var(--green-glow);
  transition: opacity .25s ease, transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .25s;

  opacity: ${({ $on }) => ($on ? 0 : 1)};
  transform: ${({ $on }) => ($on ? 'scale(.85)' : 'none')};
  pointer-events: ${({ $on }) => ($on ? 'none' : 'auto')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px -8px var(--green-glow);
  }

  svg {
    width: 18px;
    height: 18px;
    transition: transform .3s;
  }
  &:hover svg { transform: rotate(90deg); }
`;

export const AddStep = styled.div<{ $on?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  background: var(--green-soft);
  border: 1px solid var(--green-border);
  transition: opacity .25s ease, transform .3s cubic-bezier(.2,.8,.2,1);

  opacity: ${({ $on }) => ($on ? 1 : 0)};
  transform: ${({ $on }) => ($on ? 'scale(1)' : 'scale(.85)')};
  pointer-events: ${({ $on }) => ($on ? 'auto' : 'none')};
`;

export const StepBtn = styled.button`
  width: 38px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--green);
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s, transform .1s;

  &:hover  { background: var(--green-soft); }
  &:active { transform: scale(.88); }
`;

export const QtyCount = styled.span<{ $pop?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 26px;
  text-align: center;
  animation: ${({ $pop }) => ($pop ? pop : 'none')} .15s ease;
`;
