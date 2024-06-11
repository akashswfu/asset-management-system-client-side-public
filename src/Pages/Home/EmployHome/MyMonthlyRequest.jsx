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

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div>
      {getData.length > 0 && (
        <h2 className="text-2xl md:text-4xl px-5 md:px-0 text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text py-5 mt-16 uppercase">
          My All Request by This Month : {getData.length}
        </h2>
      )}
      {getData.map((data) => (
        <div
          className="flex items-center gap-20 justify-center md:w-11/12 lg:w-4/5 w-full mx-auto mb-6"
          key={data._id}
        >
          <div className=" w-full flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center shadow-2xl md:rounded-xl  bg-gray-200 py-10 px-5 md:px-20  gap-4 md:gap-10">
            <div className="">
              <h1 className="text-2xl  font-semibold uppercase">
                {" "}
                {data.productName}{" "}
              </h1>
            </div>

            <h1 className="text-lg">{data.type}</h1>
            <h1 className="text-xl font-semibold">{data.hrEmail}</h1>

            <div className="flex items-center gap-10">
              {data.status === "Approved" && (
                <h1 className="text-green-500 uppercase font-bold">
                  {data.status}
                </h1>
              )}
              {data.status === "Pending" && (
                <h1 className="text-blue-500 uppercase font-bold">
                  {data.status}
                </h1>
              )}
              {data.status === "Reject" && (
                <h1 className="text-red-500 uppercase font-bold">
                  {data.status}
                </h1>
              )}
              {data.status === "Return" && (
                <h1 className="text-red-500 uppercase font-bold">
                  {data.status}
                </h1>
              )}
            </div>
            <h1>{data.requestData.slice(0, 10)}</h1>
          </div>
        </div>
        // <div
        //   className="flex items-center gap-20 justify-center w-4/5 mx-auto mb-6"
        //   key={data._id}
        // >
        //   <div className="flex items-center shadow-2xl rounded-xl justify-around bg-gray-200 py-10 px-20 w-full gap-10">
        //     <h1 className="text-2xl font-semibold uppercase">
        //       {" "}
        //       {data.productName}{" "}
        //     </h1>

        //     <h1 className="text-xl font-semibold">{data.hrEmail}</h1>
        //     <h1 className="text-lg">{data.type}</h1>
        //     {data.status === "Approved" && (
        //       <h1 className="text-green-500 uppercase font-bold">
        //         {data.status}
        //       </h1>
        //     )}
        //     {data.status === "Pending" && (
        //       <h1 className="text-blue-500 uppercase font-bold">
        //         {data.status}
        //       </h1>
        //     )}
        //     {data.status === "Reject" ||
        //       (data.status === "Return" && (
        //         <h1 className="text-red-500 uppercase font-bold">
        //           {data.status}
        //         </h1>
        //       ))}
        //     <h1>{data.requestData.slice(0, 10)}</h1>
        //   </div>
        // </div>
      ))}
    </div>
  );
};

export default MyMonthlyRequest;
