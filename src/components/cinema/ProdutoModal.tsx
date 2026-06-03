import { useState } from 'react';
import type { Produto } from '../../types/cinema';
import { formataPreco } from '../../utils/formatters';

interface ProdutoModalProps {
  produto: Produto;
  onClose: () => void;
}

export function ProdutoModal({ produto, onClose }: ProdutoModalProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  function diminuirQuantidade() {
    setQuantidade((atual) => Math.max(1, atual - 1));
  }

  function aumentarQuantidade() {
    setQuantidade((atual) => atual + 1);
  }

  function handleAdd() {
    setAdicionado(true);

    window.setTimeout(() => {
      setAdicionado(false);
    }, 1500);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="product-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="product-modal__close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="product-modal__image">
          <img src={produto.img} alt={produto.nome} />
        </div>

        <div className="product-modal__content">
          <h2>{produto.nome}</h2>

          <p>{produto.descricao}</p>

          <div className="product-modal__details">
            <div>
              <span>Preço</span>
              <strong>{formataPreco(produto.preco)}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>{formataPreco(produto.preco * quantidade)}</strong>
            </div>
          </div>

          <div className="product-modal__quantity">
            <span>Quantidade</span>

            <div>
              <button onClick={diminuirQuantidade} disabled={quantidade === 1}>
                <i className="fa-solid fa-minus"></i>
              </button>

              <strong>{quantidade}</strong>

              <button onClick={aumentarQuantidade}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <footer className="product-modal__footer">
          <button className="button-secondary" onClick={onClose}>
            Fechar
          </button>

          <button
            className={`button-primary ${adicionado ? 'button-added' : ''}`}
            onClick={handleAdd}
          >
            {adicionado ? (
              <>
                <i className="fa-solid fa-check"></i>
                {' '}Adicionado
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i>
                {' '}Adicionar {formataPreco(produto.preco * quantidade)}
              </>
            )}
          </button>
        </footer>
      </section>
    </div>
  );
}