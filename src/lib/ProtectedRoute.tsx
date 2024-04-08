import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  auth: boolean;
}

export const PrivateRoutes: React.FC<ProtectedRouteProps> = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};
