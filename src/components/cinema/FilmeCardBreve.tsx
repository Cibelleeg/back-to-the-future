import type { Filme } from '../../types/cinema';
import { formataDuracao, formataData } from '../../utils/formatters';
import { classColors } from '../../styles/theme';
import { Badge } from './Badge';

interface FilmeCardBreveProps {
  filme: Filme;
  onClick: () => void;
}

export function FilmeCardBreve({ filme, onClick }: FilmeCardBreveProps) {
  const classificacaoStyle = classColors[filme.classificacao] || classColors.L;

  return (
    <article className="movie-card" onClick={onClick}>
      <img src={filme.poster} alt={filme.titulo} />

      <div className="movie-card__classification">
        <Badge
          label={filme.classificacao}
          style={{
            background: classificacaoStyle.bg,
            color: classificacaoStyle.text,
          }}
        />
      </div>

      <div className="movie-card__overlay">
        <h3>{filme.titulo}</h3>

        <div className="movie-card__tags">
          <Badge label={filme.genero} />
          <Badge label={formataDuracao(filme.duracao)} />
        </div>

        <p>Lançamento: {formataData(filme.dataLancamento)}</p>
      </div>
    </article>
  );
}