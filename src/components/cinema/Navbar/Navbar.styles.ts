import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.82); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: none; }
`;

export const Nav = styled.nav<{ $scrolled?: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 20px clamp(20px, 4vw, 52px);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: padding .35s ease, background .35s ease, border-color .35s ease, backdrop-filter .35s ease;

  ${({ $scrolled }) => $scrolled && css`
    padding: 13px clamp(20px, 4vw, 52px);
    background: var(--nav-scrolled-bg);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border-bottom: 1px solid var(--border-glass);
  `}

  > * { animation: ${rise} .6s cubic-bezier(.2,.7,.2,1) backwards; }
  > *:nth-child(1) { animation-delay: .02s; }
  > *:nth-child(2) { animation-delay: .07s; }
  > *:nth-child(3) { animation-delay: .10s; }
  > *:nth-child(4) { animation-delay: .14s; }
  > *:nth-child(5) { animation-delay: .18s; }
  > *:nth-child(6) { animation-delay: .22s; }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 800;
  font-size: 23px;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;

  b { color: var(--primary); }
`;

export const LogoDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 12px 1px var(--primary);
  animation: ${pulse} 2.6s ease-in-out infinite;
`;

export const Links = styled.div`
  display: flex;
  gap: 6px;

  @media (max-width: 1080px) { display: none; }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  position: relative;
  text-decoration: none;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-muted)')};
  font-size: 15px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 10px;
  transition: color .22s ease, background .22s ease;

  &::after {
    content: "";
    position: absolute;
    left: 14px; right: 14px; bottom: 2px;
    height: 2px;
    background: var(--primary);
    border-radius: 2px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform .28s cubic-bezier(.2,.7,.2,1);
  }

  &:hover {
    color: var(--text-primary);
    background: var(--surface);
    &::after { transform: scaleX(1); }
  }
`;

export const Spacer = styled.div`flex: 1;`;

export const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 230px;
  transition: width .3s ease;

  svg {
    position: absolute;
    left: 14px;
    width: 17px; height: 17px;
    color: var(--text-muted);
    transition: color .22s;
    pointer-events: none;
  }

  input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border-glass);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 14px;
    padding: 11px 16px 11px 40px;
    border-radius: 12px;
    outline: none;
    transition: background .22s, border-color .22s, box-shadow .22s;

    &::placeholder { color: var(--text-muted); }
  }

  &:focus-within {
    width: 280px;

    input {
      background: var(--glass-bg);
      border-color: var(--primary-glow-border);
      box-shadow: 0 0 0 4px var(--primary-transparent);
    }

    svg { color: var(--primary); }
  }

  @media (max-width: 1080px) { display: none; }
`;

export const Auth = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CartBtn = styled.button`
  position: relative;
  font-family: inherit;
  background: var(--surface);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  transition: background .22s, border-color .22s;

  svg { width: 20px; height: 20px; display: block; }
  &:hover { background: var(--surface-hover); }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--green);
  color: var(--text-primary);
  font-size: 10px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`;

export const BtnGhost = styled.button`
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 11px 20px;
  border-radius: 12px;
  border: 1px solid var(--border-glass);
  background: transparent;
  color: var(--text-primary);
  transition: transform .15s ease, background .22s, border-color .22s;

  &:hover { background: var(--surface); border-color: var(--border-glass-hover); }
  &:active { transform: translateY(1px); }

  @media (max-width: 560px) { display: none; }
`;

export const BtnSolid = styled.button`
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 11px 20px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: linear-gradient(180deg, var(--primary), var(--primary-deep));
  color: var(--text-primary);
  box-shadow: 0 6px 18px -6px var(--primary-shadow);
  transition: transform .15s ease, box-shadow .22s;

  &:hover { box-shadow: 0 10px 26px -6px var(--primary-shadow-hover); transform: translateY(-1px); }
  &:active { transform: translateY(1px); }
`;

export const Burger = styled.button`
  display: none;
  font-family: inherit;
  background: var(--surface);
  border: 1px solid var(--border-glass);
  border-radius: 11px;
  padding: 10px;
  cursor: pointer;
  color: var(--text-primary);

  svg { width: 20px; height: 20px; display: block; }

  @media (max-width: 1080px) { display: block; }
`;
