import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: { role: string } | null;
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute = ({ user, allowedRoles, children }: ProtectedRouteProps) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not allowed
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
