import type { CinemaId, Produto, ProdutoId } from '../../types/cinema';

export const PRODUTOS: Produto[] = [
  { idProduto: 1 as ProdutoId, idCinema: 1 as CinemaId, nome: 'Pipoca Média Salgada', descricao: 'Pipoca quentinha no balde médio', preco: 18.9, estoque: 50, categoria: 'Pipoca', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 2 as ProdutoId, idCinema: 1 as CinemaId, nome: 'Combo Duo', descricao: 'Pipoca grande + 2 refrigerantes', preco: 39.9, estoque: 30, categoria: 'Combo', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 3 as ProdutoId, idCinema: 2 as CinemaId, nome: 'Nachos c/ Cheddar', descricao: 'Nachos crocantes com molho cheddar', preco: 24.9, estoque: 40, categoria: 'Salgados', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 4 as ProdutoId, idCinema: 2 as CinemaId, nome: 'Refrigerante 500ml', descricao: 'Coca, Guaraná ou Sprite', preco: 12.9, estoque: 100, categoria: 'Bebidas', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 5 as ProdutoId, idCinema: 3 as CinemaId, nome: "M&M's 45g", descricao: 'Confeitos de chocolate coloridos', preco: 9.9, estoque: 80, categoria: 'Doces', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 6 as ProdutoId, idCinema: 3 as CinemaId, nome: 'Hot Dog Premium', descricao: 'Salsicha, mostarda, ketchup e cheddar', preco: 22.9, estoque: 25, categoria: 'Salgados', poster: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
];
