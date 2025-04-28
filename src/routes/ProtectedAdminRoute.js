import useAdminAuth from '../hooks/useAdminAuth';
import { Navigate } from 'react-router-dom';

function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, loading } = useAdminAuth();

  if (loading) return <div className="text-center p-10">로딩 중...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
}

export default ProtectedAdminRoute;
