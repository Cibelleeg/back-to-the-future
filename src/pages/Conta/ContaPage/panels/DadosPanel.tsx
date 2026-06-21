import { useState, useEffect } from 'react';
import { useUserInfo } from '../../../../hooks';
import { fetchMe, setUserInfo, updateUserProfile } from '../../../../services/api';
import { config } from '../../../../config';
import { isoToBrDate, parseBrDate, maskDate, maskCpf, maskPhone } from '../../../../utils/masks';
import type { UserInfo } from '../../../../services/api';
import * as S from '../ContaPage.styles';

function toForm(info: UserInfo | null) {
  return {
    nome: info?.name || '',
    cpf: info?.cpf ? maskCpf(info.cpf) : '',
    telefone: info?.phoneNumber ? maskPhone(info.phoneNumber) : '',
    nascimento: info?.birthDate ? isoToBrDate(info.birthDate) : '',
  };
}

export function DadosPanel() {
  const userInfo = useUserInfo();

  const [form, setForm] = useState(() => toForm(userInfo));
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (config.useMock) return;
    fetchMe()
      .then(data => { setUserInfo(data); setForm(toForm(data)); })
      .catch(() => {});
  }, []);

  const mask = (k: keyof typeof form, fn: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [k]: fn(e.target.value) }));

  const fields = [
    !!form.nome.trim() || !!userInfo?.name,
    !!userInfo?.email,
    !!form.cpf.trim(),
    !!form.telefone.trim(),
    !!form.nascimento.trim(),
  ];
  const labels = ['nome', 'e-mail', 'CPF', 'telefone', 'data de nascimento'];
  const pct = Math.round((fields.filter(Boolean).length / fields.length) * 100);
  const missing = labels.filter((_, i) => !fields[i]);

  async function handleSave() {
    if (config.useMock) {
      setStatus('saving');
      await new Promise(r => setTimeout(r, 600));
      const updated = { ...userInfo, email: userInfo?.email || '', name: form.nome.trim() || userInfo?.name };
      setUserInfo(updated);
      setForm(toForm(updated));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    if (!userInfo?.id) {
      setStatus('error');
      setErrorMsg('Sessão inválida. Faça login novamente.');
      return;
    }

    if (form.nascimento.trim() && !parseBrDate(form.nascimento.trim())) {
      setStatus('error');
      setErrorMsg('Data de nascimento inválida. Use DD/MM/AAAA.');
      return;
    }

    const payload: Record<string, string> = {};
    if (form.nome.trim())       payload.name        = form.nome.trim();
    if (form.cpf.trim())        payload.cpf         = form.cpf.replace(/\D/g, '');
    if (form.telefone.trim())   payload.phoneNumber  = form.telefone.replace(/\D/g, '');
    if (form.nascimento.trim()) payload.birthDate    = parseBrDate(form.nascimento.trim())!;

    setStatus('saving');
    setErrorMsg('');
    try {
      const updated = await updateUserProfile(userInfo.id, payload);
      setUserInfo(updated);
      setForm(toForm(updated));
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao salvar. Tente novamente.');
    }
  }

  return (
    <S.PanelWrap>
      <S.PanelHead>
        <h1>Meus dados</h1>
        <p>Mantenha seu cadastro completo para agilizar a compra dos seus ingressos.</p>
      </S.PanelHead>

      <S.ProgressCard>
        <S.ProgressRing $pct={pct}>
          <S.ProgressInner>{pct}%</S.ProgressInner>
        </S.ProgressRing>
        <S.ProgressText>
          <strong>{pct === 100 ? 'Perfil completo!' : 'Seu perfil está quase lá'}</strong>
          {missing.length > 0 ? (
            <p>
              Falt{missing.length > 1 ? 'am' : 'a'}{' '}
              <span className="warn">{missing.length} {missing.length === 1 ? 'campo' : 'campos'}</span>
              : {missing.join(', ')}. Complete para agilizar suas próximas compras.
            </p>
          ) : (
            <p>Todas as informações estão preenchidas. Obrigado!</p>
          )}
        </S.ProgressText>
      </S.ProgressCard>

      <S.FormCard>
        <S.FormSectionTitle>Dados pessoais</S.FormSectionTitle>
        <S.FormSub>Usados na emissão dos ingressos e no contato sobre suas sessões.</S.FormSub>
        <S.FormGrid>
          <S.Field $span2>
            <S.FieldLabel htmlFor="nome">
              Nome completo{' '}
              {form.nome.trim() || userInfo?.name ? <S.TagOk>✓ preenchido</S.TagOk> : <S.TagMissing>Faltando</S.TagMissing>}
            </S.FieldLabel>
            <S.Input
              id="nome" type="text" value={form.nome}
              onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
              placeholder="Seu nome completo" $empty={!form.nome.trim()}
            />
          </S.Field>

          <S.Field>
            <S.FieldLabel htmlFor="email">
              E-mail {userInfo?.email && <S.TagOk>✓ verificado</S.TagOk>}
            </S.FieldLabel>
            <S.Input id="email" type="email" value={userInfo?.email || ''} readOnly $readonly />
            <S.Help>Entre em contato com o suporte para alterar o e-mail.</S.Help>
          </S.Field>

          <S.Field>
            <S.FieldLabel htmlFor="cpf">
              CPF{' '}
              {form.cpf.trim() ? <S.TagOk>✓ preenchido</S.TagOk> : <S.TagMissing>Faltando</S.TagMissing>}
            </S.FieldLabel>
            <S.Input
              id="cpf" type="text" value={form.cpf}
              onChange={mask('cpf', maskCpf)}
              placeholder="000.000.000-00" inputMode="numeric" $empty={!form.cpf.trim()}
            />
          </S.Field>

          <S.Field>
            <S.FieldLabel htmlFor="telefone">
              Telefone{' '}
              {form.telefone.trim() ? <S.TagOk>✓ preenchido</S.TagOk> : <S.TagMissing>Faltando</S.TagMissing>}
            </S.FieldLabel>
            <S.Input
              id="telefone" type="tel" value={form.telefone}
              onChange={mask('telefone', maskPhone)}
              placeholder="(11) 90000-0000" inputMode="tel" $empty={!form.telefone.trim()}
            />
          </S.Field>

          <S.Field>
            <S.FieldLabel htmlFor="nascimento">
              Data de nascimento{' '}
              {form.nascimento.trim() ? <S.TagOk>✓ preenchido</S.TagOk> : <S.TagMissing>Faltando</S.TagMissing>}
            </S.FieldLabel>
            <S.Input
              id="nascimento" type="text" value={form.nascimento}
              onChange={mask('nascimento', maskDate)}
              placeholder="DD/MM/AAAA" inputMode="numeric" $empty={!form.nascimento.trim()}
            />
          </S.Field>
        </S.FormGrid>
      </S.FormCard>

      {status === 'error' && (
        <S.Help style={{ color: 'var(--error, #f87171)', marginBottom: 8 }}>{errorMsg}</S.Help>
      )}

      <S.FormActions>
        <S.BtnGhost
          type="button"
          disabled={status === 'saving'}
          onClick={() => { setForm(toForm(userInfo)); setStatus('idle'); }}
        >
          Cancelar
        </S.BtnGhost>
        <S.BtnPrimary type="button" disabled={status === 'saving'} onClick={handleSave}>
          {status === 'saving' ? 'Salvando…' : status === 'success' ? '✓ Salvo!' : 'Salvar alterações'}
        </S.BtnPrimary>
      </S.FormActions>
    </S.PanelWrap>
  );
}
