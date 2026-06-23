import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buyTicket, createOrder, setAuthToken, setUserInfo } from './api';
import type { AssentoId, CartItem, CinemaId, ComboId, ProdutoId, Sessao, SessaoId, FilmeId } from '../types/cinema';

const store = new Map<string, string>();

function mockStorage(): Storage {
  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => {
      store.clear();
    }),
    key: vi.fn((index: number) => Array.from(store.keys())[index] ?? null),
    get length() {
      return store.size;
    },
  };
}

function sessao(): Sessao {
  return {
    idSessao: 10 as SessaoId,
    idFilme: 1 as FilmeId,
    idCinema: 2 as CinemaId,
    dataHora: '2026-06-10T20:00:00',
    idioma: 'Dublado',
    formato: '2D',
    precoBase: 30,
    sala: { nome: 'Sala 1', tipo: 'Convencional' },
  };
}

function item(partial: Partial<CartItem>): CartItem {
  return {
    idProduto: 3 as ProdutoId,
    idCinema: 2 as CinemaId,
    nome: 'Pipoca',
    preco: 18,
    quantidade: 2,
    ...partial,
  };
}

describe('createOrder', () => {
  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', mockStorage());
    vi.stubGlobal('window', { dispatchEvent: vi.fn() });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 42 }),
    }));
    setUserInfo({ id: 7, email: 'ana@example.com' });
    setAuthToken('token-123');
  });

  it('envia pedidos para o endpoint e payload do backend', async () => {
    const response = await createOrder({
      sessao: sessao(),
      items: [
        item({ idProduto: 3 as ProdutoId }),
        item({ idProduto: -5 as ProdutoId, idCombo: 5 as ComboId, nome: 'Combo', preco: 40, quantidade: 1 }),
      ],
      total: 106.5,
    });

    expect(response).toEqual({ id: 42, code: '#PED-2026-42' });
    expect(fetch).toHaveBeenCalledWith(
      'https://pulp-fiction-n3gc.onrender.com/pedidos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer token-123' },
        body: JSON.stringify({
          idUsuario: 7,
          itens: [
            { idProduto: 3, idCombo: null, quantidade: 2, precoUnitario: 18 },
            { idProduto: null, idCombo: 5, quantidade: 1, precoUnitario: 40 },
          ],
        }),
      },
    );
  });

  it('permite criar pedido sem itens para venda apenas de ingresso', async () => {
    await createOrder({
      sessao: sessao(),
      items: [],
      total: 32.5,
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://pulp-fiction-n3gc.onrender.com/pedidos',
      expect.objectContaining({
        body: JSON.stringify({
          idUsuario: 7,
          itens: [],
        }),
      }),
    );
  });

  it('emite ingresso usando sessao, pedido, assento e tipo', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ idIngresso: 99 }),
    } as Response);

    await buyTicket({
      sessaoId: 10 as SessaoId,
      assentoId: 12 as AssentoId,
      pedidoId: 42,
      tipo: 'MEIA',
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://pulp-fiction-n3gc.onrender.com/sessions/10/ingressos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer token-123' },
        body: JSON.stringify({
          idAssento: 12,
          idPedido: 42,
          tipo: 'MEIA',
        }),
      },
    );
  });
});
