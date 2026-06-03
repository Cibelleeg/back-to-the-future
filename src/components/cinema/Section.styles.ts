import styled from 'styled-components';

export const Section = styled.section`
  margin-bottom: 48px;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div``;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

export const Title = styled.h2`
  font-family: "Bebas Neue", cursive;
  font-size: 22px;
  letter-spacing: 2px;
  color: var(--text-primary);
  margin: 0;
`;

export const SeeAll = styled.a`
  font-size: 15px;
  color: var(--primary);
  letter-spacing: 0.5px;
`;

export const Chips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Chip = styled.button<{ $active?: boolean }>`
  font-family: inherit;
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  border: 0.5px solid ${({ $active }) => ($active ? 'var(--primary)' : 'var(--border-surface)')};
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-secondary-dim)')};
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.18s;
`;

export const Empty = styled.p`
  color: var(--text-disabled);
  font-size: 14px;
  padding: 40px 0;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  display: inline-block;
`;

export const Line = styled.span`
  width: 36px;
  height: 2px;
  background: var(--primary);
  display: inline-block;
`;
