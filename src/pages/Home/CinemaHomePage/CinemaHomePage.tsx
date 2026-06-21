import { useState } from 'react';
import type { Filme, Produto, Sessao } from '../../../types/cinema';
import { formataHora, formataPreco } from '../../../utils/formatters';
import { useCinema, useFilmes, useProdutos, useSessoes } from '../../../hooks';
import { FilmeModal, Hero, MobileMenu, Navbar, ProdutoModal, SecaoBomboniere, SecaoEmBreve, SecaoEmCartaz } from '../../../components/cinema';
import * as S from './CinemaHomePage.styles';

export function CinemaHomePage() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();
  const idCinema = cinemaSelecionado?.idCinema;

  const { sessoes, sessoesPorFilme, error: sessoesError } = useSessoes(idCinema);
  const { filmeDestaque, filmesEmCartaz, filmesEmBreve, generos, generoSelecionado, setGeneroSelecionado, busca, setBusca, error } = useFilmes(idCinema, sessoes);
  const { produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada } = useProdutos(idCinema);

  function handleBuy(filme: Filme, sessao: Sessao) {
    alert(`Redirecionando para compra:\n${filme.titulo}\n${formataHora(sessao.dataHora)} · ${sessao.formato} · ${formataPreco(sessao.precoBase)}`);
  }

  const pageError = error ?? sessoesError;

  if (pageError) {
    return (
      <S.Main>
        <S.StatusContainer>
          <S.ErrorMessage>Não foi possível carregar os dados. Tente novamente mais tarde.</S.ErrorMessage>
          <S.ErrorMessage style={{ fontSize: 12, opacity: 0.6 }}>{pageError}</S.ErrorMessage>
        </S.StatusContainer>
      </S.Main>
    );
  }

  return (
    <S.Main>
      <Navbar
        search={busca}
        onSearchChange={setBusca}
        cinemas={cinemas}
        cinemaSelecionado={cinemaSelecionado}
        onCinemaChange={setCinemaSelecionado}
        onMenuOpen={() => setMenuAberto(true)}
      />

      <MobileMenu
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
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
