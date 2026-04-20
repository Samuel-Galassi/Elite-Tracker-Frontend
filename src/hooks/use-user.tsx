import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import type {
  UserContextProps,
  UserData,
  UserProviderProps,
} from '../types/UserTypes/user';

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const userLocalStorageKey = `${import.meta.env.VITE_LOCALSTORAGE_KEY}:userData`;

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const putUserData = (data: UserData) => {
    setUserData(data);

    localStorage.setItem(userLocalStorageKey, JSON.stringify(data));
  };

  const getUserInfo = async (githubCode: string) => {
    const { data } = await api.get<UserData>('/auth/callback', {
      params: {
        code: githubCode,
      },
    });

    putUserData(data);
  };

  const loadUserData = () => {
    const localData = localStorage.getItem(userLocalStorageKey);

    if (localData) {
      putUserData(JSON.parse(localData) as UserData);
    }
  };

  const logout = () => {
    localStorage.removeItem(userLocalStorageKey);
    setUserData({} as UserData);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: loadUserData is only used in this useEffect, so it doesn't need to be added to the dependencies array
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, getUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UseUser must be used with UserProvider');
  }

  return context;
};
