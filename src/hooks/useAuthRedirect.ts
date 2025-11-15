import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const useAuthRedirect = () => {
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/dashboard/admin", { replace: true });
    else if (user.role === "sender")
      navigate("/dashboard/sender", { replace: true });
    else if (user.role === "receiver")
      navigate("/dashboard/receiver", { replace: true });
  }, [user, navigate]);
};

export default useAuthRedirect;
