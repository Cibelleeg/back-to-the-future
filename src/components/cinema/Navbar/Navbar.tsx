import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Cinema } from '../../../types/cinema';
import { useCart } from '../../../contexts/useCart';
import { CinemaSelector } from '../CinemaSelector';
import * as S from './Navbar.styles';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  cinemas: Cinema[];
  cinemaSelecionado: Cinema | null;
  onCinemaChange: (cinema: Cinema | null) => void;
  onMenuOpen: () => void;
}

const LINKS = [
  { label: 'Filmes',     to: '/filmes' },
  { label: 'Cinemas',    to: '/cinemas' },
  { label: 'Bomboniere', to: '/#bomboniere' },
  { label: 'Eventos',    to: '/#eventos' },
  { label: 'Clube',      to: '/#clube' },
];

export function Navbar({ search, onSearchChange, cinemas, cinemaSelecionado, onCinemaChange, onMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <S.Nav $scrolled={scrolled}>
      <S.Logo as={Link} to="/">
        <S.LogoDot />
        CINE<b>FESP</b>
      </S.Logo>

      <S.Links>
        {LINKS.map(({ label, to }) => (
          <S.NavLink key={label} as={Link} to={to} $active={pathname === to}>
            {label}
          </S.NavLink>
        ))}
      </S.Links>

      <S.Spacer />

      <S.Search>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar filme…"
        />
      </S.Search>

      <CinemaSelector
        cinemas={cinemas}
        cinemaSelecionado={cinemaSelecionado}
        onChange={onCinemaChange}
      />

      <S.Auth>
        <S.CartBtn>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && <S.CartBadge>{count > 99 ? '99+' : count}</S.CartBadge>}
        </S.CartBtn>
        <S.BtnGhost as={Link} to="/login">Entrar</S.BtnGhost>
        <S.BtnSolid as={Link} to="/register">Cadastrar</S.BtnSolid>
        <S.Burger aria-label="Menu" onClick={onMenuOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </S.Burger>
      </S.Auth>
    </S.Nav>
  );
}
