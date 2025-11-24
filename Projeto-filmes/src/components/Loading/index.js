import classes from './Loading.module.css';

function Loading({ loadMessage }) {
    return (
        <div className={classes['loading-container']}>
            <p className={classes.loading}>{loadMessage}</p>
        </div>
    );
}

export default Loading;