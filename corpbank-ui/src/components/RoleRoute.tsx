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
  if (!roles.includes(user.role)) return <Navigate to="/login" />;

  return children;
}

