import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Produto } from '../../types/cinema';
import { formataData, formataHora } from '../../utils/formatters';
import { useCinema, useProdutos } from '../../hooks';
import { Navbar, MobileMenu, ProdutoCard, ProdutoModal } from '../../components/cinema';
import { useCart } from '../../contexts/useCart';
import * as S from './BombonierePage.styles';

export function BombonierePage() {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();
  const idCinema = cinemaSelecionado?.idCinema;
  const { produtosFiltrados, categorias, categoriaSelecionada, setCategoriaSelecionada } = useProdutos(idCinema);
  const { sessaoVinculada, desvincularSessao } = useCart();

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
          <p>Adicione itens ao seu pedido antes de finalizar a compra do ingresso.</p>
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

        <S.Chips>
          {categorias.map(cat => (
            <S.Chip key={cat} $active={categoriaSelecionada === cat} onClick={() => setCategoriaSelecionada(cat)}>
              {cat}
            </S.Chip>
          ))}
        </S.Chips>

        {produtosFiltrados.length === 0 ? (
          <S.Empty>
            {cinemaSelecionado
              ? 'Nenhum produto disponível para este cinema.'
              : 'Selecione um cinema para ver o cardápio.'}
          </S.Empty>
        ) : (
          <S.Grid>
            {produtosFiltrados.map(produto => (
              <ProdutoCard key={produto.idProduto} produto={produto} onClick={() => setProdutoSelecionado(produto)} />
            ))}
          </S.Grid>
        )}
      </S.Content>

      {produtoSelecionado && (
        <ProdutoModal produto={produtoSelecionado} onClose={() => setProdutoSelecionado(null)} />
      )}
    </S.Main>
  );
}
