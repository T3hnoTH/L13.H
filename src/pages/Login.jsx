import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const Login = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || '/account';

  if (isAuth) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Сталася помилка при вході');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <h1>Вхід у кабінет</h1>
      <form onSubmit={handleSubmit} className="form-login">
        {errorMsg && <div className="error-banner">{errorMsg}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Sincere@april.biz"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="task123"
          />
        </div>

        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? 'Вхід...' : 'Увійти'}
        </button>
      </form>
    </div>
  );
};