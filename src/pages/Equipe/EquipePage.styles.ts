import styled from 'styled-components';

const LINE = 'rgba(114,125,131,0.22)';

export const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px;
  background:
    radial-gradient(120% 55% at 50% -10%, rgba(33,90,54,0.30), transparent 60%),
    #0d0f0d;
  color: var(--text-primary);
  overflow-x: hidden;
`;

export const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(22px, 4vw, 40px) clamp(18px, 4vw, 28px) 90px;
`;

export const Hero = styled.section`
  max-width: 720px;
  padding: 56px 0 30px;
`;

export const Eyebrow = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6.5vw, 4.1rem);
  line-height: 1.03;
  letter-spacing: -0.035em;
  margin-bottom: 20px;
`;

export const Lede = styled.p`
  max-width: 54ch;
  color: var(--text-muted);
  font-size: 1.06rem;
  line-height: 1.6;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TeamRow = styled.article<{ $empty?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 54px 0;
  border-top: 1px solid ${LINE};

  &:nth-child(even) .photo-column {
    order: 1;
  }

  &:nth-child(even) .info-column {
    order: 2;
  }

  ${({ $empty }) => $empty && `
    h2,
    p {
      color: #727D83;
    }

    .member-role {
      background: none;
    }
  `}

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 40px 0;

    &:nth-child(even) .photo-column,
    &:nth-child(even) .info-column {
      order: 0;
    }
  }
`;

export const PhotoColumn = styled.div.attrs({ className: 'photo-column' })`
  order: 2;
`;

export const InfoColumn = styled.div.attrs({ className: 'info-column' })`
  order: 1;
`;

export const Photo = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid ${LINE};
  background: #101310;
  box-shadow: 0 28px 60px -32px rgba(0,0,0,0.85);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease, border-color .45s ease;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  &::after {
    content: '*';
    position: absolute;
    top: 14px;
    right: 16px;
    color: #34e07b;
    font-family: 'Space Mono', monospace;
    font-size: 1.15rem;
    opacity: 0;
    transform: scale(.6) rotate(-15deg);
    transition: opacity .35s ease, transform .35s ease;
  }

  ${TeamRow}:hover & {
    border-color: rgba(31,158,87,0.5);
    box-shadow: 0 38px 70px -30px rgba(31,158,87,0.45);
    transform: translateY(-6px);

    &::after {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }

  @media (max-width: 720px) {
    max-width: 340px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${TeamRow}:hover & {
      transform: none;
    }
  }
`;

export const EmptyPhoto = styled(Photo)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 2px dashed rgba(31,158,87,0.45);
  background: rgba(31,158,87,0.04);

  span {
    color: var(--primary);
    font-family: 'Space Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
  }
`;

export const Avatar = styled.svg`
  width: 34%;
  height: auto;
  opacity: .85;

  circle,
  path:first-of-type {
    fill: none;
    stroke: var(--primary);
    stroke-width: 2.4;
    stroke-dasharray: 4 5;
    stroke-linecap: round;
  }

  path:not(:first-of-type) {
    fill: var(--primary);
  }
`;

export const Role = styled.p.attrs({ className: 'member-role' })`
  display: inline-block;
  margin-bottom: 14px;
  padding: 0 2px;
  background: linear-gradient(transparent 62%, rgba(31,158,87,0.28) 0);
  color: var(--primary);
  font-family: 'Space Mono', monospace;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const Name = styled.h2`
  margin-bottom: 16px;
  color: var(--text-primary);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: clamp(1.9rem, 3.6vw, 2.6rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
`;

export const Bio = styled.p`
  max-width: 42ch;
  margin-bottom: 18px;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
`;

export const Github = styled.a`
  color: #727D83;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  transition: color .2s ease;

  &:hover,
  &:focus-visible {
    color: var(--primary);
  }
`;
