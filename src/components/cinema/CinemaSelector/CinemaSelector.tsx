import { useEffect, useRef, useState } from 'react';
import type { Cinema } from '../../../types/cinema';
import * as S from './CinemaSelector.styles';

interface CinemaSelectorProps {
  cinemas: Cinema[];
  cinemaSelecionado: Cinema | null;
  onChange: (cinema: Cinema | null) => void;
  variant?: 'navbar' | 'menu';
}

export function CinemaSelector({ cinemas, cinemaSelecionado, onChange, variant = 'navbar' }: CinemaSelectorProps) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setAberto(false);
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  function selecionar(cinema: Cinema | null) {
    onChange(cinema);
    setAberto(false);
  }

  return (
    <S.Wrapper ref={ref} $variant={variant}>
      <S.Trigger onClick={() => setAberto(!aberto)} $variant={variant}>
        <svg className="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
        <span>{cinemaSelecionado ? cinemaSelecionado.nome : 'Todos os cinemas'}</span>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d={aberto ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
        </svg>
      </S.Trigger>

      {aberto && (
        <S.Dropdown $variant={variant}>
          <S.Option $active={!cinemaSelecionado} onClick={() => selecionar(null)}>
            Todos os cinemas
          </S.Option>
          {cinemas.map((cinema) => (
            <S.Option
              key={cinema.idCinema}
              $active={cinemaSelecionado?.idCinema === cinema.idCinema}
              onClick={() => selecionar(cinema)}
            >
              <span>{cinema.nome}</span>
              <small>{cinema.cidade}</small>
            </S.Option>
          ))}
        </S.Dropdown>
      )}
    </S.Wrapper>
  );
}
