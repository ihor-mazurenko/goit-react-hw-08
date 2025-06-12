import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  redirectTo = '/',
}) {
  const isLogged = useSelector(selectIsLoggedIn);

  return isLogged ? Component : <Navigate to={redirectTo} replace />;
}