import { useState } from 'react';
import { MobileMenu, Navbar } from '../../components/cinema';
import { useCinema } from '../../hooks';
import { TEAM_MEMBERS } from './mockData';
import * as S from './EquipePage.styles';

export function EquipePage() {
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
          <S.Eyebrow>Créditos finais</S.Eyebrow>
          <S.Title>A equipe por trás da tela.</S.Title>
          <S.Lede>
            Três estudantes da UNIFESP construíram o CINEFESP, e cada um deixou uma marca no projeto (literalmente).
            As pixações em verde são nossa assinatura.
          </S.Lede>
        </S.Hero>

        <S.TeamList>
          {TEAM_MEMBERS.map((member) => (
            <S.TeamRow key={`${member.role}-${member.name}`} $empty={!member.image}>
              <S.PhotoColumn>
                {member.image ? (
                  <S.Photo>
                    <img src={member.image} alt={member.alt} />
                  </S.Photo>
                ) : (
                  <S.EmptyPhoto aria-label="Foto pendente">
                    <S.Avatar viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="38" r="15" />
                      <path d="M24 80 Q50 56 76 80" />
                      <path d="M80 22 l2.4 5.4 5.4 2.4 -5.4 2.4 -2.4 5.4 -2.4 -5.4 -5.4 -2.4 5.4 -2.4Z" />
                      <path d="M18 32 l1.7 3.8 3.8 1.7 -3.8 1.7 -1.7 3.8 -1.7 -3.8 -3.8 -1.7 3.8 -1.7Z" />
                    </S.Avatar>
                    <span>+ foto pixada</span>
                  </S.EmptyPhoto>
                )}
              </S.PhotoColumn>

              <S.InfoColumn>
                <S.Role>{member.role}</S.Role>
                <S.Name>{member.name}</S.Name>
                <S.Bio>{member.bio}</S.Bio>
                <S.Github href={member.github} target="_blank" rel="noreferrer">
                  github ↗
                </S.Github>
              </S.InfoColumn>
            </S.TeamRow>
          ))}
        </S.TeamList>
      </S.Content>
    </S.Main>
  );
}
