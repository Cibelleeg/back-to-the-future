export function formataHora(dataHora: string): string {
    return new Date(dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formataDuracao(duracao: number): string {
    const horas = Math.floor(duracao / 60);
    const minutos = duracao % 60;
    return `${horas}h ${minutos}m`;
}

export function formataPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}