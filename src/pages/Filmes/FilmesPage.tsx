import { useEffect, useMemo, useState } from 'react';
import type { Filme, FilmeId } from '../../types/cinema';
import { FILMES } from '../../data/mock';
import { fetchFilmes } from '../../services/api';
import { config } from '../../config';
import { Navbar, MobileMenu } from '../../components/cinema';
import { getCatalogoExtra } from './catalogoData';
import { CatalogControls } from './components/CatalogControls';
import { FilmeCatalogCard } from './components/FilmeCatalogCard';
import { FilmeDetailModal } from './components/FilmeDetailModal';
import { FilmesHero } from './components/FilmesHero';
import { getEstado } from './filmesUtils';
import type { EstadoFilter, SortKey } from './types';
import * as S from './FilmesPage.styles';

export function FilmesPage() {
  const [filmes, setFilmes] = useState<Filme[]>(() => config.useMock ? FILMES : []);
  const [sort, setSort] = useState<SortKey>('nota');
  const [genero, setGenero] = useState('Todos');
  const [estado, setEstado] = useState<EstadoFilter>('todos');
  const [selectedId, setSelectedId] = useState<FilmeId | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (config.useMock) return;
    fetchFilmes().then(setFilmes).catch(() => {});
  }, []);

  const rankedFilmes = useMemo(
    () => [...filmes].sort((a, b) => b.nota - a.nota).map((filme, i) => ({ ...filme, rank: i + 1 })),
    [filmes],
  );

  const generos = useMemo(() => ['Todos', ...new Set(filmes.map(filme => filme.genero))], [filmes]);

  const displayFilmes = useMemo(() => {
    let list = rankedFilmes.filter(filme => {
      if (genero !== 'Todos' && filme.genero !== genero) return false;
      if (estado !== 'todos' && getEstado(filme) !== estado) return false;
      return true;
    });

    if (sort === 'recentes') {
      list = [...list].sort(
        (a, b) => new Date(b.dataLancamento).getTime() - new Date(a.dataLancamento).getTime(),
      );
    }

    if (sort === 'avaliados') {
      list = [...list].sort(
        (a, b) => getCatalogoExtra(b.idFilme).count - getCatalogoExtra(a.idFilme).count,
      );
    }

    return list;
  }, [rankedFilmes, genero, estado, sort]);

  const hero = rankedFilmes[0];
  const selectedFilme = selectedId != null
    ? rankedFilmes.find(filme => filme.idFilme === selectedId)
    : null;

  return (
    <S.Main>
      <Navbar onMenuOpen={() => setMenuAberto(true)} />

      <MobileMenu aberto={menuAberto} onFechar={() => setMenuAberto(false)} />

      <S.Content>
        <S.PageHead>
          <S.Eyebrow>Catálogo</S.Eyebrow>
          <S.Title>Filmes</S.Title>
          <S.Lede>
            Todo o acervo da CINEFESP, ranqueado pela nota da comunidade. Veja informações, leia avaliações e avalie os filmes que você já assistiu na nossa rede.
          </S.Lede>
        </S.PageHead>

        {hero && <FilmesHero filme={hero} onDetails={() => setSelectedId(hero.idFilme)} />}

        <CatalogControls
          sort={sort}
          genero={genero}
          estado={estado}
          generos={generos}
          total={displayFilmes.length}
          onSortChange={setSort}
          onGeneroChange={setGenero}
          onEstadoChange={setEstado}
        />

        <S.Grid>
          {displayFilmes.map(filme => (
            <FilmeCatalogCard
              key={filme.idFilme}
              filme={filme}
              onSelect={() => setSelectedId(filme.idFilme)}
            />
          ))}
        </S.Grid>
      </S.Content>

      {selectedFilme && (
        <FilmeDetailModal
          key={selectedFilme.idFilme}
          filme={selectedFilme}
          onClose={() => setSelectedId(null)}
        />
      )}
    </S.Main>
  );
}
