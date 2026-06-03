import { useState } from 'react';
import type { Filme, Produto, Sessao } from '../../../types/cinema';
import { formataHora, formataPreco } from '../../../utils/formatters';
import { useCinema, useFilmes, useProdutos, useSessoes } from '../../../hooks';
import { FilmeModal, Hero, Navbar, ProdutoModal, SecaoBomboniere, SecaoEmBreve, SecaoEmCartaz } from '../../../components/cinema';
import * as S from './CinemaHomePage.styles';

export function CinemaHomePage() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();
  const idCinema = cinemaSelecionado?.idCinema;

  const { filmeDestaque, filmesEmCartaz, filmesEmBreve, generos, generoSelecionado, setGeneroSelecionado, busca, setBusca } = useFilmes(idCinema);
  const { produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada } = useProdutos(idCinema);
  const { sessoesPorFilme } = useSessoes(idCinema);

  function handleBuy(filme: Filme, sessao: Sessao) {
    alert(`Redirecionando para compra:\n${filme.titulo}\n${formataHora(sessao.dataHora)} · ${sessao.formato} · ${formataPreco(sessao.precoBase)}`);
  }

  return (
    <S.Main>
      <Navbar
        search={busca}
        onSearchChange={setBusca}
        cinemas={cinemas}
        cinemaSelecionado={cinemaSelecionado}
        onCinemaChange={setCinemaSelecionado}
      />

      {filmeDestaque && (
        <Hero filme={filmeDestaque} onShowSessions={() => setFilmeSelecionado(filmeDestaque)} />
      )}

      <S.Content>
        <SecaoEmCartaz
          filmes={filmesEmCartaz}
          generos={generos}
          generoSelecionado={generoSelecionado}
          onGeneroChange={setGeneroSelecionado}
          sessoesPorFilme={sessoesPorFilme}
          onFilmeClick={setFilmeSelecionado}
        />
        <SecaoEmBreve filmes={filmesEmBreve} onFilmeClick={setFilmeSelecionado} />
        <SecaoBomboniere
          produtos={produtosFiltrados}
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          onCategoriaChange={setCategoriaSelecionada}
          onProdutoClick={setProdutoSelecionado}
        />
      </S.Content>

      {filmeSelecionado && (
        <FilmeModal
          filme={filmeSelecionado}
          sessoes={sessoesPorFilme[filmeSelecionado.idFilme] ?? []}
          onClose={() => setFilmeSelecionado(null)}
          onBuy={handleBuy}
        />
      )}

      {produtoSelecionado && (
        <ProdutoModal produto={produtoSelecionado} onClose={() => setProdutoSelecionado(null)} />
      )}
    </S.Main>
  );
}
