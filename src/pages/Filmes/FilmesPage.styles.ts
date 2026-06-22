import styled, { css, keyframes } from 'styled-components';

const GOLD = '#e6b84d';
const SURFACE = '#15211b';
const SURFACE2 = '#1b2a22';
const LINE = 'rgba(114,125,131,0.22)';
const LINE_STRONG = 'rgba(114,125,131,0.38)';


export const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px;
  background:
    radial-gradient(1200px 600px at 85% -10%, rgba(33,90,54,0.28), transparent 60%),
    radial-gradient(900px 500px at -10% 110%, rgba(31,158,87,0.07), transparent 55%),
    #0c1310;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
`;

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(22px, 4vw, 40px) clamp(18px, 4vw, 44px) 90px;
`;


export const PageHead = styled.div`
  margin-bottom: 28px;
`;

export const Eyebrow = styled.div`
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--primary-hover);
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(34px, 6vw, 52px);
  letter-spacing: -0.03em;
  line-height: 1;
`;

export const Lede = styled.p`
  color: var(--text-muted);
  font-size: 15px;
  margin-top: 10px;
  max-width: 560px;
  line-height: 1.55;
`;


export const Hero = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 26px;
  background: linear-gradient(110deg, ${SURFACE2}, ${SURFACE});
  border: 1px solid rgba(31,158,87,0.26);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 34px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '01';
    position: absolute;
    right: -10px;
    bottom: -34px;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800;
    font-size: 200px;
    color: rgba(31,158,87,0.06);
    line-height: 1;
    letter-spacing: -0.05em;
    pointer-events: none;
  }

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const HeroPoster = styled.div`
  width: 150px;
  height: 222px;
  border-radius: 11px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, var(--primary-deep), #0a1a11);
  box-shadow: 0 18px 50px -24px rgba(0,0,0,0.85);

  @media (max-width: 640px) { width: 120px; height: 178px; }
`;

export const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
`;

export const PosterFallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(255,255,255,0.3);
  svg { width: 34px; height: 34px; }
`;

export const RankFlag = styled.span`
  position: absolute;
  top: -10px;
  left: -10px;
  background: ${GOLD};
  color: #2a1d00;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.4);
  z-index: 2;
`;

export const HeroInfo = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeroTagline = styled.div`
  font-size: 12px;
  color: var(--primary-hover);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 6px;
`;

export const HeroTitle = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: clamp(26px, 4vw, 34px);
  letter-spacing: -0.02em;
  span { color: var(--text-muted); font-weight: 400; }
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 12px 0 14px;
  flex-wrap: wrap;
`;

export const ScoreBig = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  b {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: var(--primary-hover);
    letter-spacing: -0.02em;
  }
  small { font-size: 13px; color: var(--text-muted); }
`;

export const CountNote = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;

export const GenresList = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;

export const Genre = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  background: rgba(114,125,131,0.12);
  border: 1px solid ${LINE};
  padding: 3px 10px;
  border-radius: 20px;
`;

export const Synopsis = styled.p`
  color: #cdd6d1;
  font-size: 14px;
  max-width: 600px;
  margin-bottom: 18px;
  line-height: 1.55;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;


const btnBase = css`
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: filter 0.16s, background 0.16s, transform 0.1s;
  svg { width: 16px; height: 16px; }
  &:active { transform: translateY(1px); }
`;

export const BtnPrimary = styled.button`
  ${btnBase}
  background: var(--primary);
  color: #04130b;
  &:hover { filter: brightness(1.1); }
`;

export const BtnGhost = styled.button`
  ${btnBase}
  background: transparent;
  border-color: ${LINE_STRONG};
  color: var(--text-primary);
  &:hover { background: ${SURFACE2}; }
`;

export const BtnDisabled = styled.button`
  ${btnBase}
  background: rgba(114,125,131,0.12);
  color: var(--text-muted);
  border-color: ${LINE};
  cursor: not-allowed;
`;


export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${LINE};
`;

export const ControlLabel = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
`;

export const Seg = styled.div`
  display: flex;
  background: ${SURFACE};
  border: 1px solid ${LINE};
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
`;

export const SegBtn = styled.button<{ $active: boolean }>`
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-family: inherit;
  background: ${({ $active }) => $active ? 'rgba(31,158,87,0.14)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--primary-hover)' : 'var(--text-muted)'};
  transition: background 0.15s, color 0.15s;
`;

export const SelectMini = styled.select`
  appearance: none;
  background: ${SURFACE};
  border: 1px solid ${LINE};
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 13px;
  font-family: inherit;
  padding: 8px 32px 8px 13px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a39b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 11px center;

  option { background: #15211b; }
`;

export const TotalCount = styled.span`
  margin-left: auto;
  font-size: 13px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 22px 20px;
`;

export const FilmCard = styled.button`
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover .poster-inner { transform: scale(1.05); }
`;

export const PosterWrap = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  box-shadow: 0 18px 50px -24px rgba(0,0,0,0.85);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
    border-radius: 12px;
    pointer-events: none;
  }
`;

export const PosterInner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, var(--primary-deep), #0a1a11);
  display: grid;
  place-items: center;
  color: rgba(255,255,255,0.32);
  transition: transform 0.3s ease;
  svg { width: 30px; height: 30px; }
`;

export const PosterImgEl = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RankBadge = styled.span<{ $top?: boolean }>`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  background: ${({ $top }) => $top ? GOLD : 'rgba(12,19,16,0.82)'};
  backdrop-filter: blur(4px);
  color: ${({ $top }) => $top ? '#2a1d00' : 'var(--text-primary)'};
  border: ${({ $top }) => $top ? 'none' : `1px solid ${LINE}`};
  padding: 3px 8px;
  border-radius: 7px;
`;

const stateStyles = {
  cartaz: css`background: rgba(31,158,87,0.85); color: #04130b;`,
  breve:  css`background: rgba(230,184,77,0.85); color: #2a1d00;`,
  encerrado: css`background: rgba(12,19,16,0.78); color: var(--text-muted); border: 1px solid ${LINE};`,
};

export const StateTag = styled.span<{ $state: 'cartaz' | 'breve' | 'encerrado' }>`
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 2;
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
  ${({ $state }) => stateStyles[$state]}
`;

export const FilmMeta = styled.div`
  h3 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.2;
    color: var(--text-primary);
  }
  .yr {
    font-size: 12.5px;
    color: var(--text-muted);
    font-family: 'Space Mono', monospace;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  b { font-size: 13.5px; font-weight: 700; }
  small { font-size: 11.5px; color: var(--text-muted); font-family: 'Space Mono', monospace; }
`;


const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popIn  = keyframes`from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: none; }`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(5,9,7,0.74);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(16px,5vh,60px) 16px;
  overflow-y: auto;
  animation: ${fadeIn} 0.2s ease;
`;

export const Modal = styled.div`
  width: min(760px, 100%);
  background: ${SURFACE};
  border: 1px solid ${LINE_STRONG};
  border-radius: 18px;
  box-shadow: 0 40px 90px -30px rgba(0,0,0,0.9);
  overflow: hidden;
  animation: ${popIn} 0.26s cubic-bezier(0.2,0.8,0.3,1);
`;

export const ModalTop = styled.div`
  display: grid;
  grid-template-columns: 132px 1fr;
  gap: 22px;
  padding: 26px;
  background: linear-gradient(120deg, ${SURFACE2}, ${SURFACE});
  position: relative;

  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: rgba(12,19,16,0.6);
  border: 1px solid ${LINE};
  color: var(--text-muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  svg { width: 17px; height: 17px; }
  &:hover { color: var(--text-primary); background: ${SURFACE2}; }
`;

export const ModalPosterWrap = styled.div`
  width: 132px;
  height: 196px;
  border-radius: 11px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(160deg, var(--primary-deep), #0a1a11);
  box-shadow: 0 18px 50px -24px rgba(0,0,0,0.85);

  @media (max-width: 500px) { width: 110px; height: 164px; }
`;

export const ModalInfo = styled.div`
  h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.02em;
    span { color: var(--text-muted); font-weight: 400; }
  }
`;

export const ModalSub = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin: 8px 0 12px;
  font-size: 13px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;

export const BadgeState = styled.span<{ $state: 'cartaz' | 'breve' | 'encerrado' }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 9px;
  border-radius: 6px;

  ${({ $state }) =>
    $state === 'cartaz' || $state === 'breve'
      ? css`background: rgba(31,158,87,0.14); color: var(--primary-hover); border: 1px solid rgba(31,158,87,0.3);`
      : css`background: rgba(114,125,131,0.12); color: var(--text-muted); border: 1px solid ${LINE};`
  }
`;

export const ModalGenres = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const ModalBody = styled.div`
  padding: 24px 26px 26px;
`;


export const RatingSummary = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 26px;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid ${LINE};
  margin-bottom: 22px;

  @media (max-width: 500px) { grid-template-columns: 1fr; gap: 18px; }
`;

export const BigScore = styled.div`
  text-align: center;
`;

export const BigNum = styled.div`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 50px;
  line-height: 1;
  color: var(--primary-hover);
  letter-spacing: -0.03em;
`;

export const BigStars = styled.div`
  display: inline-flex;
  gap: 2px;
  margin: 8px 0 4px;
  svg { width: 15px; height: 15px; }
`;

export const BigMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;

export const WeightedNote = styled.div`
  font-size: 10.5px;
  color: var(--text-muted);
  margin-top: 6px;
  line-height: 1.3;
  opacity: 0.7;
`;

export const DistBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const DistRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
`;

export const DistLvl = styled.span`
  width: 30px;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
  display: flex;
  align-items: center;
  gap: 3px;
  svg { width: 11px; height: 11px; }
`;

export const DistBar = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(114,125,131,0.14);
  border-radius: 6px;
  overflow: hidden;
`;

export const DistFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, var(--primary-deep), var(--primary-hover));
  border-radius: 6px;
`;

export const DistN = styled.span`
  width: 38px;
  text-align: right;
  color: var(--text-muted);
  font-family: 'Space Mono', monospace;
`;


export const Gate = styled.div<{ $variant: 'eligible' | 'locked' | 'reviewed' }>`
  padding: 16px 18px;
  border-radius: 12px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;

  ${({ $variant }) => {
    if ($variant === 'eligible')
      return css`background: rgba(31,158,87,0.14); border: 1px solid rgba(31,158,87,0.3);`;
    if ($variant === 'reviewed')
      return css`background: ${SURFACE2}; border: 1px solid ${LINE};`;
    return css`background: rgba(114,125,131,0.08); border: 1px solid ${LINE};`;
  }}
`;

export const GateIcon = styled.div<{ $variant: 'eligible' | 'locked' | 'reviewed' }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  svg { width: 19px; height: 19px; }

  ${({ $variant }) => {
    if ($variant === 'eligible')
      return css`background: rgba(31,158,87,0.2); color: var(--primary-hover);`;
    if ($variant === 'reviewed')
      return css`background: rgba(31,158,87,0.16); color: var(--primary-hover);`;
    return css`background: rgba(114,125,131,0.14); color: var(--text-muted);`;
  }}
`;

export const GateText = styled.div`
  flex: 1;
  strong { font-size: 14px; display: block; }
  small { font-size: 12.5px; color: var(--text-muted); }
`;

export const MyStars = styled.div`
  display: inline-flex;
  gap: 2px;
  margin-top: 3px;
  svg { width: 13px; height: 13px; }
`;

export const ReviewForm = styled.form`
  width: 100%;
  margin-top: 4px;
  display: grid;
  gap: 10px;
`;

export const StarsInput = styled.div`
  display: inline-flex;
  gap: 3px;
`;

export const StarInputButton = styled.button<{ $active: boolean }>`
  border: none;
  background: transparent;
  color: ${({ $active }) => $active ? 'var(--rating)' : 'rgba(114,125,131,0.45)'};
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0 1px;
`;

export const ReviewTextarea = styled.textarea`
  min-height: 82px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid ${LINE};
  background: rgba(12,19,16,0.58);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.45;
  padding: 10px 12px;

  &::placeholder { color: var(--text-muted); }
  &:focus {
    outline: none;
    border-color: rgba(31,158,87,0.45);
    box-shadow: 0 0 0 3px rgba(31,158,87,0.12);
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

export const InlineError = styled.p`
  color: #ff9f9f;
  font-size: 12px;
`;


export const ReviewsTitle = styled.div`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 14px;
`;

export const Review = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-top: 1px solid ${LINE};
  &:first-of-type { border-top: none; }
`;

export const ReviewAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #04130b;
  background: linear-gradient(135deg, var(--text-muted), #4a534f);
`;

export const ReviewBody = styled.div`
  flex: 1;
`;

export const ReviewHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  flex-wrap: wrap;

  strong { font-size: 13.5px; }
  .date { font-size: 11px; color: var(--text-muted); font-family: 'Space Mono', monospace; margin-left: auto; }
`;

export const ReviewStars = styled.div`
  display: inline-flex;
  gap: 1px;
  svg { width: 12px; height: 12px; }
`;

export const ReviewText = styled.p`
  font-size: 13px;
  color: #c4cec8;
  line-height: 1.5;
`;

export const EmptyState = styled.p`
  color: var(--text-muted);
  font-size: 13px;
  text-align: center;
  padding: 32px 0;
`;
