import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: var(--overlay-modal);
  z-index: 60;
  display: flex;
  justify-content: flex-end;
`;

export const Drawer = styled.nav`
  width: min(320px, 90vw);
  height: 100%;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-glass);
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  gap: 8px;
  animation: ${slideIn} .25s cubic-bezier(.2,.8,.2,1);
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Logo = styled.span`
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  b { color: var(--primary); }
`;

export const CloseBtn = styled.button`
  font-family: inherit;
  background: var(--surface);
  border: 1px solid var(--border-glass);
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  svg { width: 18px; height: 18px; }
`;

export const Search = styled.div`
  position: relative;
  margin-bottom: 8px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--text-muted);
    pointer-events: none;
  }

  input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 14px;
    padding: 11px 14px 11px 38px;
    border-radius: 12px;
    outline: none;

    &::placeholder { color: var(--text-muted); }
    &:focus { border-color: var(--primary-glow-border); box-shadow: 0 0 0 3px var(--primary-transparent); }
  }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: block;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  background: ${({ $active }) => ($active ? 'var(--surface)' : 'transparent')};
  border-left: 2px solid ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  transition: background .18s, color .18s;

  &:hover { background: var(--surface); color: var(--text-primary); }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-glass);
  margin: 8px 0;
`;
