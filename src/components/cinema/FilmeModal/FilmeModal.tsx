import { useEffect, useMemo, useState } from 'react';
import type { Assento, Filme, Sessao, TipoIngresso } from '../../../types/cinema';
import { fetchAssentosBySessao } from '../../../services/api';
import { config } from '../../../config';
import { formataDuracao, formataDataHoje, formataPreco } from '../../../utils/formatters';
import { ModalBackdrop, ButtonPrimary, ButtonSecondary } from '../../../styles/shared';
import { Badge } from '../../ui/Badge';
import { StarRating } from '../../ui/StarRating';
import { SessaoButton } from '../SessaoButton';
import * as S from './FilmeModal.styles';

const POLL_INTERVAL = 15_000;

function mockAssentos(sessao: Sessao, seed: Assento[]): Assento[] {
  // Em modo mock mantém os mesmos IDs mas rerandimiza ocupação a cada poll
  if (seed.length > 0) {
    return seed.map(a => ({ ...a, ocupado: a.ocupado || Math.random() < 0.03 }));
  }
  const filas = ['A', 'B', 'C', 'D', 'E'];
  return filas.flatMap((fila, fi) =>
    Array.from({ length: 10 }, (_, i) => ({
      idAssento: (fi * 10 + i + 1) as Assento['idAssento'],
      idSala: sessao.idSala ?? 0,
      fila,
      numero: String(i + 1),
      tipo: 'PADRAO',
      ocupado: Math.random() < 0.25,
    })),
  );
}

interface FilmeModalProps {
  filme: Filme;
  sessoes: Sessao[];
  onClose: () => void;
  onBuy: (filme: Filme, sessao: Sessao, assentos: Assento[], tipoIngresso: TipoIngresso) => void;
}

export function FilmeModal({ filme, sessoes, onClose, onBuy }: FilmeModalProps) {
  const [sessaoSelecionada, setSessaoSelecionada] = useState<Sessao | null>(null);
  const [assentos, setAssentos] = useState<Assento[]>([]);
  const [assentosSelecionados, setAssentosSelecionados] = useState<Assento[]>([]);
  const [tipoIngresso, setTipoIngresso] = useState<TipoIngresso>('INTEIRA');
  const [loadingAssentos, setLoadingAssentos] = useState(false);
  const [erroAssentos, setErroAssentos] = useState<string | null>(null);

  const precoIngresso = useMemo(() => {
    if (!sessaoSelecionada) return 0;
    const unitario = tipoIngresso === 'MEIA' ? sessaoSelecionada.precoBase / 2 : sessaoSelecionada.precoBase;
    return unitario * assentosSelecionados.length;
  }, [assentosSelecionados.length, sessaoSelecionada, tipoIngresso]);

  const filasSorted = useMemo(() => {
    const mapa: Record<string, Assento[]> = {};
    for (const a of assentos) {
      if (!mapa[a.fila]) mapa[a.fila] = [];
      mapa[a.fila].push(a);
    }
    return Object.entries(mapa)
      .sort(([x], [y]) => x.localeCompare(y))
      .map(([fila, lista]) => ({
        fila,
        assentos: [...lista].sort((x, y) => parseInt(x.numero) - parseInt(y.numero)),
      }));
  }, [assentos]);

  // Polling de disponibilidade a cada 15 s
  useEffect(() => {
    if (!sessaoSelecionada) return;

    function carregarAssentos(sessao: Sessao) {
      if (config.useMock) {
        setAssentos(prev => mockAssentos(sessao, prev));
        return;
      }
      fetchAssentosBySessao(sessao.idSessao)
        .then(novos => {
          setAssentos(novos);
          // Se o assento selecionado foi ocupado por outra pessoa, deseleciona
          setAssentosSelecionados(prev => prev.filter(selecionado => {
            const ainda = novos.find(a => a.idAssento === selecionado.idAssento);
            return ainda && !ainda.ocupado;
          }));
        })
        .catch(() => {}); // silencioso: mantém assentos anteriores se falhar
    }

    const intervalId = setInterval(() => carregarAssentos(sessaoSelecionada), POLL_INTERVAL);
    return () => clearInterval(intervalId);
  }, [sessaoSelecionada]);

  function selecionarSessao(sessao: Sessao) {
    setSessaoSelecionada(sessao);
    setAssentosSelecionados([]);
    setAssentos([]);
    setErroAssentos(null);

    if (config.useMock) {
      setAssentos(mockAssentos(sessao, []));
      return;
    }

    if (!sessao.idSala) {
      setErroAssentos('Sala da sessão não informada.');
      return;
    }

    setLoadingAssentos(true);
    fetchAssentosBySessao(sessao.idSessao)
      .then(setAssentos)
      .catch((err: unknown) => {
        setErroAssentos(err instanceof Error ? err.message : 'Erro ao carregar assentos.');
      })
      .finally(() => setLoadingAssentos(false));
  }

  function toggleAssento(assento: Assento) {
    if (assento.ocupado) return;
    setAssentosSelecionados(prev => {
      const exists = prev.some(item => item.idAssento === assento.idAssento);
      if (exists) return prev.filter(item => item.idAssento !== assento.idAssento);
      return [...prev, assento];
    });
  }

  const pronto = sessaoSelecionada && assentosSelecionados.length > 0;

  return (
    <ModalBackdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>

        {/* ── Cabeçalho do filme ──────────────────────────── */}
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
            <StarRating rating={filme.nota} maxRating={5} />
            <S.Synopsis>{filme.sinopse}</S.Synopsis>
          </S.Info>
        </S.Header>

        {/* ── Etapa 1: Sessão ─────────────────────────────── */}
        <S.Section>
          <S.SectionTitle>
            <S.StepNum $done={!!sessaoSelecionada}>1</S.StepNum>
            Sessões — {formataDataHoje()}
          </S.SectionTitle>
          <S.SessionsGrid>
            {sessoes.map((s) => (
              <SessaoButton
                key={s.idSessao}
                sessao={s}
                selecionada={sessaoSelecionada}
                onSelect={selecionarSessao}
              />
            ))}
          </S.SessionsGrid>
        </S.Section>

        {sessaoSelecionada && (
          <>
            {/* ── Etapa 2: Tipo de ingresso ──────────────── */}
            <S.Section>
              <S.SectionTitle>
                <S.StepNum $done={true}>2</S.StepNum>
                Tipo de ingresso
              </S.SectionTitle>
              <S.TicketTypes>
                <S.TicketTypeButton
                  type="button"
                  $selected={tipoIngresso === 'INTEIRA'}
                  onClick={() => setTipoIngresso('INTEIRA')}
                >
                  <S.TicketTypeInfo>
                    <strong>Inteira</strong>
                    <small>Preço cheio</small>
                  </S.TicketTypeInfo>
                  <S.TicketTypePrice $selected={tipoIngresso === 'INTEIRA'}>
                    {formataPreco(sessaoSelecionada.precoBase)}
                  </S.TicketTypePrice>
                </S.TicketTypeButton>

                <S.TicketTypeButton
                  type="button"
                  $selected={tipoIngresso === 'MEIA'}
                  onClick={() => setTipoIngresso('MEIA')}
                >
                  <S.TicketTypeInfo>
                    <strong>Meia-entrada</strong>
                    <small>Estudante · Idoso · PCD</small>
                  </S.TicketTypeInfo>
                  <S.TicketTypePrice $selected={tipoIngresso === 'MEIA'}>
                    {formataPreco(sessaoSelecionada.precoBase / 2)}
                  </S.TicketTypePrice>
                </S.TicketTypeButton>
              </S.TicketTypes>
            </S.Section>

            {/* ── Etapa 3: Assento ───────────────────────── */}
            <S.Section>
              <S.SectionTitleRow>
                <S.SectionTitle>
                <S.StepNum $done={assentosSelecionados.length > 0}>3</S.StepNum>
                  Assentos
                </S.SectionTitle>
                {assentosSelecionados.length > 0 && (
                  <S.AssentoTag>
                    {assentosSelecionados.map(a => `${a.fila}${a.numero}`).join(', ')}
                  </S.AssentoTag>
                )}
              </S.SectionTitleRow>

              {loadingAssentos && <S.SeatsStatus>Carregando assentos...</S.SeatsStatus>}
              {erroAssentos && <S.SeatsStatus>{erroAssentos}</S.SeatsStatus>}
              {!loadingAssentos && !erroAssentos && assentos.length === 0 && (
                <S.SeatsStatus>Nenhum assento cadastrado para esta sala.</S.SeatsStatus>
              )}

              {!loadingAssentos && !erroAssentos && filasSorted.length > 0 && (
                <S.SeatMap>
                  <S.Screen />

                  {filasSorted.map(({ fila, assentos: assentosFila }) => (
                    <S.SeatRow key={fila}>
                      <S.RowLabel>{fila}</S.RowLabel>
                      <S.SeatRowSeats>
                        {assentosFila.map((a) => (
                          <S.SeatButton
                            key={a.idAssento}
                            type="button"
                            $selected={assentosSelecionados.some(item => item.idAssento === a.idAssento)}
                            $ocupado={a.ocupado}
                            onClick={() => toggleAssento(a)}
                            aria-label={`Assento ${fila}${a.numero}${a.ocupado ? ' — ocupado' : ''}`}
                            aria-disabled={a.ocupado}
                          >
                            {a.numero}
                          </S.SeatButton>
                        ))}
                      </S.SeatRowSeats>
                    </S.SeatRow>
                  ))}

                  <S.SeatLegend>
                    <S.LegendItem><S.LegendDot /> Disponível</S.LegendItem>
                    <S.LegendItem><S.LegendDot $selected /> Selecionado</S.LegendItem>
                    <S.LegendItem><S.LegendDot $ocupado /> Ocupado</S.LegendItem>
                  </S.SeatLegend>
                </S.SeatMap>
              )}
            </S.Section>
          </>
        )}

        {/* ── Footer ──────────────────────────────────────── */}
        <S.Footer>
          <ButtonSecondary onClick={onClose}>Fechar</ButtonSecondary>
          <ButtonPrimary
            disabled={!pronto}
            onClick={() => pronto && onBuy(filme, sessaoSelecionada, assentosSelecionados, tipoIngresso)}
          >
            {pronto
              ? `Adicionar ao carrinho · ${assentosSelecionados.length} ingresso${assentosSelecionados.length === 1 ? '' : 's'} · ${formataPreco(precoIngresso)}`
              : sessaoSelecionada
                ? 'Selecione um ou mais assentos'
                : 'Selecione uma sessão'}
          </ButtonPrimary>
        </S.Footer>
      </S.Modal>
    </ModalBackdrop>
  );
}
