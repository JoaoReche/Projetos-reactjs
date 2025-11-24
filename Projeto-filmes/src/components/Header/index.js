import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import classes from './Header.module.css';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} className={classes.logo} alt="logo" />
      </Link>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/minha-lista">Minha lista</Link>
      </nav>
    </header>
  );
}

export default Header;