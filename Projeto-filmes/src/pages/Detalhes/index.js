import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/Api';

import classes from './Detalhes.module.css';
import Loading from '../../components/Loading';

function formatarData(dateApi) {
    // funcao para formatar data (API: YYYY-MM-DD) para pt-BR (DD/MM/YYYY).
    //  A data é criada em UTC para evitar bugs de fuso horário
    //  (ex: "2025-10-20" virar "19/10/2025").
    let date = dateApi.split('-');
    const dateObj = new Date(date);

    let value = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }

    return Intl.DateTimeFormat('pt-br', value).format(dateObj);
}

function formatarDuracao(runtimeApi) {
    let hour = Math.floor(runtimeApi / 60);
    let min = runtimeApi % 60;

    return `${hour}h ${min}min`;
}

function Filme() {
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaSalva, setListaSalva] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const userList = localStorage.getItem("@filmesSalvos");
        setListaSalva(JSON.parse(userList) || []);

        async function LoadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0e00ec1c43f07d7c788e1be962ff1dc6",
                    language: "pt-br",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/', { replace: true });
                    return;
                })

        }

        LoadFilme();

        return () => { }

    }, [navigate, id]);

    const hasFilme = listaSalva.some(filmeSalvo => filmeSalvo.id === filme.id);

    function salvarFilme(filmesSalvos) {
        const novaLista = [...filmesSalvos, filme];
        setListaSalva(novaLista);
        localStorage.setItem("@filmesSalvos", JSON.stringify(novaLista));
        toast.success("O filme foi salvo com sucesso!");

    }

    function removerFilme(filmesSalvos) {
        const novaLista = filmesSalvos.filter((item) => item.id !== filme.id);
        setListaSalva(novaLista);
        localStorage.setItem(`@filmesSalvos`, JSON.stringify(novaLista));
        toast.success("O filme foi removido da sua lista!");
    }

    if (loading) {
        return <Loading loadMessage="Carregando detalhes do filme..." />
    }

    return (
        <div className={classes.container}>
            <article className={classes['info-container']}>
                <h1 className={classes.title}>{filme.title}</h1>
                <div className={classes['movie-data']}>
                    <img src={`https://image.tmdb.org/t/p/w300/${filme.poster_path}`} alt={filme.title} className={classes.poster} />
                    <ul className={classes['meta-list']}>
                        <li className={classes.meta}>Data de lançamento: <strong>{formatarData(filme.release_date)}</strong></li>
                        <li className={classes.meta}>Duração: <strong>{formatarDuracao(filme.runtime)}</strong></li>
                        <li className={classes.meta}>Gêneros: <strong>{filme.genres.map((genre) => genre.name).join(', ')}</strong></li>
                        <li className={classes.meta}>Nome original: <strong>{filme.original_title}</strong></li>
                        {filme.tagline !== "" ?
                            <li className={classes.meta}>Tagline: "<strong>{filme.tagline}</strong>"</li>
                            : null
                        }
                        <li className={`${classes.meta} ${classes['vote-average']}`}>
                            {`${typeof filme.vote_average == 'number' ? `${filme.vote_average.toFixed(1)}/10 ✪` : 'N/A ✪'}`}
                        </li>
                    </ul>
                </div>
                <div className={classes['buttons-container']}>
                    {hasFilme ?
                        <button className={classes['save-remove-button']} onClick={() => removerFilme(listaSalva)}>
                            <img src={require('../../assets/detalhes/remove-button.png')} className={classes['btn-icon']} alt="icone remover" />
                            Remover
                        </button> :
                        <button className={classes['save-remove-button']} onClick={() => salvarFilme(listaSalva)}>
                            <img src={require('../../assets/detalhes/save-button.png')} className={classes['btn-icon']} alt="icone salvar" />
                            Salvar
                        </button>
                    }
                    <button className={classes['player-button']}>
                        <a href={`https://www.youtube.com/results?search_query=${filme.title}+Trailer`} className={classes['trailer-link']} target='blank' rel="external">
                            <img src={require('../../assets/detalhes/play-button.png')} className={classes['btn-icon']} alt="icone trailer" />
                            Trailer
                        </a>
                    </button>
                </div>
                {filme.overview !== "" ?
                    <div>
                        <h2 className={classes['sub-title']}>Sinopse</h2>
                        <p className={classes.synopsis}>{filme.overview}</p>
                    </div> : null
                }
            </article>
        </div>
    );
}

export default Filme;