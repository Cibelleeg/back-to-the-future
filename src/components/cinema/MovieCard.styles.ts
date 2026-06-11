import styled from 'styled-components';

export const Card = styled.article`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 2 / 3;
  background: var(--bg-card);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 24px 48px var(--shadow-primary), 0 0 0 1px var(--primary-border);
    z-index: 2;
  }
  &:hover > div:last-child { opacity: 1; transform: translateY(0); }
`;

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Classification = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  inset-inline: 0;
  padding: 48px 12px 14px;
  background: linear-gradient(0deg, var(--overlay-dark) 0%, transparent 100%);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
`;

export const OverlayTitle = styled.h3`
  font-family: "Bebas Neue", cursive;
  font-size: 14px;
  color: var(--text-primary);
  margin: 0 0 6px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;
