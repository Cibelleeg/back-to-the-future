import { useEffect } from 'react';
import { StarRating } from '../../../components/ui';
import { getCatalogoExtra } from '../catalogoData';
import { ESTADO_LABEL, getEstado, score5 } from '../filmesUtils';
import type { FilmeComRank } from '../types';
import * as S from '../FilmesPage.styles';
import { GateBlock } from './GateBlock';
import { Poster } from './Poster';

interface FilmeDetailModalProps {
  filme: FilmeComRank;
  onClose: () => void;
}

export function FilmeDetailModal({ filme, onClose }: FilmeDetailModalProps) {
  const extra = getCatalogoExtra(filme.idFilme);
  const estado = getEstado(filme);
  const score = score5(filme.nota);
  const maxDist = Math.max(...Object.values(extra.dist), 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.ModalTop>
          <S.ModalClose onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </S.ModalClose>

          <Poster src={filme.poster} alt={filme.titulo} size="modal" />

          <S.ModalInfo>
            <h2>{filme.titulo} <span>{new Date(filme.dataLancamento).getFullYear()}</span></h2>
            <S.ModalSub>
              <S.BadgeState $state={estado}>{ESTADO_LABEL[estado]}</S.BadgeState>
              <span>#{filme.rank} no catálogo</span>
              <span>{filme.duracao} min</span>
              <span>{filme.classificacao}</span>
            </S.ModalSub>
            <S.ModalGenres>
              <S.Genre>{filme.genero}</S.Genre>
            </S.ModalGenres>
            <S.Synopsis>{filme.sinopse}</S.Synopsis>
          </S.ModalInfo>
        </S.ModalTop>

        <S.ModalBody>
          {extra.count > 0 ? (
            <S.RatingSummary>
              <S.BigScore>
                <S.BigNum>{score.toFixed(1).replace('.', ',')}</S.BigNum>
                <S.BigStars>
                  <StarRating rating={score} maxRating={5} showScore={false} size={15} />
                </S.BigStars>
                <S.BigMeta>{extra.count.toLocaleString('pt-BR')} avaliações</S.BigMeta>
                <S.WeightedNote>nota ponderada — não é só a média</S.WeightedNote>
              </S.BigScore>
              <S.DistBars>
                {([5, 4, 3, 2, 1] as const).map(lvl => (
                  <S.DistRow key={lvl}>
                    <S.DistLvl>
                      {lvl}
                      <svg viewBox="0 0 24 24" fill="var(--primary-hover)">
                        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </S.DistLvl>
                    <S.DistBar>
                      <S.DistFill $pct={Math.round((extra.dist[lvl] / maxDist) * 100)} />
                    </S.DistBar>
                    <S.DistN>{extra.dist[lvl].toLocaleString('pt-BR')}</S.DistN>
                  </S.DistRow>
                ))}
              </S.DistBars>
            </S.RatingSummary>
          ) : (
            <S.EmptyState>Este filme ainda não recebeu avaliações.</S.EmptyState>
          )}

          <GateBlock gate={extra.gate} myStars={extra.myStars} upcoming={estado === 'breve'} />

          {extra.reviews.length > 0 && (
            <>
              <S.ReviewsTitle>Avaliações da comunidade</S.ReviewsTitle>
              {extra.reviews.map((review, i) => {
                const initials = review.who.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();

                return (
                  <S.Review key={i}>
                    <S.ReviewAvatar>{initials}</S.ReviewAvatar>
                    <S.ReviewBody>
                      <S.ReviewHead>
                        <strong>{review.who}</strong>
                        <S.ReviewStars>
                          <StarRating rating={review.stars} maxRating={5} showScore={false} size={12} />
                        </S.ReviewStars>
                        <span className="date">{review.date}</span>
                      </S.ReviewHead>
                      <S.ReviewText>{review.text}</S.ReviewText>
                    </S.ReviewBody>
                  </S.Review>
                );
              })}
            </>
          )}
        </S.ModalBody>
      </S.Modal>
    </S.Overlay>
  );
}
