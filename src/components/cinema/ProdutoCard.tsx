import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Produto } from '../../types/cinema';
import { formataPreco } from '../../utils/formatters';

interface ProdutoCardProps {
  produto: Produto;
  onClick: () => void;
}

export function ProdutoCard({ produto, onClick }: ProdutoCardProps) {
  const [adicionado, setAdicionado] = useState(false);

  function handleAdd(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setAdicionado(true);

    window.setTimeout(() => {
      setAdicionado(false);
    }, 1500);
  }

  return (
    <article className="product-card">
      <div className="product-card__image"><img src={produto.img} alt={produto.nome} /></div>

      <div className="product-card__content">
        <h3 onClick={onClick} className="product-card__title">
          {produto.nome}
        </h3>
        <p>{produto.descricao}</p>

        <div className="product-card__footer">
          <span>{formataPreco(produto.preco)}</span>
          <button
            onClick={handleAdd}
            className={adicionado ? 'button-added' : ''}
          >
            {adicionado ? (
              <>
                <i className="fa-solid fa-check"></i>
                {' '}Adicionado
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i>
                {' '}Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
