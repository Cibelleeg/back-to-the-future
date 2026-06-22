import type { CinemaId, FilmeId, Sessao, SessaoId } from '../../types/cinema';

export const SESSOES: Sessao[] = [
  { idSessao: 1 as SessaoId, idFilme: 1 as FilmeId, idCinema: 1 as CinemaId, dataHora: '2026-06-10T14:30', idioma: 'Dublado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 1', tipo: 'Convencional' } },
  { idSessao: 2 as SessaoId, idFilme: 1 as FilmeId, idCinema: 1 as CinemaId, dataHora: '2026-06-10T20:15', idioma: 'Dublado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 3 as SessaoId, idFilme: 2 as FilmeId, idCinema: 1 as CinemaId, dataHora: '2026-06-10T15:00', idioma: 'Dublado', formato: '2D', precoBase: 28, sala: { nome: 'Sala 2', tipo: 'Convencional' } },
  { idSessao: 4 as SessaoId, idFilme: 3 as FilmeId, idCinema: 1 as CinemaId, dataHora: '2026-06-10T21:30', idioma: 'Dublado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 3', tipo: 'Convencional' } },
  { idSessao: 5 as SessaoId, idFilme: 1 as FilmeId, idCinema: 2 as CinemaId, dataHora: '2026-06-10T17:00', idioma: 'Legendado', formato: '4DX', precoBase: 58, sala: { nome: 'Sala 4DX', tipo: '4DX' } },
  { idSessao: 6 as SessaoId, idFilme: 2 as FilmeId, idCinema: 2 as CinemaId, dataHora: '2026-06-10T18:30', idioma: 'Dublado', formato: '3D', precoBase: 38, sala: { nome: 'Sala 3D', tipo: '3D' } },
  { idSessao: 7 as SessaoId, idFilme: 3 as FilmeId, idCinema: 2 as CinemaId, dataHora: '2026-06-10T19:00', idioma: 'Legendado', formato: '2D', precoBase: 32, sala: { nome: 'Sala 2', tipo: 'Convencional' } },
  { idSessao: 8 as SessaoId, idFilme: 4 as FilmeId, idCinema: 2 as CinemaId, dataHora: '2026-06-10T16:00', idioma: 'Dublado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 9 as SessaoId, idFilme: 5 as FilmeId, idCinema: 3 as CinemaId, dataHora: '2026-06-10T13:00', idioma: 'Legendado', formato: 'IMAX', precoBase: 65, sala: { nome: 'IMAX 1', tipo: 'IMAX' } },
  { idSessao: 10 as SessaoId, idFilme: 6 as FilmeId, idCinema: 3 as CinemaId, dataHora: '2026-06-10T21:00', idioma: 'Dublado', formato: '4DX', precoBase: 58, sala: { nome: 'Sala 4DX', tipo: '4DX' } },
];
