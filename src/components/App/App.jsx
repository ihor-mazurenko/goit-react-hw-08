import { useEffect, Suspense, lazy } from 'react';
import Layout from '../LayOut/LayOut';
import { Routes, Route } from 'react-router-dom';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import(`../../pages/HomePage/HomePage`));
const RegistrPage = lazy(() => import(`../../pages/RegistrPage/RegistrPage`));
const LoginPage = lazy(() => import(`../../pages/LoginPage/LoginPage`));
const ContactPage = lazy(() => import (`../../pages/ContactPage/ContactPage`));


export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);


   useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? null : (
    <>
      <Toaster/>
      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/register' element={<RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrPage />} />} />
            <Route path='/login' element={<RestrictedRoute
              redirectTo="/contacts"
              component={<LoginPage />} />} />
            <Route path='/contacts' element={<PrivateRoute
              redirectTo="/login"
              component={<ContactPage />} />} />
            </Route>
        </Routes>
        </Suspense>
    </>
  )
};

