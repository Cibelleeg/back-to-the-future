import styled from 'styled-components';

export const Button = styled.button<{ $selected?: boolean }>`
  font-family: inherit;
  background: ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--bg-card)')};
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--border-primary)')};
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 90px;
  cursor: pointer;
  transition: 0.15s;
`;

export const Time = styled.span`
  font-family: "Bebas Neue", cursive;
  font-size: 18px;
  color: var(--text-primary);
`;

export const Badges = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

export const PriceLabel = styled.span<{ $selected?: boolean }>`
  font-size: 11px;
  color: ${({ $selected }) => ($selected ? 'var(--text-secondary-dim)' : 'var(--text-score)')};
`;
