import type { CinemaId, Produto, ProdutoId } from '../../types/cinema';

const POPCORN  = 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400';
const SODA     = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400';
const NACHOS   = 'https://images.unsplash.com/photo-1604952612659-35d2e61e89a7?w=400';
const HOTDOG   = 'https://images.unsplash.com/photo-1638176066281-79b4558022e9?w=400';
const CHOCO    = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400';
const COMBO    = 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400';

const C1 = 1 as CinemaId;

export const PRODUTOS: Produto[] = [
  // ── Pipoca ──────────────────────────────────────────────────────
  { idProduto: 1  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 15.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Pequena', tipo: 'Salgada' },
  { idProduto: 2  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 20.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Média',   tipo: 'Salgada' },
  { idProduto: 3  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 25.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Grande',  tipo: 'Salgada' },
  { idProduto: 4  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 15.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Pequena', tipo: 'Doce'    },
  { idProduto: 5  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 20.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Média',   tipo: 'Doce'    },
  { idProduto: 6  as ProdutoId, idCinema: C1, nome: 'Pipoca', descricao: 'Balde de pipoca quentinha', preco: 25.0, estoque: 200, categoria: 'Alimento', poster: POPCORN, tamanho: 'Grande',  tipo: 'Doce'    },
  // ── Refrigerante ────────────────────────────────────────────────
  { idProduto: 7  as ProdutoId, idCinema: C1, nome: 'Refrigerante', descricao: 'Gelado, à sua escolha', preco: 10.0, estoque: 300, categoria: 'Bebida', poster: SODA, tamanho: '300ml', tipo: null },
  { idProduto: 8  as ProdutoId, idCinema: C1, nome: 'Refrigerante', descricao: 'Gelado, à sua escolha', preco: 15.0, estoque: 300, categoria: 'Bebida', poster: SODA, tamanho: '500ml', tipo: null },
  // ── Suco Natural ────────────────────────────────────────────────
  { idProduto: 9  as ProdutoId, idCinema: C1, nome: 'Suco Natural', descricao: 'Laranja, limão ou maracujá', preco: 12.0, estoque: 150, categoria: 'Bebida', poster: SODA, tamanho: '300ml', tipo: null },
  // ── Água Mineral ────────────────────────────────────────────────
  { idProduto: 10 as ProdutoId, idCinema: C1, nome: 'Água Mineral', descricao: 'Com ou sem gás', preco: 7.0, estoque: 300, categoria: 'Bebida', poster: SODA, tamanho: '500ml', tipo: null },
  // ── Alimentos avulsos ────────────────────────────────────────────
  { idProduto: 11 as ProdutoId, idCinema: C1, nome: 'Nachos', descricao: 'Com molho de cheddar', preco: 22.0, estoque: 80, categoria: 'Alimento', poster: NACHOS, tamanho: null, tipo: null },
  { idProduto: 12 as ProdutoId, idCinema: C1, nome: 'Hot Dog', descricao: 'Salsicha, mostarda, ketchup e cheddar', preco: 18.0, estoque: 60, categoria: 'Alimento', poster: HOTDOG, tamanho: null, tipo: null },
  { idProduto: 13 as ProdutoId, idCinema: C1, nome: 'Chocolate', descricao: 'Barra de chocolate ao leite', preco: 12.0, estoque: 100, categoria: 'Alimento', poster: CHOCO, tamanho: null, tipo: null },
  // ── Combos ──────────────────────────────────────────────────────
  { idProduto: 14 as ProdutoId, idCinema: C1, nome: 'Combo 1', descricao: 'Pipoca Média + Refrigerante 300ml', preco: 28.0, estoque: 50, categoria: 'Combo', poster: COMBO, tamanho: null, tipo: null },
  { idProduto: 15 as ProdutoId, idCinema: C1, nome: 'Combo 2', descricao: 'Pipoca Grande + 2 Refrigerantes 500ml', preco: 38.0, estoque: 50, categoria: 'Combo', poster: COMBO, tamanho: null, tipo: null },
  { idProduto: 16 as ProdutoId, idCinema: C1, nome: 'Combo 3', descricao: 'Pipoca Grande + Nachos + 2 Refrigerantes', preco: 55.0, estoque: 30, categoria: 'Combo', poster: COMBO, tamanho: null, tipo: null },
];
