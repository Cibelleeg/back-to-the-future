export type FilmeId   = number & { readonly __brand: 'FilmeId' };
export type SessaoId  = number & { readonly __brand: 'SessaoId' };
export type ProdutoId = number & { readonly __brand: 'ProdutoId' };
export type CinemaId  = number & { readonly __brand: 'CinemaId' };

export type Classificacao = 'L' | '10' | '12' | '14' | '16' | '18';
export type Formato = '2D' | '3D' | '4DX' | 'IMAX';
export type Idioma = 'Dublado' | 'Legendado';

export interface Cinema {
  idCinema: CinemaId;
  nome: string;
  cidade: string;
}

export interface Sala {
  nome: string;
  tipo: string;
}

export interface Filme {
  idFilme: FilmeId;
  titulo: string;
  sinopse: string;
  duracao: number;
  classificacao: Classificacao;
  genero: string;
  dataLancamento: string;
  dataFimCartaz: string;
  poster: string;
  nota: number;
}

export interface Sessao {
  idSessao: SessaoId;
  idFilme: FilmeId;
  idCinema: CinemaId;
  dataHora: string;
  idioma: Idioma;
  formato: Formato;
  precoBase: number;
  sala: Sala;
}

export interface Produto {
  idProduto: ProdutoId;
  idCinema: CinemaId;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  img: string;
}

export interface CartItem {
  idProduto: ProdutoId;
  idCinema: CinemaId;
  nome: string;
  preco: number;
  quantidade: number;
}
