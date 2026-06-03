import type { Produto } from '../types/cinema';

export function filtrarProdutos(produtos: Produto[], categoria: string, idCinema?: number): Produto[] {
  return produtos.filter((p) => {
    const categoriaValida = categoria === 'Todos' || p.categoria === categoria;
    const cinemaValido = !idCinema || p.idCinema === idCinema;
    return categoriaValida && cinemaValido;
  });
}

export function extrairCategorias(produtos: Produto[], idCinema?: number): string[] {
  const produtosFiltrados = idCinema ? produtos.filter((p) => p.idCinema === idCinema) : produtos;
  return ['Todos', ...new Set(produtosFiltrados.map((p) => p.categoria))];
}
