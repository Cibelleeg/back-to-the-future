export type Classificacao = 'L' | '10' | '12' | '14' | '16' | '18';
export type Formato = '2D' | '3D' | '4DX' | 'IMAX';
export type Idioma = 'Dublado' | 'Legendado';

export interface Sala {
  nome: string;
  tipo: string;
}

export interface Filme {
  idFilme: number;
  titulo: string;
  sinopse: string;
  duracao: number;
  classificacao: Classificacao;
  genero: string;
  dataLancamento: Date;
  dataFimCartaz: Date;
  poster: string;
  nota: number;
}

export interface Sessao {
  idSessao: number;
  idFilme: number;
  dataHora: string;
  idioma: Idioma;
  formato: Formato;
  precoBase: number;
  sala: Sala;
}

export interface Produto {
  idProduto: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  img: string;
}
