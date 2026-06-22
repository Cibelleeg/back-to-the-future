export type Gate = 'eligible' | 'locked' | 'reviewed';

export interface Review {
  who: string;
  stars: number;
  date: string;
  text: string;
}

export interface CatalogoExtra {
  count: number;
  dist: { 5: number; 4: number; 3: number; 2: number; 1: number };
  gate: Gate;
  myStars?: number;
  reviews: Review[];
}

const DEFAULT: CatalogoExtra = {
  count: 0,
  dist: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  gate: 'locked',
  reviews: [],
};

const DATA: Record<number, CatalogoExtra> = {
  1: {
    count: 380,
    dist: { 5: 190, 4: 120, 3: 45, 2: 16, 1: 9 },
    gate: 'reviewed',
    myStars: 4,
    reviews: [
      { who: 'Cibelle A.', stars: 4, date: '10 jun 2026', text: 'Adrenalina do começo ao fim. Fotografia deslumbrante nas cenas de corrida.' },
      { who: 'Rafael M.', stars: 4, date: '05 jun 2026', text: 'Um spin-off que funciona de verdade. Anya Taylor-Joy carrega o filme nas costas.' },
    ],
  },
  2: {
    count: 210,
    dist: { 5: 80, 4: 90, 3: 30, 2: 7, 1: 3 },
    gate: 'eligible',
    reviews: [
      { who: 'Ana L.', stars: 4, date: '18 jun 2026', text: 'Fofinho e bem realizado. Perfeito para assistir com as crianças.' },
    ],
  },
  3: {
    count: 295,
    dist: { 5: 140, 4: 110, 3: 32, 2: 8, 1: 5 },
    gate: 'locked',
    reviews: [
      { who: 'Pedro H.', stars: 4, date: '15 jun 2026', text: 'Perturbador e atual. Gareth Edwards tem um olho único para composição.' },
    ],
  },
  4: {
    count: 178,
    dist: { 5: 60, 4: 80, 3: 25, 2: 9, 1: 4 },
    gate: 'locked',
    reviews: [
      { who: 'Lucas F.', stars: 3, date: '12 jun 2026', text: 'Competente mas não supera a trilogia de César. Vale o ingresso pelo visual.' },
    ],
  },
  5: {
    count: 520,
    dist: { 5: 310, 4: 160, 3: 35, 2: 10, 1: 5 },
    gate: 'reviewed',
    myStars: 5,
    reviews: [
      { who: 'Marina S.', stars: 5, date: '20 jun 2026', text: 'Épico no sentido mais literal. Villeneuve entregou a obra da década.' },
      { who: 'Bianca T.', stars: 4, date: '17 jun 2026', text: 'Visualmente hipnótico. O IMAX faz total diferença nesse filme.' },
      { who: 'Cibelle A.', stars: 5, date: '14 jun 2026', text: 'Confirmou o que já sabia: Duna é a melhor ficção científica dos últimos 20 anos.' },
    ],
  },
  6: {
    count: 430,
    dist: { 5: 220, 4: 150, 3: 42, 2: 12, 1: 6 },
    gate: 'eligible',
    reviews: [
      { who: 'Diego R.', stars: 4, date: '19 jun 2026', text: 'Fan service do bom. Hugh Jackman é perfeito.' },
    ],
  },
};

export function getCatalogoExtra(idFilme: number): CatalogoExtra {
  return DATA[idFilme] ?? DEFAULT;
}
