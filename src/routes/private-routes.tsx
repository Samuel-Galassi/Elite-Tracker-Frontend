import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { AppContainer } from '../components/app-container';
import { SideBar } from '../components/sidebar';
import { userLocalStorageKey } from '../hooks/use-user';

type PrivateRouteProps = {
  component: ReactNode;
};

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const userData = localStorage.getItem(userLocalStorageKey);

  if (!userData) {
    return <Navigate to="/entrar" />;
  }

  return (
    <AppContainer>
      <SideBar />
      {component}
    </AppContainer>
  );
};
