import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Cinema } from '../../../types/cinema';
import { useCart } from '../../../contexts/useCart';
import { useAuth, useUserInfo } from '../../../hooks';
import { CartDrawer } from '../CartDrawer';
import { CinemaSelector } from '../CinemaSelector';
import * as S from './Navbar.styles';

interface NavbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  cinemas?: Cinema[];
  cinemaSelecionado?: Cinema | null;
  onCinemaChange?: (cinema: Cinema | null) => void;
  onMenuOpen: () => void;
}

const LINKS = [
  { label: 'Filmes',     to: '/filmes' },
  { label: 'Bomboniere', to: '/bomboniere' },
  { label: 'O que foi feito',    to: '/o-que-foi-feito' },
  { label: 'Equipe',     to: '/equipe' },
];

export function Navbar({ search, onSearchChange, cinemas, cinemaSelecionado, onCinemaChange, onMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { count, cartOpen, abrirCarrinho, fecharCarrinho } = useCart();
  const { pathname } = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const userInfo = useUserInfo();
  const navInitials = (userInfo?.name || userInfo?.email || '')
    .split(/[\s@]/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
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

      {onSearchChange && (
        <S.Search>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={search ?? ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar filme…"
          />
        </S.Search>
      )}

      {cinemas && onCinemaChange && (
        <CinemaSelector
          cinemas={cinemas}
          cinemaSelecionado={cinemaSelecionado ?? null}
          onChange={onCinemaChange}
        />
      )}

      <S.Auth>
        <S.CartBtn onClick={abrirCarrinho} aria-label={`Abrir carrinho com ${count} ${count === 1 ? 'item' : 'itens'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && <S.CartBadge>{count > 99 ? '99+' : count}</S.CartBadge>}
        </S.CartBtn>

        {isLoggedIn ? (
          <S.UserWrapper ref={dropdownRef}>
            <S.UserBtn aria-label="Menu do usuário" onClick={() => setDropdownOpen(o => !o)}>
              {navInitials || (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              )}
            </S.UserBtn>
            <S.UserDropdown $open={dropdownOpen}>
              <S.UserDropdownItem as={Link} to="/conta" onClick={() => setDropdownOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                Minha conta
              </S.UserDropdownItem>
              <S.UserDropdownItem className="danger" onClick={() => { setDropdownOpen(false); logout(); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair
              </S.UserDropdownItem>
            </S.UserDropdown>
          </S.UserWrapper>
        ) : (
          <>
            <S.BtnGhost as={Link} to="/login#entrar">Entrar</S.BtnGhost>
            <S.BtnSolid as={Link} to="/login#cadastrar">Cadastrar</S.BtnSolid>
          </>
        )}

        <S.Burger aria-label="Menu" onClick={onMenuOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </S.Burger>
      </S.Auth>

      <CartDrawer open={cartOpen} onClose={fecharCarrinho} />
    </S.Nav>
  );
}
