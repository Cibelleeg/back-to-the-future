export function formataHora(dataHora: string): string {
  return new Date(dataHora).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formataDuracao(duracao: number): string {
  const horas = Math.floor(duracao / 60);
  const minutos = duracao % 60;

  return `${horas}h ${minutos}min`;
}

export function formataPreco(preco: number): string {
  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formataData(data: string): string {
  return new Date(data).toLocaleDateString('pt-BR');
}

export function formataDataHoje(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

export function formataNota(nota: number): string {
  return nota.toFixed(1);
}

/** Converte nota 0-10 para escala 0-5 */
export function score5(nota: number): number {
  return parseFloat((nota / 2).toFixed(1));
}
