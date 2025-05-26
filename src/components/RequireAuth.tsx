import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../context/UserContext";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authenticated = useAuth();
  const { user } = useUser();
  if (authenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return authenticated ? <>{children}</> : null;
};

export default RequireAuth;
