import { useEffect, useMemo, useState } from 'react';
import type { Produto } from '../types/cinema';
import { PRODUTOS } from '../data/mock';
import { fetchProdutos } from '../services/api';
import { extrairCategorias, filtrarProdutos } from '../services/produtoService';
import { config } from '../config';

export function useProdutos(idCinema?: number) {
  const [allProdutos, setAllProdutos]               = useState<Produto[]>([]);
  const [isLoading, setIsLoading]                   = useState(true);
  const [error, setError]                           = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => {
    if (config.useMock) {
      setAllProdutos(PRODUTOS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchProdutos()
      .then(setAllProdutos)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categorias = useMemo(
    () => extrairCategorias(allProdutos, idCinema),
    [allProdutos, idCinema],
  );

  const produtosFiltrados = useMemo(
    () => filtrarProdutos(allProdutos, categoriaSelecionada, idCinema),
    [allProdutos, categoriaSelecionada, idCinema],
  );

  return { produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada, isLoading, error };
}
