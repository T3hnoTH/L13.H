import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { SiteLayout } from './components/SiteLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Help } from './pages/Help';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { Tasks } from './pages/Tasks';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="help" element={<Help />} />
            <Route path="login" element={<Login />} />
            
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}