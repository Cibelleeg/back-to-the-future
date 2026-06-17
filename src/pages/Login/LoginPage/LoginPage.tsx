import { useState, useMemo, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as S from './LoginPage.styles';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Estados de Controle da Tela
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados dos Campos do Formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Estados de Erro (Validação)
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Verifica o hash da URL para abrir no modo correto (/login#cadastrar)
    useEffect(() => {
        if (location.hash.includes('cadastr')) {
            setMode('signup');
        }
    }, [location.hash]);

    // Função para alternar as abas limpando os erros locais e atualizando a URL de forma amigável
    const handleModeChange = (newMode: 'login' | 'signup') => {
        setMode(newMode);
        setErrors({});
        window.location.hash = newMode === 'signup' ? 'cadastrar' : 'entrar';
    };

    // Validador simples de e-mail
    const isEmailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

    // Cálculo dinâmico da força da senha (useMemo para recalcular apenas se a senha mudar)
    const passStrength = useMemo(() => {
        if (!password) return 0;
        let s = 0;
        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
        if (/\d/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return Math.max(1, s);
    }, [password]);

    // Disparo do envio do formulário
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        let ok = true;
        const newErrors: Record<string, boolean> = {};

        if (mode === 'signup' && name.trim().length < 2) {
            newErrors.name = true;
            ok = false;
        }
        if (!isEmailValid(email)) {
            newErrors.email = true;
            ok = false;
        }
        if (mode === 'login' && password.length < 1) {
            newErrors.password = true;
            ok = false;
        }
        if (mode === 'signup' && password.length < 8) {
            newErrors.password = true;
            ok = false;
        }

        if (!ok) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 1400);
    };

    const clearError = (field: string) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };

    return (
        <S.ContainerPage>
            {/* Painel Visual (Esquerda) */}
            <S.Stage>
                <S.Brand as={Link} to="/">
                    <S.BrandDot />
                    CINE<b>FESP</b>
                </S.Brand>

                <S.Pitch>
                    <h1>Bem-vindo<br />à sua sala.</h1>
                    <p>Compre ingressos, pule a fila da bomboniere e acumule pontos no Clube CINEFESP.</p>
                    <S.PostersContainer>
                        <div className="p">🎬</div>
                        <div className="p">🍿</div>
                        <div className="p">🎟️</div>
                    </S.PostersContainer>
                </S.Pitch>

                <S.Perk>
                    <span className="ic">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z" />
                        </svg>
                    </span>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '16px' }}>
                        Membros do{' '}
                        <Link to="/#clube" className="link" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                            Clube
                        </Link>{' '}
                        ganham 1 pipoca grátis por mês.
                    </p>
                </S.Perk>
            </S.Stage>

            {/* Formulário (Direita) */}
            <S.Panel>
                <S.PanelInner>
                    <S.BackLink as={Link} to="/">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Voltar ao início
                    </S.BackLink>

                    <S.Title>{mode === 'login' ? 'Entrar na conta' : 'Criar sua conta'}</S.Title>
                    <S.SubTitle>
                        {mode === 'login'
                            ? 'Que bom te ver de novo. Acesse para continuar.'
                            : 'Leva menos de um minuto e já libera o Clube.'}
                    </S.SubTitle>

                    {/* Abas Deslizantes */}
                    <S.TabsContainer $isSignup={mode === 'signup'}>
                        <span className="ind"></span>
                        <button type="button" className={`tab ${mode === 'login' ? 'on' : ''}`} onClick={() => handleModeChange('login')}>
                            Entrar
                        </button>
                        <button type="button" className={`tab ${mode === 'signup' ? 'on' : ''}`} onClick={() => handleModeChange('signup')}>
                            Cadastrar
                        </button>
                    </S.TabsContainer>

                    <S.FormContainer onSubmit={handleSubmit} noValidate>
                        {/* Campo Nome completo - Apenas no Cadastro */}
                        {mode === 'signup' && (
                            <S.Field className={errors.name ? 'err' : ''}>
                                <label>Nome completo</label>
                                <S.InputWrapper>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
                                    </svg>
                                    <input
                                        type="text"
                                        name="nome"
                                        placeholder="Seu nome"
                                        autoComplete="name"
                                        value={name}
                                        onChange={e => { setName(e.target.value); clearError('name'); }}
                                    />
                                </S.InputWrapper>
                                <span className="msg">Informe seu nome.</span>
                            </S.Field>
                        )}

                        {/* Campo E-mail */}
                        <S.Field className={errors.email ? 'err' : ''}>
                            <label>E-mail</label>
                            <S.InputWrapper>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="voce@email.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); clearError('email'); }}
                                />
                            </S.InputWrapper>
                            <span className="msg">Informe um e-mail válido.</span>
                        </S.Field>

                        {/* Campo Senha */}
                        <S.Field className={errors.password ? 'err' : ''}>
                            <label>Senha</label>
                            <S.InputWrapper>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha"
                                    placeholder={mode === 'signup' ? 'Mínimo 8 caracteres' : '••••••••'}
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); clearError('password'); }}
                                />

                                <S.EyeButton type="button" aria-label="Mostrar senha" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                            <path d="M2 12s3.5-7 10-7c2 0 3.8.6 5.3 1.5M22 12s-3.5 7-10 7c-2 0-3.8-.6-5.3-1.5" /><path d="m4 4 16 16" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </S.EyeButton>
                            </S.InputWrapper>

                            {/* Medidor de força de senha - Apenas no Cadastro */}
                            {mode === 'signup' && (
                                <S.StrengthMeter data-level={passStrength}><i></i><i></i><i></i><i></i></S.StrengthMeter>
                            )}
                            <span className="msg">{mode === 'signup' ? 'A senha precisa de pelo menos 8 caracteres.' : 'Digite sua senha.'}</span>
                        </S.Field>

                        {/* Rodapé do Formulário Dinâmico */}
                        {mode === 'login' ? (
                            <S.FormRow>
                                <label className="check">
                                    <input type="checkbox" />
                                    <span className="box">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    Lembrar de mim
                                </label>
                                <Link to="#" className="link">Esqueci a senha</Link>
                            </S.FormRow>
                        ) : (
                            <S.FormRow>
                                <label className="check">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={termsAccepted}
                                        onChange={e => setTermsAccepted(e.target.checked)}
                                    />
                                    <span className="box">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <span>
                                        Li e aceito os <Link to="#" className="link">termos de uso</Link>.
                                    </span>
                                </label>
                            </S.FormRow>
                        )}

                        {/* Botão de Envio */}
                        <S.SubmitBtn type="submit" disabled={isLoading}>
                            {isLoading
                                ? (mode === 'login' ? 'Entrando…' : 'Criando conta…')
                                : (mode === 'login' ? 'Entrar' : 'Criar conta')}
                        </S.SubmitBtn>

                        {/* Divisor Social - Apenas no Login */}
                        {mode === 'login' && (
                            <>
                                <S.Divider>ou continue com</S.Divider>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '4px' }}>
                                    <S.SocialBtn type="button">
                                        <svg viewBox="0 0 24 24">
                                            <path fill='var(--bg-primary)' d="M21.8 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z" opacity=".9" />
                                            <path fill='var(--primary)' d="M12 22c2.7 0 4.9-.9 6.6-2.4l-3.3-2.6c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
                                        </svg>
                                        Google
                                    </S.SocialBtn>
                                </div>
                            </>
                        )}
                    </S.FormContainer>

                    <S.SwitchHintParagraph>
                        {mode === 'login' ? 'Ainda não tem conta? ' : 'Já é membro? '}
                        <button type="button" onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}>
                            {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
                        </button>
                    </S.SwitchHintParagraph>
                </S.PanelInner>
            </S.Panel>
        </S.ContainerPage>
    );
}