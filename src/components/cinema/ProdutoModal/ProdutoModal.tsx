import { useState } from 'react';
import type { Produto } from '../../../types/cinema';
import { formataPreco } from '../../../utils/formatters';
import { useCart } from '../../../contexts/useCart';
import { ModalBackdrop, ButtonSecondary } from '../../../styles/shared';
import * as S from './ProdutoModal.styles';

interface ProdutoModalProps {
  produto: Produto;
  onClose: () => void;
}

export function ProdutoModal({ produto, onClose }: ProdutoModalProps) {
  const { atualizar, items } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  const quantidadeAtual = items.find(item =>
    item.idProduto === produto.idProduto
    && (item.tamanho ?? null) === (produto.tamanho ?? null)
    && (item.tipo ?? null) === (produto.tipo ?? null)
  )?.quantidade ?? 0;

  function diminuirQuantidade() {
    setQuantidade((atual) => Math.max(1, atual - 1));
  }

  function aumentarQuantidade() {
    setQuantidade((atual) => atual + 1);
  }

  function handleAdd() {
    atualizar(produto, quantidadeAtual + quantidade);
    setAdicionado(true);
    window.setTimeout(() => setAdicionado(false), 1500);
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </S.CloseButton>

        <S.ImageWrapper>
          <img src={produto.poster} alt={produto.nome} />
        </S.ImageWrapper>

        <S.Body>
          <S.Title>{produto.nome}</S.Title>
          <S.Description>{produto.descricao}</S.Description>

          <S.DetailsGrid>
            <S.DetailCard>
              <span>Preço</span>
              <strong>{formataPreco(produto.preco)}</strong>
            </S.DetailCard>
            <S.DetailCard>
              <span>Total</span>
              <strong>{formataPreco(produto.preco * quantidade)}</strong>
            </S.DetailCard>
          </S.DetailsGrid>

          <S.QuantityRow>
            <span>Quantidade</span>
            <S.QuantityControls>
              <S.QuantityButton onClick={diminuirQuantidade} disabled={quantidade === 1}>
                <i className="fa-solid fa-minus" />
              </S.QuantityButton>
              <strong>{quantidade}</strong>
              <S.QuantityButton onClick={aumentarQuantidade}>
                <i className="fa-solid fa-plus" />
              </S.QuantityButton>
            </S.QuantityControls>
          </S.QuantityRow>
        </S.Body>

        <S.Footer>
          <ButtonSecondary onClick={onClose}>Fechar</ButtonSecondary>
          <S.AddButton $added={adicionado} onClick={handleAdd}>
            {adicionado ? (
              <><i className="fa-solid fa-check" /> Adicionado</>
            ) : (
              <><i className="fa-solid fa-plus" /> Adicionar {formataPreco(produto.preco * quantidade)}</>
            )}
          </S.AddButton>
        </S.Footer>
      </S.Modal>
    </ModalBackdrop>
  );
}
