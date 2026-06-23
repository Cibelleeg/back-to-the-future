import styled, { keyframes } from 'styled-components';

const LINE = 'rgba(114,125,131,0.22)';

export const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px;
  background:
    radial-gradient(120% 60% at 50% -10%, rgba(33,90,54,0.28), transparent 60%),
    #0d0f0d;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
`;

export const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(22px, 4vw, 40px) clamp(18px, 4vw, 28px) 90px;
`;

export const Hero = styled.section`
  padding: 56px 0 50px;
  max-width: 720px;
`;

export const Eyebrow = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 18px;
`;

export const HeroTitle = styled.h1`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(2.4rem, 7vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin-bottom: 18px;
  color: var(--text-primary);
`;

export const HeroLede = styled.p`
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 52ch;
  line-height: 1.6;
`;

export const Snapshot = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border: 1px solid ${LINE};
  margin-bottom: 34px;
  background: ${LINE};

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const SnapshotItem = styled.div`
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.035);

  span {
    display: block;
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  strong {
    display: block;
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2rem);
    line-height: 1;
    color: var(--text-primary);
  }
`;

export const DomainPanel = styled.section`
  padding: 28px 0 42px;
  border-top: 1px solid ${LINE};
`;

export const PanelTitle = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 18px;
`;

export const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 880px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const DomainCard = styled.div`
  border: 1px solid ${LINE};
  background: rgba(255, 255, 255, 0.035);
  padding: 16px;
  border-radius: 8px;

  strong {
    display: block;
    color: var(--primary);
    font-family: 'Space Mono', monospace;
    font-size: 0.82rem;
    margin-bottom: 8px;
  }

  span {
    display: block;
    color: var(--text-muted);
    font-size: 0.92rem;
    line-height: 1.5;
  }
`;

export const CinemaList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CinemaRow = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  padding: 56px 0;
  border-top: 1px solid ${LINE};

  &:nth-child(even) .screen-col {
    order: 2;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 44px 0;

    &:nth-child(even) .screen-col {
      order: 0;
    }
  }
`;

const screenFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

export const ScreenCol = styled.div`
  perspective: 1200px;
`;

export const Screen = styled.div`
  position: relative;
  aspect-ratio: 2.39 / 1;
  border-radius: 4px;
  border: 1px solid rgba(31,158,87,0.35);
  background:
    radial-gradient(140% 160% at 50% 120%, rgba(31,158,87,0.40), transparent 58%),
    linear-gradient(180deg, #0a0c0a 0%, #10140f 100%);
  overflow: hidden;
  box-shadow:
    0 30px 70px -34px rgba(31,158,87,0.55),
    inset 0 1px 0 rgba(255,255,255,0.04);
  transition: transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.5s ease;

  ${CinemaRow}:hover & {
    transform: translateY(-6px);
    box-shadow:
      0 40px 80px -30px rgba(31,158,87,0.7),
      inset 0 1px 0 rgba(255,255,255,0.06);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 40%, rgba(236,239,234,0.06) 50%, transparent 60%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(180deg, transparent 0 3px, rgba(0,0,0,0.18) 3px 4px);
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${CinemaRow}:hover & {
      animation: ${screenFloat} 3s ease-in-out infinite;
    }
  }
`;

export const CodeList = styled.div`
  position: absolute;
  inset: auto 18px 46px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;

  span {
    width: fit-content;
    max-width: 100%;
    padding: 5px 8px;
    border: 1px solid rgba(31,158,87,0.34);
    border-radius: 6px;
    background: rgba(5, 10, 7, 0.78);
    color: rgba(236,239,234,0.88);
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.58rem, 1.5vw, 0.72rem);
    overflow-wrap: anywhere;
  }
`;

export const ScreenLabel = styled.span`
  position: absolute;
  left: 18px;
  bottom: 16px;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(236,239,234,0.85);
  z-index: 2;

  b {
    color: var(--primary);
    font-weight: 700;
  }
`;

export const Info = styled.div``;

export const Campus = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
`;

export const CinemaName = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--text-primary);
`;

export const Story = styled.p`
  color: var(--text-muted);
  font-size: 0.97rem;
  line-height: 1.65;
  margin-bottom: 22px;
`;

export const RuleList = styled.ul`
  display: grid;
  gap: 9px;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    padding-left: 18px;
    color: rgba(236,239,234,0.82);
    line-height: 1.5;
    font-size: 0.94rem;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--primary);
  }
`;

export const Meta = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  border-top: 1px solid ${LINE};
  margin: 0;
  padding: 0;
`;

export const MetaItem = styled.div`
  flex: 1;
  min-width: 90px;
  padding: 13px 14px 13px 0;
`;

export const MetaLabel = styled.dt`
  font-family: 'Space Mono', monospace;
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 5px;
`;

export const MetaValue = styled.dd`
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-primary);
  margin: 0;
`;

export const Pitch = styled.section`
  margin-top: 38px;
  padding: 28px;
  border: 1px solid rgba(31,158,87,0.34);
  border-radius: 8px;
  background: rgba(31,158,87,0.08);

  p {
    color: rgba(236,239,234,0.84);
    line-height: 1.7;
    font-size: 1rem;
    max-width: 82ch;
  }
`;

export const TalkingList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 18px;
    color: var(--text-muted);
    line-height: 1.5;
    font-size: 0.94rem;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.68em;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--primary);
  }
`;
