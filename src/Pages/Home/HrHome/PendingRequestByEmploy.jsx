import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import useAuth from "../../../ReactHooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

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
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      {getData.length > 0 && (
        <h2 className="text-4xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase">
          Pending Request
        </h2>
      )}
      {getData.slice(0, 5).map((data) => (
        <div
          className="flex items-center gap-20 justify-center w-4/5 mx-auto mb-6"
          key={data._id}
        >
          <div className="flex items-center shadow-2xl rounded-xl justify-around bg-gray-200 py-10 px-20 w-full gap-10">
            <h1 className="text-2xl font-semibold uppercase">
              {" "}
              {data.productName}{" "}
            </h1>

            <h1 className="text-xl font-semibold">{data.email}</h1>
            <h1 className="text-lg">{data.type}</h1>
            <h1 className="text-blue-500 uppercase font-bold">{data.status}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingRequestByEmploy;
