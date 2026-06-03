import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  height: 320px;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid var(--border-soft);
`;

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: blur(12px);
`;

export const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--hero-gradient-start) 30%, var(--hero-gradient-end) 100%);
`;

export const Content = styled.div`
  position: relative;
  padding: 0 40px;
  max-width: 560px;
`;

export const Title = styled.h1`
  font-family: "Bebas Neue", cursive;
  font-size: 52px;
  color: var(--text-primary);
  letter-spacing: 2px;
  margin: 8px 0 12px;
  line-height: 1;
`;

export const Synopsis = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 20px;
  max-width: 440px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ButtonPrimaryLarge = styled.button`
  font-family: inherit;
  cursor: pointer;
  background: var(--primary);
  border: none;
  color: var(--text-primary);
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;

  &:hover { background: var(--primary-hover); }
`;
