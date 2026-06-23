export type FilmeId   = number & { readonly __brand: 'FilmeId' };
export type SessaoId  = number & { readonly __brand: 'SessaoId' };
export type ProdutoId = number & { readonly __brand: 'ProdutoId' };
export type ComboId   = number & { readonly __brand: 'ComboId' };
export type CinemaId  = number & { readonly __brand: 'CinemaId' };
export type AssentoId = number & { readonly __brand: 'AssentoId' };

export type Classificacao = 'L' | '10' | '12' | '14' | '16' | '18';
export type Formato = '2D' | '3D' | '4DX' | 'IMAX';
export type Idioma = 'Dublado' | 'Legendado';
export type TipoIngresso = 'INTEIRA' | 'MEIA';

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
  idSala?: number;
  dataHora: string;
  idioma: Idioma;
  formato: Formato;
  precoBase: number;
  sala: Sala;
}

export interface Assento {
  idAssento: AssentoId;
  idSala: number;
  numero: string;
  fila: string;
  tipo: string;
  ocupado: boolean;
}

export interface Produto {
  idProduto: ProdutoId;
  idCombo?: ComboId;
  idCinema: CinemaId;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  poster?: string;
  tamanho?: string | null;
  tipo?: string | null;
  tamanhos?: string[];
  sabores?: string[];
}

export interface CartItem {
  idProduto: ProdutoId;
  idCombo?: ComboId;
  idCinema: CinemaId;
  nome: string;
  preco: number;
  tamanho?: string | null;
  tipo?: string | null;
  quantidade: number;
}
