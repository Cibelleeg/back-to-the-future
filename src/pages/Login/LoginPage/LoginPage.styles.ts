import styled, { keyframes } from 'styled-components';
import { ButtonPrimary, ButtonGlass } from '../../../styles/shared';

// ---------------- Animations ----------------
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(.8); }
`;

const fade = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
`;

// ---------------- Styled Components ----------------

export const ContainerPage = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: var(--bg-primary);
  color: var(--text-secondary);

  @media(max-width: 900px) {
    flex-direction: column;
  }
`;

export const Stage = styled.section`
  flex: 1;
  position: relative;
  overflow: hidden;
  padding: 46px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:
    radial-gradient(900px 600px at 20% 10%, var(--primary-subtle), transparent 60%),
    radial-gradient(700px 500px at 90% 90%, var(--success-bg), transparent 55%),
    linear-gradient(160deg, var(--hero-gradient-start), var(--hero-gradient-end));

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: .05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  @media(max-width: 900px) {
    display: none;
  }
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -.04em;
  position: relative;
  z-index: 1;
  text-decoration: none;
  color: var(--text-primary);
  
  b { color: var(--primary); }
`;

export const BrandDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 12px 1px var(--primary-shadow);
  animation: ${pulse} 2.6s ease-in-out infinite;
`;

export const Pitch = styled.div`
  position: relative;
  z-index: 1;
  max-width: 420px;

  h1 {
    font-size: 42px;
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -.03em;
    margin-bottom: 16px;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1.6;
  }
`;

export const PostersContainer = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 34px;

  .p {
    width: 74px;
    height: 104px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    font-size: 30px;
    border: 1px solid var(--border-primary);
    box-shadow: 0 18px 40px -20px #000;
    transition: transform .35s;

    &:nth-child(1) { background: linear-gradient(160deg, var(--success), var(--success-bg)); transform: rotate(-6deg); }
    &:nth-child(2) { background: linear-gradient(160deg, #3a6f88, #16323f); margin-top: -8px; }
    &:nth-child(3) { background: linear-gradient(160deg, #7a5a8c, #2e2238); transform: rotate(6deg); }
  }

  &:hover .p {
    transform: rotate(0) translateY(-4px);
  }
`;

export const Perk = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 11px;
  color: var(--text-muted);
  font-size: 14px;

  .ic {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--primary-transparent);
    display: grid;
    place-items: center;
    color: var(--primary);
    flex-shrink: 0;
    svg { width: 18px; height: 18px; }
  }

  p {
    font-size: 15px;
    color: var(--text-muted);
    margin-top: 16px;
  }

  a.link {
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
  }
`;

export const Panel = styled.section`
  width: min(480px, 46%);
  
  /* ALTERADO: Trocando o cinza-azulado pelo preto do app */
  background: #060706; 
  
  border-left: 1px solid var(--border-primary);
  padding: 46px clamp(28px, 4vw, 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media(max-width: 900px) {
    width: 100%;
    border-left: none;
    flex: 1;
  }
`;
export const PanelInner = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

export const BackLink = styled.a`
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  transition: color .2s;
  
  svg { width: 15px; height: 15px; }
  &:hover { color: var(--text-primary); }
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -.02em;
  margin-bottom: 6px;
  color: var(--text-primary);
`;

export const SubTitle = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 26px;
`;

export const TabsContainer = styled.div<{ $isSignup: boolean }>`
  position: relative;
  display: flex;
  background: var(--surface);
  border: 1px solid var(--border-secondary);
  border-radius: 13px;
  padding: 5px;
  margin-bottom: 26px;

  .ind {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 5px;
    width: calc(50% - 5px);
    border-radius: 9px;
    background: linear-gradient(180deg, var(--primary), var(--primary-deep));
    box-shadow: 0 6px 16px -8px var(--primary-shadow);
    transition: transform .3s cubic-bezier(.2, .8, .2, 1);
    transform: ${props => props.$isSignup ? 'translateX(100%)' : 'translateX(0)'};
  }

  .tab {
    flex: 1;
    position: relative;
    z-index: 1;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
    padding: 10px;
    transition: color .25s;
    
    &.on { color: var(--text-primary); }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: ${fade} .35s ease;
`;

export const Field = styled.div`
  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    margin-bottom: 7px;
  }

  .msg {
    font-size: 12px;
    color: #ff373e;
    margin-top: 6px;
    display: none;
  }

  &.err {
    animation: ${shake} .35s;
    input {
      border-color: #ff373e;
      box-shadow: 0 0 0 4px rgba(255, 90, 95, 0.14);
    }
    .msg { display: block; }
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center; /* Centraliza nativamente tudo o que estiver aqui dentro (input e botão) */
  background: var(--surface);
  border: 1px solid var(--border-secondary);
  border-radius: 10px;
  transition: border-color .2s, box-shadow .2s, background .2s;

  &:focus-within {
    border-color: var(--primary-glow-border);
    box-shadow: 0 0 0 4px var(--primary-transparent);
    background: var(--surface-hover);

    svg {
      color: var(--primary);
    }
  }

  /* O primeiro SVG (o cadeado ou e-mail) fica fixo na esquerda */
  > svg {
    position: absolute;
    left: 14px;
    width: 17px;
    height: 17px;
    color: var(--text-muted);
    transition: color .2s;
    pointer-events: none;
  }

  input {
    width: 100%;
    background: none; /* Remove o fundo do input para usar o do Wrapper */
    border: none;     /* Remove a borda do input para usar o do Wrapper */
    color: var(--text-primary);
    font-family: inherit;
    font-size: 14px;
    padding: 13px 42px 13px 42px; /* Garante espaço igual nas duas pontas (cadeado e olho) */
    outline: none;

    &::placeholder { color: var(--text-soft); }
  }
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 12px; /* Mantém o recuo fixo da direita */
  
  /* REMOVIDO: top e transform que quebravam o alinhamento em alguns navegadores */
  
  width: 30px;  
  height: 30px; 
  
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;   
  border-radius: 50%; 
  
  /* Alinhamento robusto via Grid */
  display: grid;
  place-items: center;
  
  transition: color 0.2s, background-color 0.2s;
  z-index: 2;

  svg {
    width: 18px; 
    height: 18px;
    display: block;
    pointer-events: none;
  }

  &:hover {
    color: var(--text-primary);
    background-color: var(--surface-hover); 
  }
`;

export const StrengthMeter = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 9px;
  
  i {
    height: 4px;
    flex: 1;
    border-radius: 3px;
    background: var(--border-primary);
    transition: background .25s;
  }

  &[data-level="1"] i:nth-child(1) { background: #ff373e; }
  &[data-level="2"] i:nth-child(-n+2) { background: #f5c842; }
  &[data-level="3"] i:nth-child(-n+3) { background: var(--primary); }
  &[data-level="4"] i { background: var(--primary); }
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

  .check {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    cursor: pointer;
    user-select: none;
    input { position: absolute; opacity: 0; }
  }

  .box {
    width: 18px;
    height: 18px;
    border-radius: 6px;
    border: 1.5px solid var(--border-primary);
    display: grid;
    place-items: center;
    transition: .2s;
    svg { width: 12px; height: 12px; color: #fff; opacity: 0; transform: scale(.5); transition: .2s; }
  }

  .check input:checked + .box {
    background: var(--primary);
    border-color: var(--primary);
    svg { opacity: 1; transform: scale(1); }
  }

  .link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`;

export const SubmitBtn = styled(ButtonPrimary)`
  margin-top: 6px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  box-shadow: 0 8px 22px -8px var(--primary-shadow);
  transition: transform .12s, box-shadow .25s, background-color 0.2s;

  &:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 14px 30px -8px var(--primary-shadow); 
  }
  &:active { transform: translateY(0) scale(.98); }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-muted);
  font-size: 12px;
  margin: 4px 0;
  &::before, &::after { content: ""; flex: 1; height: 1px; background: var(--border-primary); }
`;

export const SocialBtn = styled(ButtonGlass)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  width: 100%;
  max-width: 160px; /* TRANSFORMAÇÃO: Limita o tamanho do botão para ele ficar pequeno */
  
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  background: var(--surface);
  border: 1px solid var(--border-secondary);
  border-radius: 10px;
  color: var(--text-primary);
  transition: all 0.2s ease;
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  
  &:hover { 
    background: var(--surface-hover); 
    border-color: var(--border-glass-hover);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SocialBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
`;

export const ApiError = styled.p`
  font-size: 13px;
  color: #ff373e;
  text-align: center;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(255, 55, 62, 0.08);
  border: 1px solid rgba(255, 55, 62, 0.2);
`;

export const TermsError = styled.span`
  font-size: 12px;
  color: #ff373e;
  display: block;
  margin-top: -8px;
`;

export const SwitchHintParagraph = styled.p`
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 20px;
  
  button {
    background: none;
    border: none;
    color: var(--primary);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;