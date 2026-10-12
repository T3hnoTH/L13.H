import { useAuth } from '../auth/AuthContext';

export const Account = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Профіль користувача</h1>
      <p className="info-text">Ця сторінка доступна тільки після авторизації.</p>

      {user && (
        <div className="card-profile">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Ім'я:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};