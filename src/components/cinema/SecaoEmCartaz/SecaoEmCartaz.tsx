import type { Filme, Sessao } from '../../../types/cinema';
import { FilmeCard } from '../FilmeCard';
import * as Shared from '../Section.styles';
import * as S from './SecaoEmCartaz.styles';

interface SecaoEmCartazProps {
  filmes: Filme[];
  generos: string[];
  generoSelecionado: string;
  onGeneroChange: (genero: string) => void;
  sessoesPorFilme: Record<number, Sessao[]>;
  onFilmeClick: (filme: Filme) => void;
}

export function SecaoEmCartaz({ filmes, generos, generoSelecionado, onGeneroChange, sessoesPorFilme, onFilmeClick }: SecaoEmCartazProps) {
  return (
    <Shared.Section>
      <Shared.Header>
        <Shared.HeaderLeft>
          <Shared.TitleRow>
            <Shared.Dot />
            <Shared.Title>Em Cartaz</Shared.Title>
          </Shared.TitleRow>
          <Shared.Chips>
            {generos.map((genero) => (
              <Shared.Chip key={genero} $active={generoSelecionado === genero} onClick={() => onGeneroChange(genero)}>
                {genero}
              </Shared.Chip>
            ))}
          </Shared.Chips>
        </Shared.HeaderLeft>
        <Shared.SeeAll href="#">Ver todos <i className="fa-solid fa-angle-right" /></Shared.SeeAll>
      </Shared.Header>

      {filmes.length === 0 ? (
        <Shared.Empty>Nenhum filme em cartaz encontrado.</Shared.Empty>
      ) : (
        <S.Grid>
          {filmes.map((filme) => (
            <FilmeCard
              key={filme.idFilme}
              filme={filme}
              sessoes={sessoesPorFilme[filme.idFilme] ?? []}
              onClick={() => onFilmeClick(filme)}
            />
          ))}
        </S.Grid>
      )}
    </Shared.Section>
  );
}
