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
      {getData.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-4xl font-semibold text-red-500 py-16 uppercase">
            You have no data for showing first add some products and add team
          </p>
        </div>
      )}
      {getData.length > 0 && (
        <h2 className="md:text-4xl text-2xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase">
          Pending Request
        </h2>
      )}
      {getData.slice(0, 5).map((data) => (
        <div
          className="flex items-center gap-20 justify-center md:w-11/12 lg:w-4/5 w-full mx-auto mb-6"
          key={data._id}
        >
          <div className="md:flex items-center w-full shadow-2xl md:rounded-xl md:justify-between bg-gray-200 py-10 px-5 md:px-20  gap-10">
            <div className="flex items-center gap-20 justify-between">
              <h1 className="text-2xl font-semibold uppercase">
                {" "}
                {data.productName}{" "}
              </h1>

              <h1 className="text-xl font-semibold">{data.email}</h1>
            </div>
            <div className="flex items-center gap-10 justify-between">
              <h1 className="text-lg">{data.type}</h1>
              <h1 className="text-blue-500 uppercase font-bold">
                {data.status}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingRequestByEmploy;
