import { useMemo, useState } from 'react';
import { FILMES, PRODUTOS, SESSOES } from '../../data/mock';
import type { Filme, Produto, Sessao } from '../../types/cinema';
import { filmeCombinaComBusca, formataHora, formataPreco } from '../../utils/formatters';
import { FilmeCard } from '../../components/cinema/FilmeCard';
import { FilmeModal } from '../../components/cinema/FilmeModal';
import { Hero } from '../../components/cinema/Hero';
import { Navbar } from '../../components/cinema/Navbar';
import { ProdutoCard } from '../../components/cinema/ProdutoCard';

function filtrarFilmes(filmes: Filme[], genero: string, busca: string) {
  return filmes.filter((filme) => {
    const generoValido = genero === 'Todos' || filme.genero === genero;
    const buscaValida = filmeCombinaComBusca(filme.titulo, busca);

    return generoValido && buscaValida;
  });
}

function filtrarProdutos(produtos: Produto[], categoria: string) {
  return produtos.filter((produto) => categoria === 'Todos' || produto.categoria === categoria);
}

export function CinemaHomePage() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [busca, setBusca] = useState('');

  const generos = useMemo(() => ['Todos', ...new Set(FILMES.map((filme) => filme.genero))], []);
  const categorias = useMemo(() => ['Todos', ...new Set(PRODUTOS.map((produto) => produto.categoria))], []);

  const filmesFiltrados = useMemo(
    () => filtrarFilmes(FILMES, generoSelecionado, busca),
    [generoSelecionado, busca],
  );

  const produtosFiltrados = useMemo(
    () => filtrarProdutos(PRODUTOS, categoriaSelecionada),
    [categoriaSelecionada],
  );

  const sessoesPorFilme = useMemo(
    () =>
      SESSOES.reduce<Record<number, Sessao[]>>((acc, sessao) => {
        acc[sessao.idFilme] = [...(acc[sessao.idFilme] ?? []), sessao];
        return acc;
      }, {}),
    [],
  );

  const filmeDestaque = FILMES.find((filme) => filme.titulo === 'Duna: Parte Dois') ?? FILMES[0];

  function handleBuy(filme: Filme, sessao: Sessao) {
    alert(
      `Redirecionando para compra:\n${filme.titulo}\n${formataHora(sessao.dataHora)} · ${sessao.formato} · ${formataPreco(sessao.precoBase)}`,
    );
  }

  return (
    <main className="app">
      <Navbar search={busca} onSearchChange={setBusca} />

      {filmeDestaque && (
        <Hero filme={filmeDestaque} onShowSessions={() => setFilmeSelecionado(filmeDestaque)} />
      )}

      <div className="content">
        <section className="section">
          <header className="section__header">
            <div>
              <div className="section__title">
                <span className="section__dot" />
                <h2>Em Cartaz</h2>
              </div>

              <div className="chips">
                {generos.map((genero) => (
                  <button
                    key={genero}
                    className={generoSelecionado === genero ? 'active' : ''}
                    onClick={() => setGeneroSelecionado(genero)}
                  >
                    {genero}
                  </button>
                ))}
              </div>
            </div>

            <a href="#">Ver todos →</a>
          </header>

          {filmesFiltrados.length === 0 ? (
            <p className="empty-message">Nenhum filme encontrado.</p>
          ) : (
            <div className="movies-grid">
              {filmesFiltrados.map((filme) => (
                <FilmeCard
                  key={filme.idFilme}
                  filme={filme}
                  sessoes={sessoesPorFilme[filme.idFilme] ?? []}
                  onClick={() => setFilmeSelecionado(filme)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <header className="section__header">
            <div>
              <div className="section__title">
                <span className="section__line" />
                <h2>Bomboniere</h2>
              </div>

              <div className="chips">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    className={categoriaSelecionada === categoria ? 'active' : ''}
                    onClick={() => setCategoriaSelecionada(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>

            <a href="#">Ver cardápio →</a>
          </header>

          <div className="products-grid">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard key={produto.idProduto} produto={produto} />
            ))}
          </div>
        </section>
      </div>

      {filmeSelecionado && (
        <FilmeModal
          filme={filmeSelecionado}
          sessoes={sessoesPorFilme[filmeSelecionado.idFilme] ?? []}
          onClose={() => setFilmeSelecionado(null)}
          onBuy={handleBuy}
        />
      )}
    </main>
  );
}
