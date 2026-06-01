import { useState } from 'react';
import type { Produto } from '../../types/cinema';
import { formataPreco } from '../../utils/formatters';

interface ProdutoCardProps {
  produto: Produto;
}

export function ProdutoCard({ produto }: ProdutoCardProps) {
  const [adicionado, setAdicionado] = useState(false);

  function handleAdd() {
    setAdicionado(true);
    window.setTimeout(() => setAdicionado(false), 1500);
  }

  return (
    <article className="product-card">
      <div className="product-card__image">{produto.emoji}</div>

      <div className="product-card__content">
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>

        <div className="product-card__footer">
          <span>{formataPreco(produto.preco)}</span>
          <button onClick={handleAdd} className={adicionado ? 'button-added' : ''}>
            {adicionado ? '✓ Adicionado' : '+ Adicionar'}
          </button>
        </div>
      </div>
    </article>
  );
}
