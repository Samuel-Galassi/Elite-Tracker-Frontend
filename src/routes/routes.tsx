import { createBrowserRouter } from 'react-router';
import { Auth } from '../pages/auth';
import { Focus } from '../pages/focus';
import { Habits } from '../pages/habits';
import { Login } from '../pages/login';
import { PrivateRoute } from './private-routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={<Habits />} />,
  },

  {
    path: '/foco',
    element: <PrivateRoute component={<Focus />} />,
  },

  {
    path: '/entrar',
    element: <Login />,
  },

  {
    path: '/autenticacao',
    element: <Auth />,
  },
]);
