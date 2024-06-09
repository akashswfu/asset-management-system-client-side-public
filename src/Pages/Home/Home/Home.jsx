import React, { useEffect } from "react";
import Subscription from "../../Hr/Subscription/Subscription";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";
import Banner from "../CommonHome/Banner";
import AboutWebsite from "../CommonHome/AboutWebsite";
import Package from "../CommonHome/Package";
import PendingRequest from "../EmployHome/PendingRequest";
import MyMonthlyRequest from "../EmployHome/MyMonthlyRequest";
import ExtraSection from "../EmployHome/ExtraSection";
import PendingRequestByEmploy from "../HrHome/PendingRequestByEmploy";
import TopRequest from "../HrHome/TopRequest";
import LimitedStock from "../HrHome/LimitedStock";

import PieCharts from "../HrHome/PieCharts";
import TwoExtraSection from "../HrHome/TwoExtraSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();
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
      {!userInfo && (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Banner></Banner>
          <AboutWebsite></AboutWebsite>
          <Package></Package>
        </div>
      )}
      {userInfo.role === "employ" && userInfo.myHr === "noHr" && (
        <p className="text-4xl text-center py-20 text-red-500">
          Contact Your HR
        </p>
      )}
      {userInfo.role === "employ" && userInfo.myHr !== "noHr" && (
        <div>
          <Helmet>
            <title>Home || Employ</title>
          </Helmet>
          <PendingRequest></PendingRequest>
          <MyMonthlyRequest></MyMonthlyRequest>
          <ExtraSection></ExtraSection>
        </div>
      )}
      {userInfo.role === "HR" && (
        <div>
          <Helmet>
            <title>Home || HR </title>
          </Helmet>
          <PendingRequestByEmploy></PendingRequestByEmploy>
          <TopRequest></TopRequest>
          <LimitedStock></LimitedStock>
          <PieCharts></PieCharts>
          <TwoExtraSection></TwoExtraSection>
        </div>
      )}
    </div>
  );
};

export default Home;
