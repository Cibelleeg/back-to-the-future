import { REVIEWS, ELIGIBLE } from '../mockData';
import * as S from '../ContaPage.styles';

const FILM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M7 2v20M17 2v20M2 7h5M2 12h20M2 17h5M17 7h5M17 17h5" />
  </svg>
);

function StarRating({ rating }: { rating: number }) {
  return (
    <S.Stars>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={i < rating ? 'on' : 'off'}>
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </S.Stars>
  );
}

export function AvaliacoesPanel() {
  return (
    <S.PanelWrap>
      <S.PanelHead>
        <h1>Minhas avaliações</h1>
        <p>Você só pode avaliar filmes que assistiu na CINEFESP — uma avaliação por filme.</p>
      </S.PanelHead>

      {REVIEWS.map(review => (
        <S.ReviewCard key={review.id}>
          <S.ReviewPoster>{FILM_ICON}</S.ReviewPoster>
          <S.ReviewBody>
            <h3>{review.title}</h3>
            <S.ReviewRow>
              <StarRating rating={review.rating} />
              <S.ReviewDate>{review.date}</S.ReviewDate>
            </S.ReviewRow>
            <p>{review.text}</p>
          </S.ReviewBody>
          <S.ReviewActions>
            <S.IconBtn aria-label="Editar avaliação">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </S.IconBtn>
            <S.IconBtn $danger aria-label="Excluir avaliação">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              </svg>
            </S.IconBtn>
          </S.ReviewActions>
        </S.ReviewCard>
      ))}

      <S.EligibleBlock>
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
      </S.EligibleBlock>
    </S.PanelWrap>
  );
}
