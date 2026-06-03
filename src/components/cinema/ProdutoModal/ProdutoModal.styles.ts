import styled from 'styled-components';

export const Modal = styled.section`
  position: relative;
  background: var(--bg-secondary);
  border: 0.5px solid var(--border-primary);
  border-radius: 16px;
  width: min(100%, 560px);
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  font-family: inherit;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--btn-overlay);
  color: var(--text-primary);
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  min-height: 220px;
  background: radial-gradient(circle, var(--primary-subtle), var(--bg-card) 65%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const Body = styled.div`
  padding: 24px;
`;

export const Title = styled.h2`
  font-family: "Bebas Neue", cursive;
  font-size: 34px;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const Description = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 18px;
`;

export const DetailCard = styled.div`
  background: var(--bg-card);
  border-radius: 10px;
  padding: 14px;

  span { display: block; color: var(--text-label); font-size: 11px; text-transform: uppercase; margin-bottom: 6px; }
  strong { color: var(--primary); font-size: 18px; }
`;

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span { color: var(--text-label); font-size: 11px; text-transform: uppercase; }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong { color: var(--text-primary); }
`;

export const QuantityButton = styled.button`
  font-family: inherit;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: var(--primary-transparent);
  color: var(--primary);
  font-size: 20px;
  cursor: pointer;

  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const Footer = styled.footer`
  padding: 16px 24px;
  border-top: 0.5px solid var(--border-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const AddButton = styled.button<{ $added?: boolean }>`
  font-family: inherit;
  background: ${({ $added }) => ($added ? 'var(--success-bg)' : 'var(--primary)')};
  border: ${({ $added }) => ($added ? '1px solid var(--success)' : 'none')};
  color: ${({ $added }) => ($added ? 'var(--success)' : 'var(--text-primary)')};
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
`;
