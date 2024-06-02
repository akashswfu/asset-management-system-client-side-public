import React from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useAuth from "../../../ReactHooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../ReactHooks/useUserInfo";

const RequestAnAssets = () => {
  const [userInfo, isLoading] = useUserInfo();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(userInfo.myHr);

  const { data: myAssets = [], refetch } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets"],
  });

  console.log(myAssets);

  const getData = async () => {
    const { data } = await axiosSecure.get(`/assets/${userInfo?.myHr}`);
    return data;
  };

  if (myAssets.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center mx-auto gap-10">
      {myAssets.map((assets) => (
        <div key={assets._id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{assets.productName}</h2>
            <p>{assets.type}</p>
            <div className=" flex items-center justify-between">
              <div>
                {assets.productQuantity > 0 ? "Available" : "Out of Stock"}
              </div>
              <button className="btn btn-primary">Request</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestAnAssets;
