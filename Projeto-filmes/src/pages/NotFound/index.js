import { Link } from 'react-router-dom';

import classes from './NotFound.module.css';

function Error() {
    return(
        <div className={classes.container}>
            <h1 className={classes['error-msg']}>Erro 404</h1>
            <h2 className={classes['description-error']}>Ops! Parece que a página especificada não existe!</h2>
            <Link to="/" className={classes['home-btn']}>Retorne para o início aqui!</Link>
        </div>
    );
}

export default Error;