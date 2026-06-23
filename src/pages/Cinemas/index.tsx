import { useState } from 'react';
import { Navbar, MobileMenu } from '../../components/cinema';
import * as S from './CinemasPage.styles';

const SLIDES = [
  {
    tag: '01 · Objetivo',
    title: 'Problema modelado',
    summary:
      'O CINEFESP simula um sistema real de cinema: catálogo, sessões, assentos, carrinho, pedidos, bomboniere e avaliações de filmes.',
    code: ['Cinema', 'Sessao', 'Pedido', 'Ingresso'],
    items: [
      'O sistema não funciona apenas como cadastro.',
      'As ações principais passam por regras de negócio.',
      'O usuário compra ingressos, junta produtos e acompanha histórico.',
      'O projeto mostra interação entre objetos do domínio.',
    ],
  },
  {
    tag: '02 · Organização',
    title: 'Camadas do backend',
    summary:
      'A regra de negócio fica separada da API HTTP e do banco. Isso facilita explicar onde cada responsabilidade acontece.',
    code: ['domain', 'application', 'infra', 'presentation'],
    items: [
      'domain concentra classes como Sessao, Usuario e Avaliacao.',
      'application concentra os casos de uso do sistema.',
      'infra implementa repositórios com Prisma.',
      'presentation recebe requisições e chama os use cases.',
    ],
  },
  {
    tag: '03 · Compra',
    title: 'Fluxo principal: finalizar compra',
    summary:
      'A compra foi centralizada em um fluxo transacional que cria pedido, ingressos e itens de bomboniere juntos.',
    code: ['FinalizarCompraUseCase', 'POST /pedidos/finalizar', 'Prisma transaction'],
    items: [
      'Valida usuário, sessão, filme, assentos e tipo de ingresso.',
      'Permite selecionar múltiplos assentos no mesmo pedido.',
      'Aplica classificação indicativa pela idade do usuário.',
      'Aplica limite de meia-entrada por sessão.',
      'Baixa estoque e emite ingressos na mesma operação.',
    ],
  },
  {
    tag: '04 · Carrinho',
    title: 'Pedido com ingresso e bomboniere',
    summary:
      'O carrinho permite juntar produtos e ingressos para fechar tudo no mesmo pedido, com histórico real na conta.',
    code: ['CartProvider', 'CartDrawer', 'PedidoRepository'],
    items: [
      'Produtos podem ter variações e quantidade.',
      'Ingressos ficam vinculados à sessão e aos assentos selecionados.',
      'O pedido pertence obrigatoriamente ao usuário logado.',
      'A conta lista pedidos reais retornados pelo backend.',
    ],
  },
  {
    tag: '05 · Cancelamento',
    title: 'Cancelar pedido de verdade',
    summary:
      'Cancelar deixou de ser só alterar status. O sistema desfaz efeitos do pedido dentro do domínio.',
    code: ['CancelarPedidoUseCase', 'cancelWithRestock', 'status CANCELADO'],
    items: [
      'Bloqueia cancelar o mesmo pedido duas vezes.',
      'Cancela os ingressos associados ao pedido.',
      'Devolve estoque dos produtos comprados.',
      'Também devolve produtos internos de combos.',
    ],
  },
  {
    tag: '06 · Avaliações',
    title: 'Avaliar exige ter assistido',
    summary:
      'A avaliação possui regra própria: não basta estar logado, o usuário precisa ter assistido ao filme.',
    code: ['Avaliacao', 'PoliticaDeElegibilidade', 'UpdateReviewUseCase'],
    items: [
      'Nota precisa ser inteira de 1 a 5.',
      'Usuário só avalia filme com ingresso de sessão passada.',
      'Cada usuário tem uma avaliação por filme.',
      'Usuário só edita ou exclui a própria avaliação.',
    ],
  },
  {
    tag: '07 · Catálogo',
    title: 'Ranking e estado dos filmes',
    summary:
      'O catálogo usa classes para calcular estado, média, distribuição e ranking ponderado dos filmes.',
    code: ['FilmeCatalogo', 'EstatisticaAvaliacoes', 'RankingCatalogo'],
    items: [
      'Filme sabe se está em breve, em cartaz ou encerrado.',
      'A média vem da distribuição das avaliações.',
      'O ranking usa nota ponderada para reduzir distorções.',
      'O detalhe do filme mostra elegibilidade do usuário.',
    ],
  },
];

const DOMAIN_CLASSES = [
  ['Sessao', 'valida sessão aberta, disponibilidade, meia-entrada e preço.'],
  ['Usuario', 'calcula idade usada na classificação indicativa.'],
  ['Avaliacao', 'valida nota e criação de avaliação elegível.'],
  ['FilmeCatalogo', 'calcula estado do filme e expõe estatísticas.'],
  ['RankingCatalogo', 'ordena filmes por nota ponderada.'],
  ['FinalizarCompraUseCase', 'coordena pedido, ingresso, estoque e regras de compra.'],
];

const TALKING_POINTS = [
  'Começar explicando que o domínio escolhido foi um cinema universitário.',
  'Mostrar que a compra é a regra mais completa do sistema.',
  'Citar que rotas e controllers não guardam a regra principal; eles acionam use cases.',
  'Usar avaliação e ranking como exemplos de lógica além de cadastro.',
];

export function CinemasPage() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <S.Main>
      <Navbar onMenuOpen={() => setMenuAberto(true)} />

      <MobileMenu aberto={menuAberto} onFechar={() => setMenuAberto(false)} />

      <S.Content>
        <S.Hero>
          <S.Eyebrow>Apresentação do projeto</S.Eyebrow>
          <S.HeroTitle>Como o CINEFESP aplica Programação Orientada a Objetos.</S.HeroTitle>
          <S.HeroLede>
            Navegando por nossas classes, métodos e regras de negócio implementadas:
            compra de ingressos, pedidos, estoque, avaliações e ranking de filmes.
          </S.HeroLede>
        </S.Hero>

        <S.Snapshot>
          <S.SnapshotItem>
            <span>Camadas</span>
            <strong>4</strong>
          </S.SnapshotItem>
          <S.SnapshotItem>
            <span>Fluxo central</span>
            <strong>Compra</strong>
          </S.SnapshotItem>
          <S.SnapshotItem>
            <span>Domínios fortes</span>
            <strong>5</strong>
          </S.SnapshotItem>
        </S.Snapshot>

        <S.DomainPanel>
          <S.PanelTitle>Classes e métodos</S.PanelTitle>
          <S.DomainGrid>
            {DOMAIN_CLASSES.map(([name, description]) => (
              <S.DomainCard key={name}>
                <strong>{name}</strong>
                <span>{description}</span>
              </S.DomainCard>
            ))}
          </S.DomainGrid>
        </S.DomainPanel>

        <S.CinemaList>
          {SLIDES.map((slide) => (
            <S.CinemaRow key={slide.tag}>
              <S.ScreenCol className="screen-col">
                <S.Screen>
                  <S.ScreenLabel>
                    <b>{slide.tag}</b>
                  </S.ScreenLabel>
                  <S.CodeList>
                    {slide.code.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </S.CodeList>
                </S.Screen>
              </S.ScreenCol>

              <S.Info>
                <S.Campus>{slide.tag}</S.Campus>
                <S.CinemaName>{slide.title}</S.CinemaName>
                <S.Story>{slide.summary}</S.Story>
                <S.RuleList>
                  {slide.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </S.RuleList>
              </S.Info>
            </S.CinemaRow>
          ))}
        </S.CinemaList>

        <S.Pitch>
          <S.PanelTitle>Fala pronta para abrir a explicação</S.PanelTitle>
          <p>
            “O CINEFESP foi pensado como um sistema de cinema com regras reais. A parte mais importante
            é a compra: o usuário seleciona sessão, múltiplos assentos e produtos; o backend valida
            idade, classificação indicativa, meia-entrada, estoque e assentos ocupados; depois cria
            pedido, itens e ingressos em uma única operação. Isso mostra POO porque as regras ficam em
            classes e casos de uso, não espalhadas só nas rotas.”
          </p>
          <S.TalkingList>
            {TALKING_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </S.TalkingList>
        </S.Pitch>
      </S.Content>
    </S.Main>
  );
}
