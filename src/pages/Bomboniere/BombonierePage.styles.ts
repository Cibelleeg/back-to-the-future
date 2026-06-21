import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  background: var(--bg-page, #0a0a0f);
  color: #fff;
  padding-top: 72px;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 4px;
  }

  p {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin: 0;
  }
`;

export const SessaoBanner = styled.div<{ $linked: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 32px;
  background: ${({ $linked }) =>
    $linked
      ? 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(139,92,246,0.08))'
      : 'rgba(255,255,255,0.04)'};
  border: 1px solid ${({ $linked }) =>
    $linked ? 'rgba(168,85,247,0.35)' : 'rgba(255,255,255,0.08)'};
`;

export const BannerIcon = styled.div<{ $linked: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  background: ${({ $linked }) =>
    $linked ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.06)'};
`;

export const BannerBody = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
  }
`;

export const BannerAction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const BtnOutline = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
  background: transparent;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: rgba(255,255,255,0.3);
    color: #fff;
  }
`;

export const BtnPurple = styled(BtnOutline)`
  border-color: rgba(168,85,247,0.5);
  color: rgba(168,85,247,1);

  &:hover {
    border-color: rgba(168,85,247,0.8);
    color: rgba(168,85,247,1);
  }
`;

export const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.25);
  }
`;

export const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const Chip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => $active ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.12)'};
  background: ${({ $active }) => $active ? 'rgba(168,85,247,0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? 'rgba(168,85,247,1)' : 'rgba(255,255,255,0.6)'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: rgba(168,85,247,0.4);
    color: #fff;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
`;

export const Empty = styled.div`
  text-align: center;
  padding: 64px 0;
  color: rgba(255,255,255,0.3);
  font-size: 15px;
`;
