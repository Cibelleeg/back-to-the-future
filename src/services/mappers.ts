import type {
  Cinema,
  CinemaId,
  Classificacao,
  Filme,
  FilmeId,
  Formato,
  Idioma,
  Produto,
  ProdutoId,
  Sessao,
  SessaoId,
} from '../types/cinema';


export interface FilmeDTO {
  id: number;
  title: string;
  synopsis: string;
  duration: number;
  ageRating: number;
  genre: string;
  releaseDate: string;
  endDate?: string;
  poster?: string;
  rating?: number; 
}

export interface CinemaDTO {
  id: number;
  name: string;
  cnpj?: string;
  phoneNumber?: string;
  email?: string;
  address: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export interface ProdutoDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  img?: string;
}

export interface SessaoDTO {
  id: number;
  movieId: number;
  roomId: number;
  cinemaId: number;
  dateTime: string;
  language: string;
  format: string;
  basePrice: number;
  roomName: string;
  roomType: string;
  totalSeats: number;
  availableSeats: number;
}

const CLASSIFICACAO_MAP: Record<number, Classificacao> = {
  0: 'L',
  10: '10',
  12: '12',
  14: '14',
  16: '16',
  18: '18',
};

export function mapClassificacao(n: number): Classificacao {
  return CLASSIFICACAO_MAP[n] ?? 'L';
}

export function mapFilmeDTO(dto: FilmeDTO): Filme {
  return {
    idFilme: dto.id as FilmeId,
    titulo: dto.title,
    sinopse: dto.synopsis,
    duracao: dto.duration,
    classificacao: mapClassificacao(dto.ageRating),
    genero: dto.genre,
    dataLancamento: dto.releaseDate,
    dataFimCartaz: dto.endDate ?? '2099-12-31',
    poster: dto.poster ?? '',
    nota: dto.rating ?? 0,
  };
}

export function mapCinemaDTO(dto: CinemaDTO): Cinema {
  return {
    idCinema: dto.id as CinemaId,
    nome: dto.name,
    cidade: dto.address.cidade,
  };
}

export function mapProdutoDTO(dto: ProdutoDTO): Produto {
  return {
    idProduto: dto.id as ProdutoId,
    idCinema: 0 as CinemaId,
    nome: dto.name,
    descricao: dto.description,
    preco: dto.price,
    estoque: dto.stock,
    categoria: dto.category,
    img: dto.img ?? '',
  };
}

export function mapSessaoDTO(dto: SessaoDTO): Sessao {
  return {
    idSessao: dto.id as SessaoId,
    idFilme: dto.movieId as FilmeId,
    idCinema: dto.cinemaId as CinemaId,
    dataHora: dto.dateTime,
    idioma: dto.language as Idioma,
    formato: dto.format as Formato,
    precoBase: dto.basePrice,
    sala: { nome: dto.roomName, tipo: dto.roomType },
  };
}
