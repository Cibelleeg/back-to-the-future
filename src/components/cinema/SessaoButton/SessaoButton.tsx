import type { Sessao } from '../../../types/cinema';
import { formataHora, formataPreco } from '../../../utils/formatters';
import { formatColors } from '../../../styles/theme';
import { Badge } from '../../ui/Badge';
import * as S from './SessaoButton.styles';

interface SessaoButtonProps {
  sessao: Sessao;
  selecionada?: Sessao | null;
  onSelect: (sessao: Sessao) => void;
}

export function SessaoButton({ sessao, selecionada, onSelect }: SessaoButtonProps) {
  const formatoStyle = formatColors[sessao.formato] || formatColors['2D'];
  const isSelected = selecionada?.idSessao === sessao.idSessao;

  return (
    <S.Button $selected={isSelected} onClick={() => onSelect(sessao)}>
      <S.Time>{formataHora(sessao.dataHora)}</S.Time>
      <S.Badges>
        <Badge label={sessao.formato} $bg={formatoStyle.bg} $color={formatoStyle.text} />
        <Badge label={sessao.idioma === 'Dublado' ? 'DUB' : 'LEG'} />
      </S.Badges>
      <S.PriceLabel $selected={isSelected}>{formataPreco(sessao.precoBase)}</S.PriceLabel>
    </S.Button>
  );
}
