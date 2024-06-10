import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUserInfo from "../ReactHooks/useUserInfo";
import useAuth from "../ReactHooks/useAuth";

const HrHomeRoutes = ({ children }) => {
  const [userInfo, isLoading] = useUserInfo();
  const { currentUser } = useAuth();
  if (isLoading || userInfo.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-300px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  if (
    (userInfo.role === "HR" || currentUser.role === "HR") &&
    (userInfo.pack > 0 || currentUser.pack > 0)
  ) {
    return children;
  }
  return <Navigate to="/subscription"></Navigate>;
};

export default HrHomeRoutes;
