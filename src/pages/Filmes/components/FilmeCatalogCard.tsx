import { useState } from 'react';
import { StarRating } from '../../../components/ui';
import { getCatalogoExtra } from '../catalogoData';
import { ESTADO_LABEL, getEstado } from '../filmesUtils';
import type { FilmeComRank } from '../types';
import * as S from '../FilmesPage.styles';
import { FILM_SVG } from './icons';

interface FilmeCatalogCardProps {
  filme: FilmeComRank;
  onSelect: () => void;
}

export function FilmeCatalogCard({ filme, onSelect }: FilmeCatalogCardProps) {
  const [imgOk, setImgOk] = useState(true);
  const extra = getCatalogoExtra(filme.idFilme);
  const score = filme.nota;
  const estado = getEstado(filme);
  const hasRating = extra.count > 0 || score > 0;

  return (
    <S.FilmCard onClick={onSelect}>
      <S.PosterWrap>
        <S.PosterInner className="poster-inner">{FILM_SVG}</S.PosterInner>
        {imgOk && (
          <S.PosterImgEl src={filme.poster} alt={filme.titulo} onError={() => setImgOk(false)} />
        )}
        <S.RankBadge $top={filme.rank === 1}>#{filme.rank}</S.RankBadge>
        <S.StateTag $state={estado}>{ESTADO_LABEL[estado]}</S.StateTag>
      </S.PosterWrap>
      <S.FilmMeta>
        <h3>{filme.titulo}</h3>
        <span className="yr">{new Date(filme.dataLancamento).getFullYear()}</span>
        {hasRating ? (
          <S.RatingRow>
            <StarRating
              rating={score}
              maxRating={5}
              size={14}
              score={score.toFixed(1).replace('.', ',')}
            />
            {extra.count > 0 && <small>({extra.count.toLocaleString('pt-BR')})</small>}
          </S.RatingRow>
        ) : (
          <S.RatingRow>
            <small>Sem avaliações ainda</small>
          </S.RatingRow>
        )}
      </S.FilmMeta>
    </S.FilmCard>
  );
}
