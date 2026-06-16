import styled from 'styled-components';
import { Main, Content } from '../../../pages/Home/CinemaHomePage/CinemaHomePage.styles';
import { ButtonPrimary } from '../../../styles/shared';

// Reaproveita o Main da Home (com o mesmo background e padding-top)
export const LoginMain = styled(Main)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Reaproveita o Content da Home para envelopar o card de login
export const LoginContent = styled(Content)`
  width: 100%;
  max-width: 400px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 40px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
`;

export const SubTitle = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 24px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
  }

  input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    color: var(--text-primary);
    padding: 12px 14px;
    outline: none;
    
    &:focus {
      border-color: var(--primary-glow-border);
    }
  }
`;

export const SubmitBtn = styled(ButtonPrimary)`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
`;