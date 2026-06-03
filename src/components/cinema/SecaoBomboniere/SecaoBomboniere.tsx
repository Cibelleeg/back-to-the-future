import type { Produto } from '../../../types/cinema';
import { ProdutoCard } from '../ProdutoCard';
import * as Shared from '../Section.styles';
import * as S from './SecaoBomboniere.styles';

interface SecaoBombonicreProps {
  produtos: Produto[];
  categorias: string[];
  categoriaSelecionada: string;
  onCategoriaChange: (categoria: string) => void;
  onProdutoClick: (produto: Produto) => void;
}

export function SecaoBomboniere({ produtos, categorias, categoriaSelecionada, onCategoriaChange, onProdutoClick }: SecaoBombonicreProps) {
  return (
    <Shared.Section>
      <Shared.Header>
        <Shared.HeaderLeft>
          <Shared.TitleRow>
            <Shared.Line />
            <Shared.Title>Bomboniere</Shared.Title>
          </Shared.TitleRow>
          <Shared.Chips>
            {categorias.map((categoria) => (
              <Shared.Chip key={categoria} $active={categoriaSelecionada === categoria} onClick={() => onCategoriaChange(categoria)}>
                {categoria}
              </Shared.Chip>
            ))}
          </Shared.Chips>
        </Shared.HeaderLeft>
        <Shared.SeeAll href="#">Ver cardápio <i className="fa-solid fa-angle-right" /></Shared.SeeAll>
      </Shared.Header>

      <S.Grid>
        {produtos.map((produto) => (
          <ProdutoCard key={produto.idProduto} produto={produto} onClick={() => onProdutoClick(produto)} />
        ))}
      </S.Grid>
    </Shared.Section>
  );
}
