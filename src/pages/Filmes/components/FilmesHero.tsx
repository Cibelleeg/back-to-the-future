import { getCatalogoExtra } from '../catalogoData';
import { ESTADO_LABEL, getEstado } from '../filmesUtils';
import type { FilmeComRank } from '../types';
import * as S from '../FilmesPage.styles';
import { INFO_ICON } from './icons';
import { Poster } from './Poster';

interface FilmesHeroProps {
  filme: FilmeComRank;
  onDetails: () => void;
}

export function FilmesHero({ filme, onDetails }: FilmesHeroProps) {
  return (
    <S.Hero>
      <div style={{ position: 'relative' }}>
        <S.RankFlag>#1</S.RankFlag>
        <Poster src={filme.poster} alt={filme.titulo} size="hero" />
      </div>

      <S.HeroInfo>
        <S.HeroTagline>Mais bem avaliado do catálogo</S.HeroTagline>
        <S.HeroTitle>
          {filme.titulo} <span>{new Date(filme.dataLancamento).getFullYear()}</span>
        </S.HeroTitle>
        <S.HeroMeta>
          <S.ScoreBig>
            <b>{filme.nota.toFixed(1).replace('.', ',')}</b>
            <small>/ 5</small>
          </S.ScoreBig>
          <S.CountNote>
            {getCatalogoExtra(filme.idFilme).count.toLocaleString('pt-BR')} avaliações
          </S.CountNote>
        </S.HeroMeta>
        <S.GenresList>
          <S.Genre>{filme.genero}</S.Genre>
          <S.Genre>{ESTADO_LABEL[getEstado(filme)]}</S.Genre>
        </S.GenresList>
        <S.Synopsis>{filme.sinopse}</S.Synopsis>
        <S.HeroActions>
          <S.BtnPrimary onClick={onDetails}>
            {INFO_ICON}
            Ver detalhes
          </S.BtnPrimary>
        </S.HeroActions>
      </S.HeroInfo>
    </S.Hero>
  );
}
