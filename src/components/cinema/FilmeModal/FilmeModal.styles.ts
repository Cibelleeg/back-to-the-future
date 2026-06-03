import styled from 'styled-components';

export const Modal = styled.section`
  background: var(--bg-secondary);
  border-radius: 16px;
  max-width: 720px;
  width: 100%;
  border: 0.5px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
`;

export const Poster = styled.img`
  width: 200px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const PosterGradient = styled.div`
  position: absolute;
  inset: 0;
  left: 140px;
  background: linear-gradient(90deg, var(--bg-secondary) 0%, transparent 60%);
  pointer-events: none;
`;

export const Info = styled.div`
  padding: 24px 24px 24px 80px;
  flex: 1;
  position: relative;
`;

export const CloseButton = styled.button`
  font-family: inherit;
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--btn-overlay);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: var(--text-primary);
  font-size: 16px;
  cursor: pointer;
`;

export const TagsRow = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-family: "Bebas Neue", cursive;
  font-size: 28px;
  color: var(--text-primary);
  margin: 0 0 8px;
`;

export const Synopsis = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 12px 0 0;
`;

export const Sessions = styled.div`
  padding: 20px 24px;
  border-top: 0.5px solid var(--border-secondary);
`;

export const SessionsTitle = styled.h3`
  font-family: "Bebas Neue", cursive;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--text-soft);
  margin: 0 0 12px;
`;

export const SessionsGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Footer = styled.footer`
  padding: 16px 24px;
  border-top: 0.5px solid var(--border-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
