import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/Api';
import CarrosselFilmes from '../../components/CarrosselFilmes';

import classes from './Home.module.css';
import Loading from '../../components/Loading';

function Home() {

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [listaSalva, setListaSalva] = useState([]);
    const [loading, setLoading] = useState([true]);

    //requisicao API + armazenamento da lista de filmes salvos na memoria do navegador
    useEffect(() => {
        const userList = localStorage.getItem("@filmesSalvos");
        setListaSalva(JSON.parse(userList) || []);

        async function LoadNowPlayingMovies() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "0e00ec1c43f07d7c788e1be962ff1dc6",
                    language: "pt-br",
                    page: 1
                }
            });

            return response.data.results;
        }
        async function LoadPopularMovies() {
            const response = await api.get("/movie/popular", {
                params: {
                    api_key: "0e00ec1c43f07d7c788e1be962ff1dc6",
                    language: "pt-br",
                    page: 1
                }
            })

            return response.data.results;
        }
        async function LoadTopRatedMovies() {
            const response = await api.get("/movie/top_rated", {
                params: {
                    api_key: "0e00ec1c43f07d7c788e1be962ff1dc6",
                    language: "pt-br",
                    page: 1
                }
            })

            return response.data.results;
        }
        async function LoadUpcomingMovies() {
            const response = await api.get("/movie/upcoming", {
                params: {
                    api_key: "0e00ec1c43f07d7c788e1be962ff1dc6",
                    language: "pt-br",
                    page: 1
                }
            })

            return response.data.results;
        }
        async function LoadAllRequests() {
            try {
                const [nowPlaying, popular, topRated, upcoming] = await Promise.all([LoadNowPlayingMovies(), LoadPopularMovies(), LoadTopRatedMovies(), LoadUpcomingMovies()]);

                setNowPlayingMovies(nowPlaying);
                setPopularMovies(popular);
                setTopRatedMovies(topRated);
                setUpcomingMovies(upcoming);
            }
            catch (e) {
                toast.error("Erro ao buscar os dados: ", e);
            }
            finally {
                setLoading(false);
            };
        }

        LoadAllRequests();
    }, [])

    if (loading) {
        return <Loading loadMessage="Carregando filmes..." />
    }

    return (
        <div className={classes.container}>
            <div className={classes.center}>
                <CarrosselFilmes titulo="Nos Cinemas" filmes={nowPlayingMovies} />
                <CarrosselFilmes titulo="Em Alta" filmes={popularMovies} />
                <CarrosselFilmes titulo="Mais Bem Avaliados" filmes={topRatedMovies} />
                <CarrosselFilmes titulo="Em Breve nos Cinemas" filmes={upcomingMovies} />
                <CarrosselFilmes titulo="Minha Lista" filmes={listaSalva} />
            </div>
        </div>
    );
}

export default Home;