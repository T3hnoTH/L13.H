import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>Сторінку не знайдено.</p>
      <Link to="/" className="btn-link">Повернутися на головну</Link>
    </div>
  );
};