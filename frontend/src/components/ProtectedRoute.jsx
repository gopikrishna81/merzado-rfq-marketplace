import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await api.get("/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRole(response.data.role);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!localStorage.getItem("access")) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;