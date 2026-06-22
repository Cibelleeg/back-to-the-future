import type { Filme, Sessao } from '../types/cinema';

function normalizarData(data: Date) {
  const d = new Date(data);
  d.setHours(0, 0, 0, 0);
  return d;
}

function combinaComBusca(titulo: string, busca: string): boolean {
  return titulo.toLowerCase().includes(busca.trim().toLowerCase());
}

function filtrarBase(filmes: Filme[], genero: string, busca: string): Filme[] {
  return filmes.filter((filme) => {
    const generoValido = genero === 'Todos' || filme.genero === genero;
    const buscaValida = combinaComBusca(filme.titulo, busca);
    return generoValido && buscaValida;
  });
}

function idFilmesNoCinema(sessoes: Sessao[], idCinema?: number): Set<number> | null {
  if (!idCinema) return null;
  return new Set(sessoes.filter((s) => s.idCinema === idCinema).map((s) => s.idFilme));
}

export function filtrarFilmesEmCartaz(
  filmes: Filme[],
  sessoes: Sessao[],
  genero: string,
  busca: string,
  idCinema?: number,
): Filme[] {
  const hoje = normalizarData(new Date());
  const filmesNoCinema = idFilmesNoCinema(sessoes, idCinema);

  return filtrarBase(filmes, genero, busca).filter((filme) => {
    const lancamento = normalizarData(new Date(filme.dataLancamento));
    const fimCartaz = normalizarData(new Date(filme.dataFimCartaz));
    const estaEmCartaz = lancamento <= hoje && fimCartaz >= hoje;
    const estaNoCinema = !filmesNoCinema || filmesNoCinema.has(filme.idFilme);
    return estaEmCartaz && estaNoCinema;
  });
}

export function filtrarFilmesEmBreve(
  filmes: Filme[],
  sessoes: Sessao[],
  genero: string,
  busca: string,
  idCinema?: number,
): Filme[] {
  const hoje = normalizarData(new Date());
  const filmesNoCinema = idFilmesNoCinema(sessoes, idCinema);

  return filtrarBase(filmes, genero, busca).filter((filme) => {
    const lancamento = normalizarData(new Date(filme.dataLancamento));
    const estaEmBreve = lancamento > hoje;
    const estaNoCinema = !filmesNoCinema || filmesNoCinema.has(filme.idFilme);
    return estaEmBreve && estaNoCinema;
  });
}

export function extrairGeneros(filmes: Filme[]): string[] {
  return ['Todos', ...new Set(filmes.map((f) => f.genero))];
}
