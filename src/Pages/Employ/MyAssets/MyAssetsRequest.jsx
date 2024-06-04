import React from "react";
import useAuth from "../../../ReactHooks/useAuth";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyAssetsRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myReq", user?.email],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(`/assetsReq/${user?.email}`);
    return data;
  };
  console.log(myReq);

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-auto border">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Request Date</th>
            <th className="text-center"> Status</th>
          </tr>
        </thead>
        <tbody className="py-5">
          {myReq.map((item, idx) => (
            <tr key={item._id} className="bg-base-200 my-5 py-10">
              <th>{idx + 1}</th>
              <td>{item.productName}</td>
              <td>{item.type}</td>
              <td>{item.requestData.slice(0, 10)}</td>
              {item.status === "Pending" && (
                <td className="flex items-center gap-2 justify-center">
                  {item.status}
                  <p className="bg-red-500 rounded-md text-white px-2 py-1">
                    Cancel
                  </p>
                </td>
              )}

              {item.status === "Approved" && item.type !== "Returnable" && (
                <td className="flex items-center gap-2 justify-center">
                  {item.status}
                  <p className="bg-red-500 rounded-md text-white px-2 py-1">
                    Return
                  </p>
                </td>
              )}

              {item.status === "Approved" && item.type === "Returnable" && (
                <td className="flex items-center gap-2 justify-center">
                  {item.status}
                  <p className="bg-red-500 rounded-md text-white px-2 py-1">
                    Return
                  </p>
                </td>
              )}

              {/* <td>{item.startDate}</td> */}
              {/* <td>
                <Link to={`/updateAsset/${item._id}`}>
                  <td className="text-blue-600 underline">Update</td>
                </Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(item._id)}>
                  <td className="text-blue-600 underline">Delete</td>
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssetsRequest;
