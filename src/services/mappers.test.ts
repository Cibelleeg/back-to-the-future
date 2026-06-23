import { describe, expect, it } from 'vitest';
import type { FilmeDTO, SessaoDTO, CinemaDTO, ProdutoDTO } from './mappers';
import { mapClassificacao, mapCinemaDTO, mapFilmeDTO, mapProdutoDTO, mapSessaoDTO } from './mappers';

function filmeDTO(partial: Partial<FilmeDTO> = {}): FilmeDTO {
  return {
    id: 1,
    title: 'Filme Teste',
    synopsis: 'Sinopse',
    duration: 120,
    ageRating: 12,
    genre: 'Drama',
    releaseDate: '2026-06-01',
    ...partial,
  };
}

describe('mapClassificacao', () => {
  it.each([
    [0, 'L'],
    [10, '10'],
    [12, '12'],
    [14, '14'],
    [16, '16'],
    [18, '18'],
  ] as const)('converte %i -> "%s"', (entrada, esperado) => {
    expect(mapClassificacao(entrada)).toBe(esperado);
  });

  it('retorna "L" para valor desconhecido', () => {
    expect(mapClassificacao(99)).toBe('L');
  });
});

describe('mapFilmeDTO', () => {
  it('mapeia ageRating numerico para classificacao string', () => {
    expect(mapFilmeDTO(filmeDTO({ ageRating: 16 })).classificacao).toBe('16');
    expect(mapFilmeDTO(filmeDTO({ ageRating: 0 })).classificacao).toBe('L');
  });

  it('mapeia title, rating e duration corretamente', () => {
    const result = mapFilmeDTO(filmeDTO({ title: 'Duna', rating: 9.1, duration: 166 }));
    expect(result.titulo).toBe('Duna');
    expect(result.nota).toBeCloseTo(4.55); // rating 0-10 dividido por 2
    expect(result.duracao).toBe(166);
    expect(result.idFilme).toBe(1);
  });

  it('usa notaPonderada quando disponível', () => {
    const result = mapFilmeDTO(filmeDTO({ notaPonderada: 4.68 } as never));
    expect(result.nota).toBe(4.68);
  });

  it('usa defaults para campos opcionais ausentes', () => {
    const result = mapFilmeDTO(filmeDTO());
    expect(result.poster).toBe('');
    expect(result.nota).toBe(0);
    expect(result.dataFimCartaz).toBe('2099-12-31');
  });
});

describe('mapSessaoDTO', () => {
  it('mapeia todos os campos corretamente', () => {
    const dto: SessaoDTO = {
      id: 5,
      movieId: 2,
      roomId: 9,
      cinemaId: 3,
      dateTime: '2026-06-10T20:00',
      language: 'Legendado',
      format: 'IMAX',
      basePrice: 65,
      roomName: 'IMAX 1',
      roomType: 'IMAX',
      totalSeats: 120,
      availableSeats: 80,
    };
    const result = mapSessaoDTO(dto);
    expect(result.idSessao).toBe(5);
    expect(result.idioma).toBe('Legendado');
    expect(result.formato).toBe('IMAX');
    expect(result.precoBase).toBe(65);
  });
});

describe('mapCinemaDTO', () => {
  it('mapeia name e extrai cidade de address', () => {
    const dto: CinemaDTO = {
      id: 1,
      name: 'CineMax Centro',
      address: {
        logradouro: 'Rua das Flores',
        numero: '100',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01001000',
      },
    };
    const result = mapCinemaDTO(dto);
    expect(result.nome).toBe('CineMax Centro');
    expect(result.cidade).toBe('São Paulo');
    expect(result.idCinema).toBe(1);
  });
});

describe('mapProdutoDTO', () => {
  it('mapeia campos e define poster vazio quando ausente', () => {
    const dto: ProdutoDTO = {
      id: 3,
      name: 'Pipoca',
      description: 'Pipoca grande',
      price: 18.9,
      stock: 50,
      category: 'Pipoca',
    };
    const result = mapProdutoDTO(dto);
    expect(result.nome).toBe('Pipoca');
    expect(result.preco).toBe(18.9);
    expect(result.idProduto).toBe(3);
    expect(result.poster).toBe('');
    expect(result.tamanho).toBeNull();
    expect(result.tipo).toBeNull();
  });
});
