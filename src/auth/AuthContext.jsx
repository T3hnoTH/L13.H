import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('task_cabinet_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuth = Boolean(user);

  const login = async (email, password) => {
    if (password !== 'task123') {
      throw new Error('Неправильный логин или пароль');
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Ошибка сервера при авторизации');
      }
      const users = await response.json();

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!foundUser) {
        throw new Error('Пользователь с таким email не найден');
      }

      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
      };

      setUser(userData);
      localStorage.setItem('task_cabinet_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('task_cabinet_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};