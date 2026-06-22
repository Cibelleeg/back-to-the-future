import styled from 'styled-components';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--rating);
`;

export const Star = styled.svg<{ $filled: boolean; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: var(--rating);
  fill: ${({ $filled }) => ($filled ? 'currentColor' : 'none')};
  stroke: ${({ $filled }) => ($filled ? 'none' : 'rgba(255, 255, 255, 0.24)')};
  stroke-width: ${({ $filled }) => ($filled ? 0 : 1.6)};
  flex-shrink: 0;
`;

export const Score = styled.span`
  color: var(--text-score);
  margin-left: 3px;
  font-size: 11px;
`;
