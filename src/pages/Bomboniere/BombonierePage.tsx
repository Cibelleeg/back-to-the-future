import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formataData, formataHora } from '../../utils/formatters';
import { useCinema, useProdutos } from '../../hooks';
import { Navbar, MobileMenu } from '../../components/cinema';
import { ProdutoGrupoCard } from '../../components/cinema/ProdutoGrupoCard';
import { useCart } from '../../contexts/useCart';
import { groupProdutos } from './groupProducts';
import * as S from './BombonierePage.styles';

export function BombonierePage() {
  const [menuAberto, setMenuAberto] = useState(false);

  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();
  const idCinema = cinemaSelecionado?.idCinema;
  const { allProdutos, produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada } = useProdutos(idCinema);
  const { sessaoVinculada, desvincularSessao } = useCart();

  const gruposCombos = useMemo(
    () => groupProdutos(allProdutos.filter(p => p.categoria === 'Combo')),
    [allProdutos],
  );

  const gruposCardapio = useMemo(
    () => groupProdutos(produtosFiltrados.filter(p => p.categoria !== 'Combo')),
    [produtosFiltrados],
  );

  const gruposComSeletores = useMemo(
    () => gruposCardapio.filter(group => group.tamanhos.length > 1 || group.tipos.length > 1),
    [gruposCardapio],
  );

  const gruposSemSeletores = useMemo(
    () => gruposCardapio.filter(group => group.tamanhos.length <= 1 && group.tipos.length <= 1),
    [gruposCardapio],
  );

  const categoriasFiltro = useMemo(
    () => categorias.filter(c => c !== 'Combo'),
    [categorias],
  );

  return (
    <S.Main>
      <Navbar
        cinemas={cinemas}
        cinemaSelecionado={cinemaSelecionado}
        onCinemaChange={setCinemaSelecionado}
        onMenuOpen={() => setMenuAberto(true)}
      />

      <MobileMenu
        aberto={menuAberto}
        onFechar={() => setMenuAberto(false)}
        cinemas={cinemas}
        cinemaSelecionado={cinemaSelecionado}
        onCinemaChange={setCinemaSelecionado}
      />

      <S.Content>
        <S.PageHeader>
          <h1>Bomboniere</h1>
          <p>Adicione itens ao seu pedido antes de finalizar a compra do ingresso e troque por seus produtos na bomboniere do cinema!</p>
        </S.PageHeader>

        {sessaoVinculada ? (
          <S.SessaoBanner $linked>
            <S.BannerIcon $linked>🎬</S.BannerIcon>
            <S.BannerBody>
              <strong>{sessaoVinculada.filmeTitulo}</strong>
              <span>
                {formataData(sessaoVinculada.sessao.dataHora)} · {formataHora(sessaoVinculada.sessao.dataHora)} · {sessaoVinculada.sessao.formato} {sessaoVinculada.sessao.idioma}
              </span>
            </S.BannerBody>
            <S.BannerAction>
              <S.BtnPurple as={Link} to="/">Trocar sessão</S.BtnPurple>
              <S.IconBtn onClick={desvincularSessao} aria-label="Remover sessão">×</S.IconBtn>
            </S.BannerAction>
          </S.SessaoBanner>
        ) : (
          <S.SessaoBanner $linked={false}>
            <S.BannerIcon $linked={false}>🎟️</S.BannerIcon>
            <S.BannerBody>
              <strong>Nenhuma sessão selecionada</strong>
              <span>Escolha um filme e uma sessão para vincular ao seu pedido antes de finalizar.</span>
            </S.BannerBody>
            <S.BannerAction>
              <S.BtnOutline as={Link} to="/">Escolher filme</S.BtnOutline>
            </S.BannerAction>
          </S.SessaoBanner>
        )}

        {/* ── Cardápio ── */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>Cardápio</S.SectionTitle>
            <S.SectionCount>{gruposCardapio.length} itens</S.SectionCount>
          </S.SectionHeader>

          <S.Chips>
            {categoriasFiltro.map(cat => (
              <S.Chip key={cat} $active={categoriaSelecionada === cat} onClick={() => setCategoriaSelecionada(cat)}>
                {cat}
              </S.Chip>
            ))}
          </S.Chips>

          {gruposCardapio.length === 0 ? (
            <S.Empty>
              {cinemaSelecionado
                ? 'Nenhum produto disponível para este cinema.'
                : 'Selecione um cinema para ver o cardápio.'}
            </S.Empty>
          ) : (
            <S.MenuGroups>
              {gruposComSeletores.length > 0 && (
                <S.MenuGroup>
                  <S.SubSectionHeader>
                    <S.SubSectionTitle>Personalizáveis</S.SubSectionTitle>
                    <S.SectionCount>{gruposComSeletores.length} itens</S.SectionCount>
                  </S.SubSectionHeader>
                  <S.Grid>
                    {gruposComSeletores.map(group => (
                      <ProdutoGrupoCard key={group.nome} group={group} />
                    ))}
                  </S.Grid>
                </S.MenuGroup>
              )}

              {gruposSemSeletores.length > 0 && (
                <S.MenuGroup>
                  <S.SubSectionHeader>
                    <S.SubSectionTitle>Sem variações</S.SubSectionTitle>
                    <S.SectionCount>{gruposSemSeletores.length} itens</S.SectionCount>
                  </S.SubSectionHeader>
                  <S.Grid>
                    {gruposSemSeletores.map(group => (
                      <ProdutoGrupoCard key={group.nome} group={group} />
                    ))}
                  </S.Grid>
                </S.MenuGroup>
              )}
            </S.MenuGroups>
          )}
        </S.Section>

        {/* ── Combos ── */}
        {gruposCombos.length > 0 && (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>Combos</S.SectionTitle>
              <S.SectionCount>{gruposCombos.length} opções</S.SectionCount>
            </S.SectionHeader>
            <S.ComboGrid>
              {gruposCombos.map(group => (
                <ProdutoGrupoCard key={group.nome} group={group} />
              ))}
            </S.ComboGrid>
          </S.Section>
        )}
      </S.Content>
    </S.Main>
  );
}
