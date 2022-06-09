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
    const value = router.query.deptCode;
    console.log({ value });
    console.log({ pathname: router.pathname });
    if (token === null) {
      setIsLoading(false);
      const isPublicRoute = [
        '/admin/sign-in',
        '/doctor/sign-in',
        '/patient/sign-in',
        '/patient/sign-up',
        `/department/${value}`,
      ].some((e) => {
        e === router.pathname;
      });

      if (!isPublicRoute) {
        router.push('/');
      }
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

  const signIn = async (userEmail, password, userType) => {
    const response = await axios.post('/api/auth/sign-in', {
      email: userEmail,
      password,
      type: userType,
    });
    console.log({ response });
    const { status, message, data } = response.data;
    if (message === 'FAILED') {
      return { status, message };
    }
    const { token, email, type } = data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser({ email, type });
    setIsLoggedIn(true);
    setIsLoading(false);
    return { status, message };
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser({
      type: 'unauthenticated',
    });
    return { status: 'logout', messasge: 'logout successful' };
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, token, user, setUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
