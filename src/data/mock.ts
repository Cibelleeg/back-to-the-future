import type { Filme, Produto, Sessao } from '../types/cinema';

export const FILMES: Filme[] = [
  { idFilme: 1, titulo: 'Furiosa: Uma Saga Mad Max', sinopse: 'A origem de Furiosa, uma jovem capturada pelo Senhor da Guerra Immortan Joe e criada nas Terras Áridas.', duracao: 148, classificacao: '16', genero: 'Ação', dataLancamento: '2026-05-24', dataFimCartaz: '2026-06-20', poster: 'https://image.tmdb.org/t/p/w400/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', nota: 7.8 },
  { idFilme: 2, titulo: 'IF: Amigos Imaginários', sinopse: 'Uma garota descobre que pode ver os amigos imaginários abandonados pelas crianças e decide ajudá-los.', duracao: 104, classificacao: 'L', genero: 'Animação', dataLancamento: '2026-05-17', dataFimCartaz: '2026-06-01', poster: 'https://image.tmdb.org/t/p/w400/xbKFv4KF3sVYuWKllLlwWNGFd0o.jpg', nota: 6.5 },
  { idFilme: 3, titulo: 'Guerra Civil', sinopse: 'Jornalistas percorrem os EUA em colapso para registrar a guerra civil que divide o país.', duracao: 109, classificacao: '18', genero: 'Thriller', dataLancamento: '2026-06-05', dataFimCartaz: '2026-07-20', poster: 'https://image.tmdb.org/t/p/w400/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg', nota: 7.2 },
  { idFilme: 4, titulo: 'Reino do Planeta dos Macacos', sinopse: 'Séculos após o reinado de César, um jovem macaco questiona um regime opressor em busca da liberdade.', duracao: 145, classificacao: '12', genero: 'Ficção Científica', dataLancamento: '2026-06-10', dataFimCartaz: '2026-07-10', poster: 'https://image.tmdb.org/t/p/w400/gKkl37BQuKTanygYQG1pyYgLVgf.jpg', nota: 6.9 },
  { idFilme: 5, titulo: 'Duna: Parte Dois', sinopse: 'Paul Atreides se une aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.', duracao: 166, classificacao: '12', genero: 'Épico', dataLancamento: '2026-05-01', dataFimCartaz: '2026-06-01', poster: 'https://image.tmdb.org/t/p/w400/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg', nota: 8.5 },
  { idFilme: 6, titulo: 'Deadpool & Wolverine', sinopse: 'Deadpool é recrutado pela Autoridade de Variância Temporal e une forças com um relutante Wolverine.', duracao: 127, classificacao: '18', genero: 'Ação', dataLancamento: '2025-06-26', dataFimCartaz: '2026-08-20', poster: 'https://image.tmdb.org/t/p/w400/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', nota: 7.9 },
];

export const SESSOES: Sessao[] = [
  { idSessao: 1, idFilme: 1, dataHora: '2025-05-22T14:30', idioma: 'Dublado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 1', tipo: 'Convencional' } },
  { idSessao: 2, idFilme: 1, dataHora: '2025-05-22T17:00', idioma: 'Legendado', formato: '4DX', precoBase: 58, sala: { nome: 'Sala 4DX', tipo: '4DX' } },
  { idSessao: 3, idFilme: 1, dataHora: '2025-05-22T20:15', idioma: 'Dublado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 4, idFilme: 2, dataHora: '2025-05-22T15:00', idioma: 'Dublado', formato: '2D', precoBase: 28, sala: { nome: 'Sala 2', tipo: 'Convencional' } },
  { idSessao: 5, idFilme: 2, dataHora: '2025-05-22T18:30', idioma: 'Dublado', formato: '3D', precoBase: 38, sala: { nome: 'Sala 3D', tipo: '3D' } },
  { idSessao: 6, idFilme: 3, dataHora: '2025-05-22T19:00', idioma: 'Legendado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 3', tipo: 'Convencional' } },
  { idSessao: 7, idFilme: 3, dataHora: '2025-05-22T21:30', idioma: 'Dublado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 2', tipo: 'Convencional' } },
  { idSessao: 8, idFilme: 4, dataHora: '2025-05-22T16:00', idioma: 'Dublado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 9, idFilme: 5, dataHora: '2025-05-22T13:00', idioma: 'Legendado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 10, idFilme: 6, dataHora: '2025-05-22T21:00', idioma: 'Dublado', formato: '4DX', precoBase: 58, sala: { nome: 'Sala 4DX', tipo: '4DX' } },
];

export const PRODUTOS: Produto[] = [
  { idProduto: 1, nome: 'Pipoca Média Salgada', descricao: 'Pipoca quentinha no balde médio', preco: 18.9, estoque: 50, categoria: 'Pipoca', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 2, nome: 'Combo Duo', descricao: 'Pipoca grande + 2 refrigerantes', preco: 39.9, estoque: 30, categoria: 'Combo', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 3, nome: 'Nachos c/ Cheddar', descricao: 'Nachos crocantes com molho cheddar', preco: 24.9, estoque: 40, categoria: 'Salgados', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 4, nome: 'Refrigerante 500ml', descricao: 'Coca, Guaraná ou Sprite', preco: 12.9, estoque: 100, categoria: 'Bebidas', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 5, nome: "M&M's 45g", descricao: 'Confeitos de chocolate coloridos', preco: 9.9, estoque: 80, categoria: 'Doces', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
  { idProduto: 6, nome: 'Hot Dog Premium', descricao: 'Salsicha, mostarda, ketchup e cheddar', preco: 22.9, estoque: 25, categoria: 'Salgados', img: 'https://cdn.awsli.com.br/2500x2500/2773/2773081/produto/305376216/combo-cinema--2--cw0vxlnrbj.jpg' },
];
