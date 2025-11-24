import axios from 'axios';
// lembrar de instalar o axios

// BASE DA URL -> https://api.themoviedb.org/3/
// REQUISICAO E CHAVE -> movie/now_playing?api_key=0e00ec1c43f07d7c788e1be962ff1dc6&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;