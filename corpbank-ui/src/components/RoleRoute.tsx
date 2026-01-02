// RoleRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface RoleRouteProps {
  roles: string[];
  children: ReactNode;
}

export default function RoleRoute({ roles, children }: RoleRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  
  // Normalize user role for comparison
  const userRole = user.role?.replace('ROLE_', '') || '';
  const normalizedRoles = roles.map(role => role.toUpperCase());
  
  if (!normalizedRoles.includes(userRole.toUpperCase())) {
    return <Navigate to="/login" />;
  }

  return children;
}

