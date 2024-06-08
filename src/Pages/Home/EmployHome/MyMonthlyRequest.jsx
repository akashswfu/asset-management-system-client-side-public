import React, { useEffect, useState } from "react";
import useAuth from "../../../ReactHooks/useAuth";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";

const MyMonthlyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading] = useUserInfo();
  const { user, loading } = useAuth();
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const getPendingData = async () => {
      const { data } = await axiosSecure(`/thisMonthReq/${userInfo?.email}`);
      setGetData(data);
    };
    getPendingData();
  }, [userInfo?.email]);

  if (loading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center text-4xl pb-10 pt-10 text-green-500">
        My All Request by This Month : {getData.length}
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
          <h1>{data.requestData.slice(0, 10)}</h1>
        </div>
      ))}
    </div>
  );
};

export default MyMonthlyRequest;
