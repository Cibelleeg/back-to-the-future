import styled, { css, keyframes } from 'styled-components';

const pop = keyframes`
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.28); }
`;

const LINE = 'rgba(255,255,255,0.07)';

export const Card = styled.article`
  background: var(--bg-secondary);
  border: 1px solid ${LINE};
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.18s, box-shadow 0.18s;

  &:hover {
    border-color: var(--primary-border);
    box-shadow: 0 8px 28px -12px rgba(31,158,87,0.25);
  }
`;

export const ImageBox = styled.div`
  background: var(--bg-card);
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;

  ${Card}:hover & { transform: scale(1.04); }
`;

export const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, var(--primary-deep), #0a1a11);
`;

export const Body = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

export const Name = styled.h3`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
`;

export const Desc = styled.p`
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Variants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const VariantRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DimLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const Opts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const Opt = styled.button<{ $active: boolean }>`
  padding: 4px 11px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.13s, border-color 0.13s, color 0.13s;

  ${({ $active }) => $active ? css`
    background: rgba(31,158,87,0.18);
    border: 1px solid rgba(31,158,87,0.5);
    color: var(--primary-hover);
  ` : css`
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-muted);
    &:hover { border-color: rgba(255,255,255,0.22); color: var(--text-primary); }
  `}
`;

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid ${LINE};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Price = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--primary-hover);
`;

export const AddWrapper = styled.div<{ $on: boolean }>`
  position: relative;
  height: 36px;
`;

export const AddMain = styled.button<{ $on: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 9px;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #04130b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  background: linear-gradient(180deg, var(--green), var(--green-deep));
  box-shadow: 0 4px 14px -6px var(--green-glow);
  transition: opacity 0.22s, transform 0.26s cubic-bezier(.2,.8,.2,1), box-shadow 0.22s;

  opacity: ${({ $on }) => ($on ? 0 : 1)};
  transform: ${({ $on }) => ($on ? 'scale(.85)' : 'none')};
  pointer-events: ${({ $on }) => ($on ? 'none' : 'auto')};

  &:disabled { opacity: 0.35; cursor: default; }
  &:not(:disabled):hover { box-shadow: 0 6px 20px -6px var(--green-glow); }

  svg { width: 14px; height: 14px; }
`;

export const AddStep = styled.div<{ $on: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px;
  background: var(--green-soft);
  border: 1px solid var(--green-border);
  transition: opacity 0.22s, transform 0.26s cubic-bezier(.2,.8,.2,1);

  opacity: ${({ $on }) => ($on ? 1 : 0)};
  transform: ${({ $on }) => ($on ? 'scale(1)' : 'scale(.85)')};
  pointer-events: ${({ $on }) => ($on ? 'auto' : 'none')};
`;

export const StepBtn = styled.button`
  width: 32px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--green);
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s;

  &:hover  { background: rgba(31,158,87,0.18); }
  &:active { transform: scale(.88); }
`;

export const QtyCount = styled.span<{ $pop: boolean }>`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 24px;
  text-align: center;
  animation: ${({ $pop }) => ($pop ? pop : 'none')} 0.15s ease;
`;
