import styled, { css } from 'styled-components';

export const buttonBase = css`
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: 0.2s;
`;

export const ButtonPrimary = styled.button`
  ${buttonBase}
  background: var(--primary);
  color: var(--text-primary);
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;

  &:hover { background: var(--primary-hover); }
  &:disabled {
    background: var(--bg-disabled);
    color: var(--text-disabled);
    cursor: not-allowed;
  }
`;

export const ButtonSecondary = styled.button`
  ${buttonBase}
  background: transparent;
  border: 0.5px solid var(--glass-border);
  color: var(--text-secondary-mid);
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
`;

export const ButtonGlass = styled.button`
  ${buttonBase}
  background: var(--glass-bg);
  border: 0.5px solid var(--glass-border);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: var(--overlay-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`;
