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
  title?: string;
  titulo?: string;
  synopsis?: string;
  sinopse?: string;
  duration?: number;
  duracao?: number;
  ageRating?: number;
  classificacao?: number;
  genre?: string;
  genero?: string;
  generos?: string[];
  releaseDate?: string;
  dataLancamento?: string;
  endDate?: string | null;
  dataFimCartaz?: string | null;
  poster?: string | null;
  posterUrl?: string | null;
  rating?: number;
  media?: number;
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
  const genero = dto.genre ?? dto.genero ?? dto.generos?.[0] ?? '';

  return {
    idFilme: dto.id as FilmeId,
    titulo: dto.title ?? dto.titulo ?? '',
    sinopse: dto.synopsis ?? dto.sinopse ?? '',
    duracao: dto.duration ?? dto.duracao ?? 0,
    classificacao: mapClassificacao(dto.ageRating ?? dto.classificacao ?? 0),
    genero,
    dataLancamento: dto.releaseDate ?? dto.dataLancamento ?? `${dto.id ? new Date().getFullYear() : 2099}-01-01`,
    dataFimCartaz: dto.endDate ?? dto.dataFimCartaz ?? '2099-12-31',
    poster: dto.poster ?? dto.posterUrl ?? '',
    nota: dto.rating ?? (dto.media !== undefined ? dto.media * 2 : 0),
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
