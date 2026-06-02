import { useState } from 'react';
import type { Filme, Sessao } from '../../types/cinema';
import { formataDuracao, formataPreco } from '../../utils/formatters';
import { classColors } from '../../styles/theme';
import { Badge } from './Badge';
import { StarRating } from './Avaliacao';
import { SessaoButton } from './SessaoButton';

interface FilmeModalProps {
  filme: Filme;
  sessoes: Sessao[];
  onClose: () => void;
  onBuy: (filme: Filme, sessao: Sessao) => void;
}

export function FilmeModal({ filme, sessoes, onClose, onBuy }: FilmeModalProps) {
  const [sessaoSelecionada, setSessaoSelecionada] = useState<Sessao | null>(null);
  const classificacaoStyle = classColors[filme.classificacao] || classColors.L;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="movie-modal" onClick={(event) => event.stopPropagation()}>
        <div className="movie-modal__header">
          <img src={filme.poster} alt={filme.titulo} />

          <div className="movie-modal__info">
            <button className="movie-modal__close" onClick={onClose}>✕</button>

            <div className="movie-modal__tags">
              <Badge label={`${filme.classificacao} anos`} style={{ background: classificacaoStyle.bg, color: classificacaoStyle.text }} />
              <Badge label={filme.genero} />
              <Badge label={formataDuracao(filme.duracao)} />
            </div>

            <h2>{filme.titulo}</h2>
            <StarRating rating={filme.nota} />
            <p>{filme.sinopse}</p>
          </div>
        </div>

        <div className="movie-modal__sessions">
          <h3>Sessões — Hoje, 22 Mai</h3>
          <div>
            {sessoes.map((sessao) => (
              <SessaoButton
                key={sessao.idSessao}
                sessao={sessao}
                selecionada={sessaoSelecionada}
                onSelect={setSessaoSelecionada}
              />
            ))}
          </div>
        </div>

        <footer className="movie-modal__footer">
          <button className="button-secondary" onClick={onClose}>Fechar</button>
          <button
            className="button-primary"
            disabled={!sessaoSelecionada}
            onClick={() => sessaoSelecionada && onBuy(filme, sessaoSelecionada)}
          >
            {sessaoSelecionada ? `Comprar — ${formataPreco(sessaoSelecionada.precoBase)}` : 'Selecione uma sessão'}
          </button>
        </footer>
      </section>
    </div>
  );
}
