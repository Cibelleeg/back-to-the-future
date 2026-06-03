import { useMemo, useState } from 'react';
import { FILMES, SESSOES } from '../data/mock';
import { extrairGeneros, filtrarFilmesEmBreve, filtrarFilmesEmCartaz } from '../services/filmeService';

export function useFilmes(idCinema?: number) {
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [busca, setBusca] = useState('');

  const generos = useMemo(() => extrairGeneros(FILMES), []);

  const filmesEmCartaz = useMemo(
    () => filtrarFilmesEmCartaz(FILMES, SESSOES, generoSelecionado, busca, idCinema),
    [generoSelecionado, busca, idCinema],
  );

  const filmesEmBreve = useMemo(
    () => filtrarFilmesEmBreve(FILMES, SESSOES, generoSelecionado, busca, idCinema),
    [generoSelecionado, busca, idCinema],
  );

  const filmeDestaque = filmesEmCartaz[0] ?? FILMES[0];

  return {
    filmeDestaque,
    filmesEmCartaz,
    filmesEmBreve,
    generos,
    generoSelecionado,
    setGeneroSelecionado,
    busca,
    setBusca,
  };
}
