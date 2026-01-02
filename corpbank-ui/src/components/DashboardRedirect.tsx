import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function DashboardRedirect() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "ADMIN":
          navigate("/admin", { replace: true });
          break;
        case "RM":
          navigate("/rm", { replace: true });
          break;
        case "ANALYST":
          navigate("/analyst", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Redirecting to your dashboard...
    </div>
  );
}
