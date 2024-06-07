import React from "react";
import Subscription from "../../Hr/Subscription/Subscription";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [userInfo, isLoading] = useUserInfo();

  if (loading || isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-300px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  if (userInfo?.role === "HR" && userInfo?.pack < 1) {
    navigate("/subscription");
  }
  return (
    <div>
      <p className="text-4xl text-green-500 py-12 text-center">
        This is Home Page
      </p>
    </div>
  );
};

export default Home;
