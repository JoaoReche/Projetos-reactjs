import { useRef } from 'react';
import { Link } from 'react-router-dom';

import classes from './Carrossel.module.css';

function CarrosselFilmes({ titulo, filmes }) {

    const carrosselRef = useRef(null);
    let scrollAmountRef = useRef(0);
    let scrollPerClick = 445;

    function sliderScrollLeft() {
        if (!carrosselRef.current) {
            return;
        }

        const sliders = carrosselRef.current;
        let scrollAmount = scrollAmountRef.current;

        scrollAmount = Math.max(0, scrollAmount - scrollPerClick);
        sliders.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: "smooth",
        });
        scrollAmountRef.current = scrollAmount;
    }

    function sliderScrollRight() {
        if (!carrosselRef.current) {
            return;
        }

        const sliders = carrosselRef.current;
        let scrollAmount = scrollAmountRef.current;
        const maxScrollLeft = sliders.scrollWidth - sliders.clientWidth;

        if (scrollAmount < maxScrollLeft) {
            scrollAmount = Math.min(maxScrollLeft, scrollAmount + scrollPerClick);
            sliders.scrollTo({
                top: 0,
                left: scrollAmount,
                behavior: "smooth",
            });
            scrollAmountRef.current = scrollAmount;
        }
    }

    if (filmes.length === 0) {
        return;
    }

    return (
        <div className={classes['container-carrossel']}>
            <p className={classes.categoria}>{titulo}</p>
            <div className={classes.carrossel}>

                <button className={classes.switchLeft} onClick={sliderScrollLeft}>
                    <img src={require('../../assets/home/left-arrow.png')} className={classes['indicator-icon']} alt="left-indicator-icon" />
                </button>
                <button className={classes.switchRight} onClick={sliderScrollRight}>
                    <img src={require('../../assets/home/right-arrow.png')} className={classes['indicator-icon']} alt="right-indicator-icon" />
                </button>

                <div className={classes['lista-filmes']} ref={carrosselRef}>
                    {filmes.map((filme) => {
                        return (
                            <div className={classes['poster-container']} key={filme.id}>
                                <Link to={`/filme/${filme.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w300/${filme.poster_path}`} alt={filme.title} className={classes.poster} />
                                </Link>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default CarrosselFilmes;