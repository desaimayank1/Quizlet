import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useTestStore";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { userEmail } = useUserStore();

  if (!userEmail) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
