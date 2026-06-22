import { useState } from 'react';
import type { Filme, Sessao } from '../../../types/cinema';
import { useCinema, useFilmes, useSessoes } from '../../../hooks';
import { FilmeModal, Hero, MobileMenu, Navbar, SecaoEmBreve, SecaoEmCartaz } from '../../../components/cinema';
import { useCart } from '../../../contexts/useCart';
import * as S from './CinemaHomePage.styles';

export function CinemaHomePage() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();
  const { abrirCarrinho, vincularSessao } = useCart();
  const idCinema = cinemaSelecionado?.idCinema;

  const { sessoes, sessoesPorFilme, error: sessoesError } = useSessoes(idCinema);
  const { filmeDestaque, filmesEmCartaz, filmesEmBreve, generos, generoSelecionado, setGeneroSelecionado, busca, setBusca, error } = useFilmes(idCinema, sessoes);

  function handleBuy(filme: Filme, sessao: Sessao) {
    const cinemaDaSessao = cinemas.find(cinema => cinema.idCinema === sessao.idCinema);
    vincularSessao(sessao, filme.titulo, cinemaDaSessao?.nome ?? cinemaSelecionado?.nome);
    setFilmeSelecionado(null);
    abrirCarrinho();
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
      </S.Content>

      {filmeSelecionado && (
        <FilmeModal
          filme={filmeSelecionado}
          sessoes={sessoesPorFilme[filmeSelecionado.idFilme] ?? []}
          onClose={() => setFilmeSelecionado(null)}
          onBuy={handleBuy}
        />
      )}
    </S.Main>
  );
}
