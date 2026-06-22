import { useState } from 'react';
import { Navbar, MobileMenu } from '../../components/cinema';
import { useCinema } from '../../hooks';
import * as S from './CinemasPage.styles';

const CINEMAS_DATA = [
  {
    id: 1,
    sala: 'Sala 1',
    ratio: '2.39:1',
    campus: 'Campus São Paulo · Vila Clementino',
    nome: 'CINEFESP Clementino',
    historia:
      'A primeira sala da rede nasceu num antigo auditório da reitoria, reformado por alunos de cinema em 1998. Começou exibindo clássicos em fitas emprestadas e hoje é a sala principal: a maior tela, as estreias e as sessões-debate que viraram tradição nas quartas à noite.',
    fundada: '1998',
    salas: '3',
    lugares: '240',
  },
  {
    id: 2,
    sala: 'Sala 2',
    ratio: '1.85:1',
    campus: 'Campus Baixada Santista · Santos',
    nome: 'CINEFESP Santos',
    historia:
      'De frente para o mar, a sala de Santos abriu em 2011 dentro do prédio da Saúde. É a menor das três e a mais experimental: dedica metade da programação a documentários, curtas e mostras temáticas organizadas pelos próprios estudantes.',
    fundada: '2011',
    salas: '1',
    lugares: '90',
  },
  {
    id: 3,
    sala: 'Sala 3',
    ratio: '2.39:1',
    campus: 'Campus São José dos Campos · Eugênio de Melo',
    nome: 'CINEFESP São José',
    historia:
      'A caçula da rede, inaugurada em 2019 no campus de tecnologia. Pensada por quem entende de engenharia, é a sala mais equipada: projeção a laser, som imersivo e a bomboniere mais movimentada das três. É também onde este site foi feito.',
    fundada: '2019',
    salas: '2',
    lugares: '160',
  },
];

export function CinemasPage() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { cinemas, cinemaSelecionado, setCinemaSelecionado } = useCinema();

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
        <S.Hero>
          <S.Eyebrow>Nossas salas</S.Eyebrow>
          <S.HeroTitle>O cinema que mora dentro da universidade.</S.HeroTitle>
          <S.HeroLede>
            Três salas espalhadas pelos campi da UNIFESP, cada uma com sua própria história — mas todas
            movidas pela mesma ideia: ocupar o tempo livre da comunidade com boas sessões e preço de estudante.
          </S.HeroLede>
        </S.Hero>

        <S.CinemaList>
          {CINEMAS_DATA.map((cinema) => (
            <S.CinemaRow key={cinema.id}>
              <S.ScreenCol className="screen-col">
                <S.Screen>
                  <S.ScreenLabel>
                    <b>{cinema.sala}</b> · {cinema.ratio}
                  </S.ScreenLabel>
                </S.Screen>
              </S.ScreenCol>

              <S.Info>
                <S.Campus>{cinema.campus}</S.Campus>
                <S.CinemaName>{cinema.nome}</S.CinemaName>
                <S.Story>{cinema.historia}</S.Story>
                <S.Meta>
                  <S.MetaItem>
                    <S.MetaLabel>Fundada</S.MetaLabel>
                    <S.MetaValue>{cinema.fundada}</S.MetaValue>
                  </S.MetaItem>
                  <S.MetaItem>
                    <S.MetaLabel>Salas</S.MetaLabel>
                    <S.MetaValue>{cinema.salas}</S.MetaValue>
                  </S.MetaItem>
                  <S.MetaItem>
                    <S.MetaLabel>Lugares</S.MetaLabel>
                    <S.MetaValue>{cinema.lugares}</S.MetaValue>
                  </S.MetaItem>
                </S.Meta>
              </S.Info>
            </S.CinemaRow>
          ))}
        </S.CinemaList>
      </S.Content>
    </S.Main>
  );
}
