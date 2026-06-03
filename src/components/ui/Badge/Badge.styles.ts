import styled from 'styled-components';

export const Span = styled.span<{ $bg?: string; $color?: string }>`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${({ $bg }) => $bg ?? 'var(--bg-card)'};
  color: ${({ $color }) => $color ?? 'var(--text-muted)'};
`;
