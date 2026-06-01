import type { Filme } from '../../types/cinema';
import { Badge } from './Badge';

interface HeroProps {
  filme: Filme;
  onShowSessions: () => void;
}

export function Hero({ filme, onShowSessions }: HeroProps) {
  return (
    <section className="hero">
      <img src={filme.poster} alt="" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <Badge label="Em destaque" style={{ background: '#e63329', color: '#fff' }} />
        <h1>{filme.titulo}</h1>
        <p>{filme.sinopse}</p>

        <div className="hero__actions">
          <button className="button-primary button-large" onClick={onShowSessions}>
            🎟 Ver sessões
          </button>
          <button className="button-glass button-large">▶ Trailer</button>
        </div>
      </div>
    </section>
  );
}
