import styled from 'styled-components';

export const Wrapper = styled.div<{ $variant?: 'navbar' | 'menu' }>`
  position: relative;
  width: ${({ $variant }) => ($variant === 'menu' ? '100%' : 'auto')};
`;

export const Trigger = styled.button<{ $variant?: 'navbar' | 'menu' }>`
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: ${({ $variant }) => ($variant === 'menu' ? 'space-between' : 'flex-start')};
  gap: 9px;
  width: ${({ $variant }) => ($variant === 'menu' ? '100%' : 'auto')};
  background: var(--surface);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  padding: 11px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background .22s, border-color .22s;

  &:hover {
    background: var(--surface-hover);
    border-color: var(--border-glass-hover);
  }

  .pin { width: 16px; height: 16px; color: var(--primary); }

  .chev {
    width: 14px; height: 14px;
    color: var(--text-muted);
    transition: transform .25s;
  }

  &:hover .chev { transform: translateY(2px); }

  @media (max-width: 1080px) {
    display: ${({ $variant }) => ($variant === 'menu' ? 'flex' : 'none')};
  }
`;

export const Dropdown = styled.div<{ $variant?: 'navbar' | 'menu' }>`
  position: ${({ $variant }) => ($variant === 'menu' ? 'static' : 'absolute')};
  top: ${({ $variant }) => ($variant === 'menu' ? 'auto' : 'calc(100% + 8px)')};
  left: 0;
  margin-top: ${({ $variant }) => ($variant === 'menu' ? '8px' : '0')};
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  padding: 6px;
  min-width: 220px;
  width: ${({ $variant }) => ($variant === 'menu' ? '100%' : 'auto')};
  z-index: 100;
  box-shadow: 0 8px 32px var(--shadow-dropdown);
`;

export const Option = styled.button<{ $active?: boolean }>`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: ${({ $active }) => ($active ? 'var(--primary-transparent)' : 'transparent')};
  border: none;
  color: ${({ $active }) => ($active ? 'var(--primary)' : 'var(--text-secondary)')};
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: .15s;

  &:hover { background: var(--primary-transparent); color: var(--text-primary); }

  small { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
`;
