import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export const Navigation = () => {
    const isLogged = useSelector(selectIsLoggedIn);
    return (
        <nav className={css.nav}>
            <NavLink className={css.link} to="/">Home</NavLink>
             {isLogged && (
                <NavLink className={css.link} to="/contacts">Contacts</NavLink>
                 )}
        </nav>
    )
}