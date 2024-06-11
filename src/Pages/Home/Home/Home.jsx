import React, { useEffect } from "react";
import Subscription from "../../Hr/Subscription/Subscription";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { Link, useNavigate } from "react-router-dom";
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
import useAssetsList from "../../../ReactHooks/useAssetsList";

const Home = () => {
  const navigate = useNavigate();
  const { loading, user, currentUser } = useAuth();
  const [userInfo, isLoading] = useUserInfo();
  const [myAssets] = useAssetsList();

  if (
    (currentUser?.role === "HR" && currentUser?.pack < 1) ||
    (userInfo?.role === "HR" && userInfo?.pack < 1)
  ) {
    navigate("/subscription");
  }

  return (
    <div className="min-h-[calc(100vh-450px)]">
      {(currentUser?.role === "HR" && currentUser?.pack) === 0 ||
        (userInfo?.role === "HR" && userInfo?.pack < 1 && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-4xl font-semibold text-red-500 py-16 uppercase">
              You need to buy a package first
            </p>
            <Link to="/subscription">
              <button className="btn text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl px-7 md:mt-10 mt-5">
                Subscription
              </button>
            </Link>
          </div>
        ))}
      {!userInfo && (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>

          <div className="mt-20 md:mt-0 px-5 md:px-10 lg:px-0">
            {" "}
            <Banner></Banner>
          </div>
          <div className="px-5 md:px-10 lg:px-0">
            <Package></Package>
          </div>
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
          {myAssets.length > 0 && <TwoExtraSection></TwoExtraSection>}
        </div>
      )}
    </div>
  );
};

export default Home;
