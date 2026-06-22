import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Produto } from '../../../types/cinema';
import { formataPreco } from '../../../utils/formatters';
import { useCart } from '../../../contexts/useCart';
import * as S from './ProdutoCard.styles';

interface ProdutoCardProps {
  produto: Produto;
  onClick: () => void;
}

export function ProdutoCard({ produto, onClick }: ProdutoCardProps) {
  const { atualizar } = useCart();
  const [quantidade, setQuantidade] = useState(0);
  const [pop, setPop] = useState(false);

  function disparar(nova: number) {
    setQuantidade(nova);
    setPop(true);
    setTimeout(() => setPop(false), 150);
    atualizar(produto, nova);
  }

  function adicionar(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    disparar(1);
  }

  function incrementar(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    disparar(quantidade + 1);
  }

  function decrementar(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (quantidade > 0) disparar(quantidade - 1);
  }

  const on = quantidade > 0;

  return (
    <S.Card>
      <S.ImageWrapper>
        <img src={produto.poster} alt={produto.nome} />
      </S.ImageWrapper>

      <S.Body>
        <S.Name onClick={onClick}>{produto.nome}</S.Name>
        <S.Description>{produto.descricao}</S.Description>
        <S.Footer>
          <S.Price>{formataPreco(produto.preco)}</S.Price>

          <S.AddWrapper $on={on}>
            <S.AddMain $on={on} onClick={adicionar}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Adicionar
            </S.AddMain>

            <S.AddStep $on={on}>
              <S.StepBtn onClick={decrementar} aria-label="Remover">−</S.StepBtn>
              <S.QtyCount $pop={pop}>{quantidade}</S.QtyCount>
              <S.StepBtn onClick={incrementar} aria-label="Adicionar">+</S.StepBtn>
            </S.AddStep>
          </S.AddWrapper>
        </S.Footer>
      </S.Body>
    </S.Card>
  );
}
