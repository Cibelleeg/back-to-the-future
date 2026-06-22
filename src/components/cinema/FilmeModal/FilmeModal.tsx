import { useState } from 'react';
import type { Filme, Sessao } from '../../../types/cinema';
import { formataDuracao, formataDataHoje, formataPreco } from '../../../utils/formatters';
import { ModalBackdrop, ButtonPrimary, ButtonSecondary } from '../../../styles/shared';
import { Badge } from '../../ui/Badge';
import { StarRating } from '../../ui/StarRating';
import { SessaoButton } from '../SessaoButton';
import * as S from './FilmeModal.styles';

interface FilmeModalProps {
  filme: Filme;
  sessoes: Sessao[];
  onClose: () => void;
  onBuy: (filme: Filme, sessao: Sessao) => void;
}

export function FilmeModal({ filme, sessoes, onClose, onBuy }: FilmeModalProps) {
  const [sessaoSelecionada, setSessaoSelecionada] = useState<Sessao | null>(null);

  return (
    <ModalBackdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Poster src={filme.poster} alt={filme.titulo} />
          <S.Info>
            <S.CloseButton onClick={onClose}>✕</S.CloseButton>

            <S.TagsRow>
              <Badge label={`${filme.classificacao} anos`} />
              <Badge label={filme.genero} />
              <Badge label={formataDuracao(filme.duracao)} />
            </S.TagsRow>

            <S.Title>{filme.titulo}</S.Title>
            <StarRating rating={filme.nota} />
            <S.Synopsis>{filme.sinopse}</S.Synopsis>
          </S.Info>
        </S.Header>

        <S.Sessions>
          <S.SessionsTitle>Sessões — {formataDataHoje()}</S.SessionsTitle>
          <S.SessionsGrid>
            {sessoes.map((sessao) => (
              <SessaoButton
                key={sessao.idSessao}
                sessao={sessao}
                selecionada={sessaoSelecionada}
                onSelect={setSessaoSelecionada}
              />
            ))}
          </S.SessionsGrid>
        </S.Sessions>

        <S.Footer>
          <ButtonSecondary onClick={onClose}>Fechar</ButtonSecondary>
          <ButtonPrimary
            disabled={!sessaoSelecionada}
            onClick={() => sessaoSelecionada && onBuy(filme, sessaoSelecionada)}
          >
            {sessaoSelecionada ? `Adicionar ao carrinho — ${formataPreco(sessaoSelecionada.precoBase)}` : 'Selecione uma sessão'}
          </ButtonPrimary>
        </S.Footer>
      </S.Modal>
    </ModalBackdrop>
  );
}
