import { useMemo, useState } from 'react';
import { FILMES, PRODUTOS, SESSOES } from '../../data/mock';
import type { Filme, Produto, Sessao } from '../../types/cinema';
import { filmeCombinaComBusca, formataHora, formataPreco } from '../../utils/formatters';
import { FilmeCard } from '../../components/cinema/FilmeCard';
import { FilmeCardBreve } from '../../components/cinema/FilmeCardBreve';
import { FilmeModal } from '../../components/cinema/FilmeModal';
import { Hero } from '../../components/cinema/Hero';
import { Navbar } from '../../components/cinema/Navbar';
import { ProdutoCard } from '../../components/cinema/ProdutoCard';
import { ProdutoModal } from '../../components/cinema/ProdutoModal';

const DIAS_EM_BREVE = 7;

function normalizarData(data: Date) {
  const dataNormalizada = new Date(data);
  dataNormalizada.setHours(0, 0, 0, 0);
  return dataNormalizada;
}

function filtrarFilmesBase(filmes: Filme[], genero: string, busca: string) {
  return filmes.filter((filme) => {
    const generoValido = genero === 'Todos' || filme.genero === genero;
    const buscaValida = filmeCombinaComBusca(filme.titulo, busca);

    return generoValido && buscaValida;
  });
}

function filtrarFilmesEmCartaz(filmes: Filme[], genero: string, busca: string) {
  const hoje = normalizarData(new Date());

  return filtrarFilmesBase(filmes, genero, busca).filter((filme) => {
    const dataLancamento = normalizarData(new Date(filme.dataLancamento));
    const dataFimCartaz = normalizarData(new Date(filme.dataFimCartaz));

    return dataLancamento <= hoje && dataFimCartaz >= hoje;
  });
}

function filtrarFilmesEmBreve(filmes: Filme[], genero: string, busca: string) {
  const hoje = normalizarData(new Date());

  const limiteEmBreve = new Date(hoje);
  limiteEmBreve.setDate(limiteEmBreve.getDate() + DIAS_EM_BREVE);

  return filtrarFilmesBase(filmes, genero, busca).filter((filme) => {
    const dataLancamento = normalizarData(new Date(filme.dataLancamento));

    return dataLancamento > hoje && dataLancamento <= limiteEmBreve;
  });
}

function filtrarProdutos(produtos: Produto[], categoria: string) {
  return produtos.filter((produto) => {
    return categoria === 'Todos' || produto.categoria === categoria;
  });
}

export function CinemaHomePage() {
  const [filmeSelecionado, setFilmeSelecionado] = useState<Filme | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [busca, setBusca] = useState('');

  const generos = useMemo(() => {
    return ['Todos', ...new Set(FILMES.map((filme) => filme.genero))];
  }, []);

  const categorias = useMemo(() => {
    return ['Todos', ...new Set(PRODUTOS.map((produto) => produto.categoria))];
  }, []);

  const filmesEmCartaz = useMemo(() => {
    return filtrarFilmesEmCartaz(FILMES, generoSelecionado, busca);
  }, [generoSelecionado, busca]);

  const filmesEmBreve = useMemo(() => {
    return filtrarFilmesEmBreve(FILMES, generoSelecionado, busca);
  }, [generoSelecionado, busca]);

  const produtosFiltrados = useMemo(() => {
    return filtrarProdutos(PRODUTOS, categoriaSelecionada);
  }, [categoriaSelecionada]);

  const sessoesPorFilme = useMemo(() => {
    return SESSOES.reduce<Record<number, Sessao[]>>((acc, sessao) => {
      acc[sessao.idFilme] = [...(acc[sessao.idFilme] ?? []), sessao];
      return acc;
    }, {});
  }, []);

  const filmeDestaque = filmesEmCartaz[0] ?? FILMES[0];

  function handleBuy(filme: Filme, sessao: Sessao) {
    alert(
      `Redirecionando para compra:\n${filme.titulo}\n${formataHora(sessao.dataHora)} · ${sessao.formato} · ${formataPreco(sessao.precoBase)}`,
    );
  }

  return (
    <main className="app">
      <Navbar search={busca} onSearchChange={setBusca} />

      {filmeDestaque && (
        <Hero
          filme={filmeDestaque}
          onShowSessions={() => setFilmeSelecionado(filmeDestaque)}
        />
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

            <a href="#">
              Ver todos <i className="fa-solid fa-angle-right"></i>
            </a>
          </header>

          {filmesEmCartaz.length === 0 ? (
            <p className="empty-message">Nenhum filme em cartaz encontrado.</p>
          ) : (
            <div className="movies-grid">
              {filmesEmCartaz.map((filme) => (
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
                <span className="section__dot" />
                <h2>Em Breve</h2>
              </div>
            </div>

            <a href="#">
              Ver todos <i className="fa-solid fa-angle-right"></i>
            </a>
          </header>

          {filmesEmBreve.length === 0 ? (
            <p className="empty-message">Nenhum lançamento próximo.</p>
          ) : (
            <div className="movies-grid">
              {filmesEmBreve.map((filme) => (
                <FilmeCardBreve
                  key={filme.idFilme}
                  filme={filme}
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

            <a href="#">
              Ver cardápio <i className="fa-solid fa-angle-right"></i>
            </a>
          </header>

          <div className="products-grid">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.idProduto}
                produto={produto}
                onClick={() => setProdutoSelecionado(produto)}
              />
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

      {produtoSelecionado && (
        <ProdutoModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
        />
      )}
    </main>
  );
}