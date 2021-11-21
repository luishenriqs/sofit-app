import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import api from '../services/api';
  
  interface IUser {
    user_name: string;
    email: string;
  }

  interface ISignInCredentials {
    email: string;
    password: string;
  }
  
  interface IAuthContextData {
    user: IUser;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
    userStorageLoading: boolean;
  }
  
  interface IAuthProviderProps {
    children: ReactNode;
  }
  
  const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);
  
  function AuthProvider({ children }: IAuthProviderProps) {
    const [data, setData] = useState<IUser>({} as IUser);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

  
    /* ******************************[SIGNIN]******************************** */
    // Fazendo login na aplicação;
    async function signIn({ email, password }: ISignInCredentials) {
      try {
        const response = await api.post('/sessions', {
          email,
          password,
        });
        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@Sofit:token', token],
            ['@Sofit:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        // Salvando dados de login no estado;
        setData({ ...user, token });
        setUserStorageLoading(false);
      } catch (error) {
        throw new Error('error');
      }
    }
    /* ********************************************************************** */

    /* *****************************[SIGNOUT]******************************** */
    // Fazendo logout na aplicação;
    async function signOut() {
        await AsyncStorage.multiRemove(['@Sofit:token', '@Sofit:user']);
        setData({} as IUser);
    };
    /* ********************************************************************** */
  
    return (
      <AuthContext.Provider value={{
        user: data,
        signIn,
        signOut,
        userStorageLoading
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  function useAuth(): IAuthContextData {
    const context = useContext(AuthContext);
  
    return context;
  }
  
  export { AuthProvider, useAuth };