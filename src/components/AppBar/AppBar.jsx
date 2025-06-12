import { Navigation } from "../Navigation/Navigation";
import { AuthNav } from "../AuthNav/AuthNav";
import UserMenu from '../UserMenu/UserMenu';
import { useSelector} from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './AppBar.module.css'

export default function AppBar() {
    const isLogged = useSelector(selectIsLoggedIn);
    
    return (
        <header>
            <div className={css.header}>
                <Navigation />
                {isLogged ? <UserMenu /> : <AuthNav />}
            </div>
        </header>
    )
}