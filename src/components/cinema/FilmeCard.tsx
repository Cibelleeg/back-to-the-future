import type { Filme, Sessao } from '../../types/cinema';
import { formataDuracao, formataHora } from '../../utils/formatters';
import { classColors } from '../../styles/theme';
import { Badge } from './Badge';

interface FilmeCardProps {
  filme: Filme;
  sessoes: Sessao[];
  onClick: () => void;
}

export function FilmeCard({ filme, sessoes, onClick }: FilmeCardProps) {
  const classificacaoStyle = classColors[filme.classificacao] || classColors.L;
  const proximaSessao = sessoes[0];

  return (
    <article className="movie-card" onClick={onClick}>
      <img src={filme.poster} alt={filme.titulo} />

      <div className="movie-card__classification">
        <Badge label={filme.classificacao} style={{ background: classificacaoStyle.bg, color: classificacaoStyle.text }} />
      </div>

      <div className="movie-card__rating">★ {filme.nota}</div>

      <div className="movie-card__overlay">
        <h3>{filme.titulo}</h3>

        <div className="movie-card__tags">
          <Badge label={filme.genero} />
          <Badge label={formataDuracao(filme.duracao)} />
        </div>

        {proximaSessao && (
          <p>
            Próxima: {formataHora(proximaSessao.dataHora)} · {proximaSessao.formato}
          </p>
        )}

        <span className="movie-card__action">Ver sessões</span>
      </div>
    </article>
  );
}
