export { filtrarFilmesEmCartaz, filtrarFilmesEmBreve, extrairGeneros } from './filmeService';
export { filtrarProdutos, extrairCategorias } from './produtoService';
export { agruparSessoesPorFilme } from './sessaoService';
export { fetchFilmes, fetchCinemas, fetchProdutos, fetchCombos, fetchSessoes, fetchAssentosBySala, fetchAssentosBySessao, fetchUserOrders, fetchUserReviews, login, register, fetchMe, setAuthToken, getAuthToken, clearAuthToken, setUserInfo, getUserInfo, updateUserProfile, createOrder, buyTicket, finalizarCompra, ApiError } from './api';
export { fetchFilmeDetalheAvaliacoes, criarAvaliacaoFilme, atualizarAvaliacao, excluirAvaliacao } from './avaliacaoService';
export type { UserInfo } from './api';
export { mapClassificacao, mapFilmeDTO, mapSessaoDTO, mapCinemaDTO, mapProdutoDTO, mapComboDTO, mapAssentoDTO } from './mappers';
export type { FilmeDTO, SessaoDTO, CinemaDTO, ProdutoDTO, ComboDTO, AssentoDTO } from './mappers';
