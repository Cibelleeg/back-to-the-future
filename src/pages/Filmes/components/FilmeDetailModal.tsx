import { useEffect, useState } from 'react';
import { StarRating } from '../../../components/ui';
import { config } from '../../../config';
import { atualizarAvaliacao, criarAvaliacaoFilme, excluirAvaliacao, fetchFilmeDetalheAvaliacoes } from '../../../services/avaliacaoService';
import { getCatalogoExtra, type CatalogoExtra, type Review } from '../catalogoData';
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
  const [extra, setExtra] = useState<CatalogoExtra>(() => getCatalogoExtra(filme.idFilme));
  const [isLoadingExtra, setIsLoadingExtra] = useState(!config.useMock);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const estado = getEstado(filme);
  const score = score5(filme.nota);
  const maxDist = Math.max(...Object.values(extra.dist), 1);

  useEffect(() => {
    if (config.useMock) return;

    fetchFilmeDetalheAvaliacoes(filme.idFilme)
      .then(setExtra)
      .catch((error: unknown) => {
        setReviewError(error instanceof Error ? error.message : 'Não foi possível carregar as avaliações.');
      })
      .finally(() => setIsLoadingExtra(false));
  }, [filme.idFilme]);

  function upsertLocalReview(nota: number, comentario: string): void {
    setExtra((current) => {
      const previous = current.myReview;
      const dist = { ...current.dist };
      const id = previous?.id ?? `local-${Date.now()}`;
      const review: Review = {
        id,
        who: 'Você',
        stars: nota,
        date: new Date().toLocaleDateString('pt-BR'),
        text: comentario || 'Sem comentário.',
      };

      if (previous) {
        dist[previous.nota as 1 | 2 | 3 | 4 | 5] = Math.max(0, dist[previous.nota as 1 | 2 | 3 | 4 | 5] - 1);
      }
      dist[nota as 1 | 2 | 3 | 4 | 5] += 1;

      return {
        ...current,
        count: previous ? current.count : current.count + 1,
        dist,
        gate: 'reviewed',
        myStars: nota,
        myReview: {
          id,
          nota,
          comentario: comentario || null,
          createdAt: previous?.createdAt ?? new Date().toISOString(),
        },
        reviews: previous
          ? current.reviews.map((item) => item.id === previous.id ? review : item)
          : [review, ...current.reviews],
      };
    });
  }

  async function refreshExtra(): Promise<void> {
    if (config.useMock) return;
    setExtra(await fetchFilmeDetalheAvaliacoes(filme.idFilme));
  }

  async function handleSubmitReview(nota: number, comentario: string): Promise<void> {
    setReviewError(null);
    setIsSubmittingReview(true);

    try {
      if (config.useMock) {
        upsertLocalReview(nota, comentario);
        return;
      }

      if (extra.gate === 'reviewed' && extra.myReview) {
        await atualizarAvaliacao(extra.myReview.id, { nota, comentario });
      } else {
        await criarAvaliacaoFilme(filme.idFilme, { nota, comentario });
      }
      await refreshExtra();
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'Não foi possível salvar sua avaliação.');
      throw error;
    } finally {
      setIsSubmittingReview(false);
    }
  }

  async function handleDeleteReview(): Promise<void> {
    if (!extra.myReview) return;

    setReviewError(null);
    setIsSubmittingReview(true);

    try {
      if (config.useMock) {
        setExtra((current) => {
          if (!current.myReview) return current;
          const dist = { ...current.dist };
          dist[current.myReview.nota as 1 | 2 | 3 | 4 | 5] = Math.max(0, dist[current.myReview.nota as 1 | 2 | 3 | 4 | 5] - 1);

          return {
            ...current,
            count: Math.max(0, current.count - 1),
            dist,
            gate: 'eligible',
            myStars: undefined,
            myReview: null,
            reviews: current.reviews.filter((review) => review.id !== current.myReview?.id),
          };
        });
        return;
      }

      await excluirAvaliacao(extra.myReview.id);
      await refreshExtra();
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : 'Não foi possível excluir sua avaliação.');
    } finally {
      setIsSubmittingReview(false);
    }
  }

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

          {isLoadingExtra && <S.EmptyState>Carregando avaliações...</S.EmptyState>}

          <GateBlock
            gate={extra.gate}
            myStars={extra.myStars}
            myReview={extra.myReview}
            upcoming={estado === 'breve'}
            isSubmitting={isSubmittingReview}
            error={reviewError}
            onSubmitReview={handleSubmitReview}
            onDeleteReview={extra.gate === 'reviewed' ? handleDeleteReview : undefined}
          />

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
