import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/Login';

const Dashboard = lazy(() => import('./components/Dashboard'));
const PointOfSale = lazy(() => import('./components/PointOfSale'));
const FardosPage = lazy(() => import('./components/Home'));
const MyProfile = lazy(() => import('./components/MyProfile'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pos"
        element={
          <ProtectedRoute>
            <PointOfSale />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fardos"
        element={
          <ProtectedRoute>
            <FardosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
