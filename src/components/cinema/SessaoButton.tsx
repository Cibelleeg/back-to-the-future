import type { Sessao } from '../../types/cinema';
import { formataHora, formataPreco } from '../../utils/formatters';
import { formatColors } from '../../styles/theme';
import { Badge } from './Badge';

interface SessaoButtonProps {
  sessao: Sessao;
  selecionada?: Sessao | null;
  onSelect: (sessao: Sessao) => void;
}

export function SessaoButton({ sessao, selecionada, onSelect }: SessaoButtonProps) {
  const formatoStyle = formatColors[sessao.formato] || formatColors['2D'];
  const isSelected = selecionada?.idSessao === sessao.idSessao;

  return (
    <button
      className={`session-button ${isSelected ? 'session-button--selected' : ''}`}
      onClick={() => onSelect(sessao)}
    >
      <span className="session-button__time">{formataHora(sessao.dataHora)}</span>

      <div className="session-button__badges">
        <Badge label={sessao.formato} style={{ background: formatoStyle.bg, color: formatoStyle.text }} />
        <Badge label={sessao.idioma === 'Dublado' ? 'DUB' : 'LEG'} />
      </div>

      <span className="session-button__price">{formataPreco(sessao.precoBase)}</span>
    </button>
  );
}
