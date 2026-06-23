import type {
  Assento,
  AssentoId,
  Cinema,
  CinemaId,
  Classificacao,
  ComboId,
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
  notaPonderada?: number;
  totalAvaliacoes?: number;
  estado?: string;
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
  poster?: string;
  img?: string;
  tamanho?: string | null;
  tipo?: string | null;
  tamanhos?: string[];
  sabores?: string[];
}

export interface ComboDTO {
  id?: number;
  idCombo?: number;
  nome?: string;
  name?: string;
  descricao?: string;
  description?: string;
  preco?: number;
  price?: number;
  ativo?: boolean;
  poster?: string | null;
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

export interface AssentoDTO {
  id?: number;
  idAssento?: number;
  idSala: number;
  numero: string;
  fila: string;
  tipo: string;
  ocupado?: boolean;
  disponivel?: boolean;
  status?: string;
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
    nota: dto.notaPonderada ?? dto.media ?? (dto.rating !== undefined ? dto.rating / 2 : 0),
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
    poster: dto.poster ?? dto.img ?? '',
    tamanho: dto.tamanho ?? null,
    tipo: dto.tipo ?? null,
    tamanhos: dto.tamanhos ?? [],
    sabores: dto.sabores ?? [],
  };
}

const COMBO_POSTERS: Record<string, string> = {
  'Combo Classico': 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=1000&q=80',
  'Combo Casal':    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1000&q=80',
  'Combo Premium':  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
};

const DEFAULT_COMBO_POSTER = 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1000&q=80';

export function mapComboDTO(dto: ComboDTO): Produto {
  const id   = dto.id ?? dto.idCombo ?? 0;
  const nome = dto.nome ?? dto.name ?? '';

  return {
    idProduto: -id as ProdutoId,
    idCombo: id as ComboId,
    idCinema: 0 as CinemaId,
    nome,
    descricao: dto.descricao ?? dto.description ?? '',
    preco: dto.preco ?? dto.price ?? 0,
    estoque: 999,
    categoria: 'Combo',
    poster: dto.poster ?? COMBO_POSTERS[nome] ?? DEFAULT_COMBO_POSTER,
    tamanho: null,
    tipo: null,
    tamanhos: [],
    sabores: [],
  };
}

export function mapSessaoDTO(dto: SessaoDTO): Sessao {
  return {
    idSessao: dto.id as SessaoId,
    idFilme: dto.movieId as FilmeId,
    idCinema: dto.cinemaId as CinemaId,
    idSala: dto.roomId,
    dataHora: dto.dateTime,
    idioma: dto.language as Idioma,
    formato: dto.format as Formato,
    precoBase: dto.basePrice,
    sala: { nome: dto.roomName, tipo: dto.roomType },
  };
}

export function mapAssentoDTO(dto: AssentoDTO): Assento {
  const ocupado = dto.ocupado
    ?? (dto.disponivel !== undefined ? !dto.disponivel : undefined)
    ?? (dto.status !== undefined ? dto.status !== 'DISPONIVEL' : false);
  return {
    idAssento: (dto.idAssento ?? dto.id ?? 0) as AssentoId,
    idSala: dto.idSala,
    numero: dto.numero,
    fila: dto.fila,
    tipo: dto.tipo,
    ocupado,
  };
}
