import type { Filme } from '../../../types/cinema';
import { FilmeCardBreve } from '../FilmeCardBreve';
import * as Shared from '../Section.styles';
import * as S from './SecaoEmBreve.styles';

interface SecaoEmBreveProps {
  filmes: Filme[];
  onFilmeClick: (filme: Filme) => void;
}

export function SecaoEmBreve({ filmes, onFilmeClick }: SecaoEmBreveProps) {
  return (
    <Shared.Section>
      <Shared.Header>
        <Shared.TitleRow>
          <Shared.Dot />
          <Shared.Title>Em Breve</Shared.Title>
        </Shared.TitleRow>
        <Shared.SeeAll href="#">Ver todos <i className="fa-solid fa-angle-right" /></Shared.SeeAll>
      </Shared.Header>

      {filmes.length === 0 ? (
        <Shared.Empty>Nenhum lançamento próximo.</Shared.Empty>
      ) : (
        <S.Grid>
          {filmes.map((filme) => (
            <FilmeCardBreve key={filme.idFilme} filme={filme} onClick={() => onFilmeClick(filme)} />
          ))}
        </S.Grid>
      )}
    </Shared.Section>
  );
}
