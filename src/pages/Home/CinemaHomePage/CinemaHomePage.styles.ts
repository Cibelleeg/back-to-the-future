import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;
  background: var(--bg-primary);
  padding-top: 72px;
`;

export const Content = styled.div`
  padding: 36px 40px;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 12px;
  color: var(--text-muted);
  font-size: 15px;
`;

export const ErrorMessage = styled.p`
  color: #ff373e;
  font-size: 14px;
  max-width: 400px;
  text-align: center;
`;
