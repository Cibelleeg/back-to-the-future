import { describe, expect, it } from 'vitest';
import type { CinemaId, Produto, ProdutoId } from '../types/cinema';
import { extrairCategorias, filtrarProdutos } from './produtoService';

type ProdutoInput = Omit<Partial<Produto>, 'idProduto' | 'idCinema'> & {
  idProduto?: number;
  idCinema?: number;
};

function produto(partial: ProdutoInput): Produto {
  return {
    idProduto: (partial.idProduto ?? 1) as ProdutoId,
    idCinema: (partial.idCinema ?? 1) as CinemaId,
    nome: partial.nome ?? 'Produto',
    descricao: partial.descricao ?? 'Descricao',
    preco: partial.preco ?? 10,
    estoque: partial.estoque ?? 5,
    categoria: partial.categoria ?? 'Snack',
    poster: partial.poster ?? 'img.png',
  };
}

describe('produtoService', () => {
  it('filtra produtos por categoria e cinema', () => {
    const produtos: Produto[] = [
      produto({ idProduto: 1, categoria: 'Pipoca', idCinema: 1 }),
      produto({ idProduto: 2, categoria: 'Bebidas', idCinema: 1 }),
      produto({ idProduto: 3, categoria: 'Pipoca', idCinema: 2 }),
    ];

    const resultado = filtrarProdutos(produtos, 'Pipoca', 1);

    expect(resultado.map((p) => p.idProduto)).toEqual([1]);
  });

  it('extrai categorias unicas com Todos no inicio', () => {
    const produtos: Produto[] = [
      produto({ idProduto: 1, categoria: 'Pipoca', idCinema: 1 }),
      produto({ idProduto: 2, categoria: 'Bebidas', idCinema: 1 }),
      produto({ idProduto: 3, categoria: 'Pipoca', idCinema: 2 }),
    ];

    expect(extrairCategorias(produtos)).toEqual(['Todos', 'Pipoca', 'Bebidas']);
    expect(extrairCategorias(produtos, 1)).toEqual(['Todos', 'Pipoca', 'Bebidas']);
    expect(extrairCategorias(produtos, 2)).toEqual(['Todos', 'Pipoca']);
  });
});
