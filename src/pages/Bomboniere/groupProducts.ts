import type { Produto } from '../../types/cinema';

const TAMANHO_ORDER = ['Pequena', 'Pequeno', 'Media', 'Média', 'Grande', 'Individual', '300ml', '500ml', '700ml', '1L'];
const TIPO_ORDER    = ['Salgada', 'Manteiga', 'Doce', 'Natural', 'Cola', 'Guarana', 'Guaraná', 'Laranja', 'Uva', 'Maracuja', 'Maracujá', 'Ao leite', 'Meio amargo', 'Morango', 'Chocolate', 'Baunilha', 'Cheddar', 'Tradicional', 'Queijo', 'Sortidas'];

export type ProdutoVariante = {
  produto: Produto;
  tamanho: string | null;
  tipo:    string | null;
};

export type ProdutoGroup = {
  nome:      string;
  poster:    string | undefined;
  descricao: string;
  categoria: string;
  tamanhos:  string[];
  tipos:     string[];
  variantes: ProdutoVariante[];
};

function parseNome(nome: string): { baseName: string; tamanho: string | null; tipo: string | null } {
  let tamanho: string | null = null;
  let tipo:    string | null = null;
  const rest: string[] = [];

  for (const token of nome.split(' ')) {
    if (TAMANHO_ORDER.includes(token))    tamanho = token;
    else if (TIPO_ORDER.includes(token))  tipo    = token;
    else rest.push(token);
  }

  return { baseName: rest.join(' '), tamanho, tipo };
}

function removeTamanhoDoNome(nome: string, tamanhos: string[]): string {
  const tokensToRemove = new Set(tamanhos);
  const baseName = nome
    .split(' ')
    .filter((token) => !tokensToRemove.has(token))
    .join(' ')
    .trim();

  return baseName || nome;
}

function resolveVariante(produto: Produto): { baseName: string; tamanho: string | null; tipo: string | null; tamanhos: string[]; tipos: string[] } {
  const tamanhos = produto.tamanhos ?? [];
  const tipos = produto.sabores ?? [];

  if (tamanhos.length > 0 || tipos.length > 0) {
    const tamanhoPrincipal = produto.tamanho ?? tamanhos[0] ?? null;

    return {
      baseName: removeTamanhoDoNome(produto.nome, tamanhos),
      tamanho: tamanhoPrincipal,
      tipo: produto.tipo ?? null,
      tamanhos,
      tipos,
    };
  }

  if (produto.tamanho !== undefined || produto.tipo !== undefined) {
    return { baseName: produto.nome, tamanho: produto.tamanho ?? null, tipo: produto.tipo ?? null, tamanhos: [], tipos: [] };
  }

  const parsed = parseNome(produto.nome);

  return { ...parsed, tamanhos: [], tipos: [] };
}

export function groupProdutos(produtos: Produto[]): ProdutoGroup[] {
  const map     = new Map<string, ProdutoGroup>();
  const seenKey = new Map<string, Set<string>>();

  for (const produto of produtos) {
    const { baseName, tamanho, tipo, tamanhos, tipos } = resolveVariante(produto);

    if (!map.has(baseName)) {
      map.set(baseName, {
        nome: baseName, poster: produto.poster ?? undefined,
        descricao: produto.descricao, categoria: produto.categoria,
        tamanhos: [], tipos: [], variantes: [],
      });
      seenKey.set(baseName, new Set());
    }

    const group = map.get(baseName)!;
    const seen  = seenKey.get(baseName)!;
    const key   = `${tamanho}|${tipo}`;

    if (seen.has(key)) continue;
    seen.add(key);

    group.variantes.push({ produto, tamanho, tipo });
    if (tamanho && !group.tamanhos.includes(tamanho)) group.tamanhos.push(tamanho);
    if (tipo    && !group.tipos.includes(tipo))       group.tipos.push(tipo);
    for (const item of tamanhos) {
      if (!group.tamanhos.includes(item)) group.tamanhos.push(item);
    }
    for (const item of tipos) {
      if (!group.tipos.includes(item)) group.tipos.push(item);
    }
  }

  for (const g of map.values()) {
    g.tamanhos.sort((a, b) => sortByKnownOrder(a, b, TAMANHO_ORDER));
    g.tipos.sort((a,    b) => sortByKnownOrder(a, b, TIPO_ORDER));
  }

  return Array.from(map.values());
}

export function findVariante(
  group:   ProdutoGroup,
  tamanho: string | null,
  tipo:    string | null,
): Produto | null {
  return group.variantes.find(v => v.tamanho === tamanho && v.tipo === tipo)?.produto
    ?? group.variantes.find(v => v.tamanho === tamanho)?.produto
    ?? group.variantes.find(v => v.tipo === tipo)?.produto
    ?? group.variantes[0]?.produto
    ?? null;
}

function sortByKnownOrder(a: string, b: string, order: string[]): number {
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
}
