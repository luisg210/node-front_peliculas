import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthPrivider = ({ children }) => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const login = async (token_, email_, role_) => {
    setToken(token_);
    setEmail(email_); 

    localStorage.setItem('x-token', token_);
    localStorage.setItem('email', email_);
    localStorage.setItem('role', role_);
  };

  const logout = () => {
    localStorage.clear();
    setToken('');
    setEmail('');
    setRole('');
  };

  const isLoggedIn = () => {
    if (localStorage.getItem('x-token')) {
      setToken(localStorage.getItem('x-token'));
      setEmail(localStorage.getItem('email'));
      setRole(localStorage.getItem('role'));
    }  
  };

  useEffect(() => {
    isLoggedIn();
  });

  return (
    <AuthContext.Provider
      value={{ login, logout, token, email, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};