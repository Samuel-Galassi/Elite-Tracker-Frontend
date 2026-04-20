import type { ReactNode } from 'react';

export type UserData = {
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  token: string;
};

export type UserProviderProps = {
  children: ReactNode;
};

export type UserContextProps = {
  getUserInfo: (githubCode: string) => Promise<void>;
  userData: UserData;
  logout: () => void;
};
