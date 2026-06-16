import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './LoginPage.styles';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Estados de Controle da Tela
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [isLoading, setIsLoading] = useState(false);

    // Estados dos Campos do Formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estados de Erro (Validação)
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // Verifica o hash da URL para abrir no modo correto (/login#cadastrar)
    useEffect(() => {
        if (location.hash.includes('cadastr')) {
            setMode('signup');
        }
    }, [location.hash]);

    // Função para alternar as abas limpando os erros locais
    const handleModeChange = (newMode: 'login' | 'signup') => {
        setMode(newMode);
        setErrors({});
    };

    // Validador simples de e-mail
    const isEmailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

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

        // Simulação da chamada da API do Backend (pulp-fiction)
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 1400);
    };

    return (
        <S.LoginMain>
            <S.LoginContent>
                <S.Title>{mode === 'login' ? 'Entrar na conta' : 'Criar sua conta'}</S.Title>
                <S.SubTitle>
                    {mode === 'login'
                        ? 'Que bom te ver de novo. Acesse para continuar.'
                        : 'Leva menos de um minuto para se cadastrar.'}
                </S.SubTitle>

                <S.FormContainer onSubmit={handleSubmit} noValidate>
                    {/* Exibe o campo Nome apenas se for Cadastro */}
                    {mode === 'signup' && (
                        <S.Field className={errors.name ? 'err' : ''}>
                            <label>Nome completo</label>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                autoComplete="name"
                                value={name}
                                onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: false })); }}
                            />
                        </S.Field>
                    )}

                    {/* Campo de E-mail comum a ambos os modos */}
                    <S.Field className={errors.email ? 'err' : ''}>
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="voce@email.com"
                            autoComplete="email"
                            value={email}
                            onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: false })); }}
                        />
                    </S.Field>

                    {/* Campo de Senha comum a ambos os modos */}
                    <S.Field className={errors.password ? 'err' : ''}>
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder={mode === 'signup' ? 'Mínimo 8 caracteres' : '••••••••'}
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                            value={password}
                            onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: false })); }}
                        />
                    </S.Field>

                    <S.SubmitBtn type="submit" disabled={isLoading}>
                        {isLoading ? (mode === 'login' ? 'Entrando…' : 'Criando conta…') : (mode === 'login' ? 'Entrar' : 'Criar conta')}
                    </S.SubmitBtn>
                </S.FormContainer>

                <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', marginTop: '20px' }}>
                    {mode === 'login' ? 'Ainda não tem conta? ' : 'Já é membro? '}
                    <button type="button" onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}>
                        {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
                    </button>
                </p>
            </S.LoginContent>
        </S.LoginMain>
    );
}