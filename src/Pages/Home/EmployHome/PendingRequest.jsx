import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import useAuth from "../../../ReactHooks/useAuth";
import { data } from "autoprefixer";

const PendingRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading] = useUserInfo();
  const { user, loading } = useAuth();
  const [getData, setGetData] = useState([]);

  console.log(userInfo.email);
  useEffect(() => {
    const getPendingData = async () => {
      const { data } = await axiosSecure(`/pendingReq`, {
        params: { email: userInfo?.email, status: "Pending" },
      });
      setGetData(data);
    };
    getPendingData();
  }, [userInfo.email]);

  if (loading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center text-4xl py-4 text-green-500">
        My All Pending Request : {getData.length}
      </h2>
      {getData.map((data) => (
        <div
          className="flex items-center gap-20 justify-center  mx-auto mb-10"
          key={data._id}
        >
          <h1> {data.productName} </h1>

          <h1>{data.hrEmail}</h1>
          <h1>{data.type}</h1>
          <h1>{data.status}</h1>
        </div>
      ))}
    </div>
  );
};

export default PendingRequest;
