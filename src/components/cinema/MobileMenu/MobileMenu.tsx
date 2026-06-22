import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Cinema } from '../../../types/cinema';
import { CinemaSelector } from '../CinemaSelector';
import * as S from './MobileMenu.styles';

interface MobileMenuProps {
  aberto: boolean;
  onFechar: () => void;
  search?: string;
  onSearchChange?: (v: string) => void;
  cinemas: Cinema[];
  cinemaSelecionado: Cinema | null;
  onCinemaChange: (c: Cinema | null) => void;
}

const LINKS = [
  { label: 'Filmes',     to: '/filmes' },
  { label: 'Cinemas',    to: '/cinemas' },
  { label: 'Bomboniere', to: '/bomboniere' },
  { label: 'Equipe',     to: '/equipe' },
];

export function MobileMenu({ aberto, onFechar, search, onSearchChange, cinemas, cinemaSelecionado, onCinemaChange }: MobileMenuProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onFechar(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [aberto, onFechar]);

  useEffect(() => {
    if (!aberto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [aberto]);

  useEffect(() => {
    if (aberto) onFechar();
  }, [pathname, aberto, onFechar]);

  if (!aberto) return null;

  return (
    <S.Backdrop onClick={onFechar}>
      <S.Drawer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Logo>CINE<b>FESP</b></S.Logo>
          <S.CloseBtn onClick={onFechar} aria-label="Fechar menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </S.CloseBtn>
        </S.Header>

        {onSearchChange && (
          <S.Search>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input value={search ?? ''} onChange={(e) => onSearchChange(e.target.value)} placeholder="Buscar filme…" />
          </S.Search>
        )}

        <S.Divider />

        {LINKS.map(({ label, to }) => (
          <S.NavLink key={label} as={Link} to={to} $active={pathname === to} onClick={onFechar}>
            {label}
          </S.NavLink>
        ))}

        <S.Divider />

        <CinemaSelector cinemas={cinemas} cinemaSelecionado={cinemaSelecionado} onChange={(c) => { onCinemaChange(c); onFechar(); }} />
      </S.Drawer>
    </S.Backdrop>
  );
}
