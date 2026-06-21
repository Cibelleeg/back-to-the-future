export { filtrarFilmesEmCartaz, filtrarFilmesEmBreve, extrairGeneros } from './filmeService';
export { filtrarProdutos, extrairCategorias } from './produtoService';
export { agruparSessoesPorFilme } from './sessaoService';
export { fetchFilmes, fetchCinemas, fetchProdutos, fetchSessoes, login, register, fetchMe, setAuthToken, getAuthToken, clearAuthToken, setUserInfo, getUserInfo, updateUserProfile, ApiError } from './api';
export type { UserInfo } from './api';
export { mapClassificacao, mapFilmeDTO, mapSessaoDTO, mapCinemaDTO, mapProdutoDTO } from './mappers';
export type { FilmeDTO, SessaoDTO, CinemaDTO, ProdutoDTO } from './mappers';
