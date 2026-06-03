import { useMemo, useState } from 'react';
import { PRODUTOS } from '../data/mock';
import { extrairCategorias, filtrarProdutos } from '../services/produtoService';

export function useProdutos(idCinema?: number) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const categorias = useMemo(
    () => extrairCategorias(PRODUTOS, idCinema),
    [idCinema],
  );

  const produtosFiltrados = useMemo(
    () => filtrarProdutos(PRODUTOS, categoriaSelecionada, idCinema),
    [categoriaSelecionada, idCinema],
  );

  return { produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada };
}
