import { useState, type FormEvent } from 'react';
import { StarRating } from '../../../components/ui';
import type { Gate, MinhaAvaliacao } from '../catalogoData';
import * as S from '../FilmesPage.styles';

interface GateBlockProps {
  gate: Gate;
  myStars?: number;
  myReview?: MinhaAvaliacao | null;
  upcoming?: boolean;
  isSubmitting?: boolean;
  error?: string | null;
  onSubmitReview: (nota: number, comentario: string) => Promise<void> | void;
  onDeleteReview?: () => Promise<void> | void;
}

export function GateBlock({
  gate,
  myStars,
  myReview,
  upcoming,
  isSubmitting = false,
  error,
  onSubmitReview,
  onDeleteReview,
}: GateBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nota, setNota] = useState(myStars ?? 5);
  const [comentario, setComentario] = useState(myReview?.comentario ?? '');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await onSubmitReview(nota, comentario.trim());
      setIsEditing(false);
    } catch {
      // A mensagem de erro vem do modal e mantém o formulário aberto.
    }
  }

  function reviewForm() {
    return (
      <S.ReviewForm onSubmit={handleSubmit}>
        <S.StarsInput aria-label="Nota da avaliação">
          {[1, 2, 3, 4, 5].map((star) => (
            <S.StarInputButton
              key={star}
              type="button"
              $active={star <= nota}
              onClick={() => setNota(star)}
              aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
            >
              ★
            </S.StarInputButton>
          ))}
        </S.StarsInput>
        <S.ReviewTextarea
          value={comentario}
          onChange={(event) => setComentario(event.target.value)}
          placeholder="Escreva um comentário opcional"
          maxLength={600}
        />
        {error && <S.InlineError>{error}</S.InlineError>}
        <S.FormActions>
          <S.BtnPrimary type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar avaliação'}
          </S.BtnPrimary>
          {gate === 'reviewed' && (
            <S.BtnGhost type="button" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
              Cancelar
            </S.BtnGhost>
          )}
        </S.FormActions>
      </S.ReviewForm>
    );
  }

  if (gate === 'eligible') {
    return (
      <S.Gate $variant="eligible">
        <S.GateIcon $variant="eligible">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </S.GateIcon>
        <S.GateText>
          <strong>Você assistiu a este filme</strong>
          <small>Conte o que achou — sua avaliação ajuda a comunidade.</small>
        </S.GateText>
        {isEditing ? reviewForm() : (
          <S.BtnPrimary onClick={() => setIsEditing(true)}>Avaliar</S.BtnPrimary>
        )}
      </S.Gate>
    );
  }

  if (gate === 'reviewed' && myStars) {
    return (
      <S.Gate $variant="reviewed">
        <S.GateIcon $variant="reviewed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </S.GateIcon>
        <S.GateText>
          <strong>Você já avaliou este filme</strong>
          <S.MyStars>
            <StarRating rating={myStars} maxRating={5} showScore={false} size={13} />
          </S.MyStars>
        </S.GateText>
        {isEditing ? reviewForm() : (
          <S.FormActions>
            <S.BtnGhost onClick={() => setIsEditing(true)}>Editar avaliação</S.BtnGhost>
            {onDeleteReview && (
              <S.BtnGhost type="button" onClick={onDeleteReview} disabled={isSubmitting}>
                Excluir
              </S.BtnGhost>
            )}
          </S.FormActions>
        )}
      </S.Gate>
    );
  }

  return (
    <S.Gate $variant="locked">
      <S.GateIcon $variant="locked">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </S.GateIcon>
      <S.GateText>
        <strong>Avaliação bloqueada</strong>
        <small>
          {upcoming
            ? 'Disponível após a estreia e sua sessão.'
            : 'Assista a este filme na CINEFESP para poder avaliá-lo.'}
        </small>
      </S.GateText>
      <S.BtnDisabled disabled>Avaliar</S.BtnDisabled>
    </S.Gate>
  );
}
