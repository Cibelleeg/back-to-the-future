import { useEffect, useState } from 'react';
import type { Cinema } from '../../../types/cinema';
import { CinemaSelector } from '../CinemaSelector';
import * as S from './Navbar.styles';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  cinemas: Cinema[];
  cinemaSelecionado: Cinema | null;
  onCinemaChange: (cinema: Cinema | null) => void;
}

const LINKS = ['Filmes', 'Cinemas', 'Bomboniere', 'Eventos', 'Clube'];

export function Navbar({ search, onSearchChange, cinemas, cinemaSelecionado, onCinemaChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <S.Nav $scrolled={scrolled}>
      <S.Logo href="#">
        <S.LogoDot />
        CINE<b>FESP</b>
      </S.Logo>

      <S.Links>
        {LINKS.map((item, i) => (
          <S.NavLink key={item} href="#" $active={i === 0}>{item}</S.NavLink>
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
        <S.BtnGhost>Entrar</S.BtnGhost>
        <S.BtnSolid>Cadastrar</S.BtnSolid>
        <S.Burger aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </S.Burger>
      </S.Auth>
    </S.Nav>
  );
}
