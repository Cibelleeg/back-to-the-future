import { useState } from 'react';
import type { ProdutoGroup } from '../../../pages/Bomboniere/groupProducts';
import { findVariante } from '../../../pages/Bomboniere/groupProducts';
import { formataPreco } from '../../../utils/formatters';
import { useCart } from '../../../contexts/useCart';
import * as S from './ProdutoGrupoCard.styles';

interface Props {
  group: ProdutoGroup;
}

export function ProdutoGrupoCard({ group }: Props) {
  const { atualizar, items } = useCart();
  const [tamanho, setTamanho] = useState<string | null>(group.tamanhos[0] ?? null);
  const [tipo,    setTipo]    = useState<string | null>(group.tipos[0]    ?? null);
  const [pop, setPop] = useState(false);

  const produto = findVariante(group, tamanho, tipo);
  const produtoSelecionado = produto ? { ...produto, tamanho, tipo } : null;
  const qty = items.find(i =>
    i.idProduto === produtoSelecionado?.idProduto
    && (i.tamanho ?? null) === (produtoSelecionado.tamanho ?? null)
    && (i.tipo ?? null) === (produtoSelecionado.tipo ?? null)
  )?.quantidade ?? 0;

  function fire(nova: number) {
    if (!produtoSelecionado) return;
    atualizar(produtoSelecionado, nova);
    setPop(true);
    setTimeout(() => setPop(false), 150);
  }

  const descricao = produto?.descricao ?? group.descricao;

  return (
    <S.Card>
      <S.ImageBox>
        {group.poster
          ? <S.Img src={group.poster} alt={group.nome} />
          : <S.ImgFallback />}
      </S.ImageBox>

      <S.Body>
        <div>
          <S.Name>{group.nome}</S.Name>
          <S.Desc>{descricao}</S.Desc>
        </div>

        {(group.tamanhos.length > 0 || group.tipos.length > 0) && (
          <S.Variants>
            {group.tamanhos.length > 1 && (
              <S.VariantRow>
                <S.DimLabel>Tamanho</S.DimLabel>
                <S.Opts>
                  {group.tamanhos.map(t => (
                    <S.Opt key={t} $active={tamanho === t} onClick={() => setTamanho(t)}>{t}</S.Opt>
                  ))}
                </S.Opts>
              </S.VariantRow>
            )}

            {group.tipos.length > 1 && (
              <S.VariantRow>
                <S.DimLabel>Sabor</S.DimLabel>
                <S.Opts>
                  {group.tipos.map(t => (
                    <S.Opt key={t} $active={tipo === t} onClick={() => setTipo(t)}>{t}</S.Opt>
                  ))}
                </S.Opts>
              </S.VariantRow>
            )}
          </S.Variants>
        )}

        <S.Footer>
          <S.Price>{produto ? formataPreco(produto.preco) : '—'}</S.Price>

          <S.AddWrapper $on={qty > 0}>
            <S.AddMain $on={qty > 0} disabled={!produtoSelecionado} onClick={() => fire(1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Adicionar
            </S.AddMain>

            <S.AddStep $on={qty > 0}>
              <S.StepBtn onClick={() => fire(qty - 1)} aria-label="Remover">−</S.StepBtn>
              <S.QtyCount $pop={pop}>{qty}</S.QtyCount>
              <S.StepBtn onClick={() => fire(qty + 1)} aria-label="Adicionar mais">+</S.StepBtn>
            </S.AddStep>
          </S.AddWrapper>
        </S.Footer>
      </S.Body>
    </S.Card>
  );
}
