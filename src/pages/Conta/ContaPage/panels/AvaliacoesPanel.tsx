import { useState } from 'react';
import { ELIGIBLE } from '../mockData';
import { StarRating } from '../../../../components/ui';
import type { UserReview } from '../../../../types/review';
import * as S from '../ContaPage.styles';

const FILM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M7 2v20M17 2v20M2 7h5M2 12h20M2 17h5M17 7h5M17 17h5" />
  </svg>
);

type AvaliacoesPanelProps = {
  reviews: UserReview[];
  isLoading: boolean;
  error: string | null;
  showEligible?: boolean;
  onUpdateReview: (id: string, payload: { nota: number; comentario: string }) => Promise<void>;
  onDeleteReview: (id: string) => Promise<void>;
};

export function AvaliacoesPanel({
  reviews,
  isLoading,
  error,
  showEligible = false,
  onUpdateReview,
  onDeleteReview,
}: AvaliacoesPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftRating, setDraftRating] = useState(5);
  const [draftText, setDraftText] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  function startEdit(review: UserReview) {
    setEditingId(review.id);
    setDraftRating(Math.min(5, Math.max(1, Math.round(review.rating))));
    setDraftText(review.text);
    setActionError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftText('');
    setActionError(null);
  }

  async function saveEdit(id: string) {
    try {
      setSavingId(id);
      setActionError(null);
      await onUpdateReview(id, { nota: draftRating, comentario: draftText.trim() });
      cancelEdit();
    } catch {
      setActionError('Não foi possível salvar a avaliação.');
    } finally {
      setSavingId(null);
    }
  }

  async function removeReview(id: string) {
    const confirmed = window.confirm('Excluir esta avaliação?');
    if (!confirmed) return;

    try {
      setSavingId(id);
      setActionError(null);
      await onDeleteReview(id);
      if (editingId === id) cancelEdit();
    } catch {
      setActionError('Não foi possível excluir a avaliação.');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <S.PanelWrap>
      <S.PanelHead>
        <h1>Minhas avaliações</h1>
        <p>Você só pode avaliar filmes que assistiu na CINEFESP — uma avaliação por filme.</p>
      </S.PanelHead>

      {isLoading && <S.Help>Carregando suas avaliações...</S.Help>}
      {error && <S.Help>{error}</S.Help>}
      {actionError && <S.Help>{actionError}</S.Help>}
      {!isLoading && !error && reviews.length === 0 && <S.Help>Você ainda não avaliou nenhum filme.</S.Help>}

      {reviews.map(review => (
        <S.ReviewCard key={review.id}>
          <S.ReviewPoster>{FILM_ICON}</S.ReviewPoster>
          <S.ReviewBody>
            <h3>{review.title}</h3>
            <S.ReviewRow>
              <StarRating rating={review.rating} maxRating={5} showScore={false} size={16} />
              <S.ReviewDate>{review.date}</S.ReviewDate>
            </S.ReviewRow>
            {editingId === review.id ? (
              <S.ReviewEditor>
                <label>
                  Nota
                  <select value={draftRating} onChange={(event) => setDraftRating(Number(event.target.value))}>
                    <option value={5}>5 estrelas</option>
                    <option value={4}>4 estrelas</option>
                    <option value={3}>3 estrelas</option>
                    <option value={2}>2 estrelas</option>
                    <option value={1}>1 estrela</option>
                  </select>
                </label>
                <textarea
                  value={draftText}
                  onChange={(event) => setDraftText(event.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Conte o que achou do filme"
                />
                <S.ReviewEditorActions>
                  <S.BtnGhost type="button" onClick={cancelEdit} disabled={savingId === review.id}>Cancelar</S.BtnGhost>
                  <S.BtnPrimary type="button" onClick={() => saveEdit(review.id)} disabled={savingId === review.id}>
                    {savingId === review.id ? 'Salvando...' : 'Salvar'}
                  </S.BtnPrimary>
                </S.ReviewEditorActions>
              </S.ReviewEditor>
            ) : (
              <p>{review.text || 'Sem comentário.'}</p>
            )}
          </S.ReviewBody>
          <S.ReviewActions>
            <S.IconBtn aria-label="Editar avaliação" onClick={() => startEdit(review)} disabled={savingId === review.id}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </S.IconBtn>
            <S.IconBtn $danger aria-label="Excluir avaliação" onClick={() => removeReview(review.id)} disabled={savingId === review.id}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
            </S.IconBtn>
          </S.ReviewActions>
        </S.ReviewCard>
      ))}

      {showEligible && <S.EligibleBlock>
        <h2>Aguardando sua avaliação</h2>
        <p className="sub">Filmes que você já assistiu e ainda não avaliou.</p>
        <S.EligibleGrid>
          {ELIGIBLE.map(item => (
            <S.EligibleCard key={item.id}>
              <S.MiniPoster />
              <S.EligibleInfo>
                <strong>{item.title}</strong>
                <small>assistido {item.watchedOn}</small>
              </S.EligibleInfo>
              <S.BtnMini>Avaliar</S.BtnMini>
            </S.EligibleCard>
          ))}
        </S.EligibleGrid>
      </S.EligibleBlock>}
    </S.PanelWrap>
  );
}
