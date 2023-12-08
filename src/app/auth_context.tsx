import { createContext, useContext, useEffect, useState } from 'react';
import { AuthStateType } from './type.doc';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase_init';
import { Navigate } from 'react-router-dom';

const AuthStateContext = createContext<AuthStateType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateType>({ state: 'loading' });

  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: 'loaded', isAuthenticated: true, user });
    } else {
      setAuthState({ state: 'loaded', isAuthenticated: false, user });
    }
  };

  const setError = (error: Error) => {
    setAuthState({ state: 'error', error });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange, setError);

    return () => {
      unsubscribe();
    };
  }, []);

  if (authState?.user) {
    return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>;
  } else if (authState?.error) {
    console.log(authState.error);
  } else {
    return <Navigate to='/login' />;
  }
};

export const useAuthState = () => {
  const authState = useContext(AuthStateContext);
  if (!authState) throw new Error('Can not found AuthStateProvider');
  return authState;
};
