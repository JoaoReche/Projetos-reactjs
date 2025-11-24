import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from './MyList.module.css';
import Loading from '../../components/Loading';

function MyList() {
    const [filmesSalvos, setFilmesSalvos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userList = localStorage.getItem("@filmesSalvos");
        setFilmesSalvos(JSON.parse(userList) || []);

        setLoading(false);
    }, [])

    if (loading) {
        return <Loading loadMessage="Carregando lista de filmes..." />
    }

    return (
        <div className={classes.container}>
            {filmesSalvos.length !== 0 ?
                <div>
                    <h1 className={classes.title}>Minha Lista</h1>
                    <div className={classes['lista-container']}>
                        {filmesSalvos.map((filme) => {
                            return (
                                <div className={classes['poster-container']} key={filme.id}>
                                    <Link to={`/filme/${filme.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w300/${filme.poster_path}`} className={classes.poster} alt={filme.title} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div> :
                <div className={classes['msg-container']}>
                    <h2 className={classes['msg-title']}>Ops!</h2>
                    <p className={classes.message}>Parece que você ainda não possui filmes salvos!</p>
                </div>
            }
        </div>
    );
}

export default MyList;