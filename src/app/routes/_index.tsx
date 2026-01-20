import { Navigate } from 'react-router';

export default function Index() {
  return <Navigate to="/auth/login" replace />;
}
