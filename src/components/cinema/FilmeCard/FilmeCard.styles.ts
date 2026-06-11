import styled from 'styled-components';
export { Card, Poster, Classification, Overlay, OverlayTitle, Tags } from '../MovieCard.styles';

export const Rating = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--overlay-soft);
  border-radius: 5px;
  padding: 3px 7px;
  color: var(--rating);
  font-size: 11px;
  font-weight: 600;
`;

export const NextSession = styled.p`
  font-size: 11px;
  color: var(--primary);
  font-weight: 600;
  margin: 0 0 8px;
`;

export const Action = styled.span`
  display: block;
  background: var(--primary);
  border-radius: 6px;
  padding: 6px 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
`;
