import axios from 'axios';
import router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    email: '',
    id: '',
    type: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      setIsLoading(false);
      const routerName = router.pathname;
      if (
        router.pathname === '/patient/sign-in' ||
        router.pathname === '/patient/sign-up' ||
        router.pathname === 'doctor/sign-in' ||
        router.pathname === 'admin/sign-in'
      ) {
        router.push(routerName);
      } else {
        router.push('/');
      }
      return;
    }
    setToken(token);
    console.log({ token });
    axios
      .post('/api/verify-token', {
        token,
      })
      .then((response) => {
        console.log({ response });
        const {
          status,
          message,
          data: { id, email, isVerified, type },
        } = response.data;
        if (isVerified) {
          setIsLoading(false);
          setIsLoggedIn(true);
          setUser({ email, id, type });
        } else {
          setIsLoggedIn(false);
          setUser({ email: '', id: '', type: '' });
          router.push('/');
        }
      });
  }, []);

  const signIn = async (useremail, password) => {
    setIsLoading(true);
    const response = await axios.post('/api/auth/sign-in', {
      email: useremail,
      password,
      type,
    });
    const { status, message, data } = response.data;
    if (message === 'FAILED') {
      return { status, message };
    }
    const { token, email, id } = data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser({ email, id, type });
    setIsLoggedIn(true);
    setIsLoading(false);
    return { status, message };
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, token, user, setUser, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
