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
  const { loading, user, currentUser } = useAuth();
  const [userInfo, isLoading] = useUserInfo();

  if (currentUser?.role === "HR" && currentUser?.pack < 1) {
    navigate("/subscription");
  }

  return (
    <div className="min-h-[calc(100vh-450px)]">
      {!userInfo && (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Banner></Banner>
          <Package></Package>
          <AboutWebsite></AboutWebsite>
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
          {userInfo.pack > 0 && <TwoExtraSection></TwoExtraSection>}
        </div>
      )}
    </div>
  );
};

export default Home;
