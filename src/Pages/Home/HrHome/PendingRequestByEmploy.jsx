import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import useAuth from "../../../ReactHooks/useAuth";

const PendingRequestByEmploy = () => {
  const axiosSecure = useAxiosSecure();
  const [userInfo, isLoading] = useUserInfo();
  const { user, loading } = useAuth();
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    const getPendingData = async () => {
      const { data } = await axiosSecure(`/pendingReqByHr`, {
        params: { email: userInfo?.email, status: "Pending" },
      });
      setGetData(data);
    };
    getPendingData();
  }, [userInfo.email]);

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center text-4xl pb-10 pt-10 text-green-500">
        All Request of this month
      </h2>
      {getData.slice(0, 5).map((data) => (
        <div
          className="flex items-center gap-20 justify-center  mx-auto mb-10"
          key={data._id}
        >
          <h1> {data.productName} </h1>

          <h1>{data.email}</h1>
          <h1>{data.type}</h1>
          <h1>{data.status}</h1>
        </div>
      ))}
    </div>
  );
};

export default PendingRequestByEmploy;
