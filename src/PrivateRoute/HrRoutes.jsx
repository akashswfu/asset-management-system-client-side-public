import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useUserInfo from "../ReactHooks/useUserInfo";
import useAuth from "../ReactHooks/useAuth";

const HrRoutes = ({ children }) => {
  const [userInfo, isLoading, refetch] = useUserInfo();
  const { user } = useAuth();
  const location = useLocation();
  if (isLoading || userInfo.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-300px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  if (userInfo.role === "HR") {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default HrRoutes;
