import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const SiteLayout = () => {
  const { isAuth, logout } = useAuth();

  const getNavLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <div className="layout-container">
      <header className="header">
        <div className="logo">Task Cabinet</div>
        <nav className="nav">
          <NavLink to="/" className={getNavLinkClass}>
            Головна
          </NavLink>
          <NavLink to="/help" className={getNavLinkClass}>
            Допомога
          </NavLink>

          {!isAuth ? (
            <NavLink to="/login" className={getNavLinkClass}>
              Увійти
            </NavLink>
          ) : (
            <>
              <NavLink to="/account" className={getNavLinkClass}>
                Мій профіль
              </NavLink>
              <NavLink to="/my-tasks" className={getNavLinkClass}>
                Мої завдання
              </NavLink>
              <button onClick={logout} className="btn-logout">
                Вийти
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};