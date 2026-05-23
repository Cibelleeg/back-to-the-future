export interface Sala {
    nome: string;
    tipo: string;
    capacidade: number;
}

export type formato = '2D' | '3D' | '4DX' | 'IMAX';
export type idioma = 'Dublado' | 'Legendado';

export interface Filme {
    idFilme: number;
    titulo: string;
    sinopse: string;
    duracao: number;
    classificacao: string;
    genero: string;
    dataLancamento: string;
    poster: string;
    nota: number;
}

export interface Sessao {
    idSessao: number;
    idFilme: number;
    idSala: number;
    dataHora: string;
    idioma: idioma;
    formato: formato;
    precoBase: number;
    sala: Sala;
}

export interface Produto {
  idProduto: number
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoria: string
}

