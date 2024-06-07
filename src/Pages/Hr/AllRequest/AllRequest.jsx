import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { Toaster } from "react-hot-toast";
import { ref } from "firebase/database";

const AllRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: allReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allReq"],
  });

  // const { mutateAsync } = useMutation({
  //   mutationFn: async ({ newItem, item }) => {
  //     const { data } = await axiosSecure.patch(`/user/${item._id}`, newItem);
  //   },
  //   onSuccess: () => {
  //     toast.success("Updated Successfully");
  //     //   setTimeout(() => {
  //     //     navigate("/");
  //     //   }, 500);
  //     refetch();
  //   },
  // });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/hrReq/${user?.email}`);
    return data;
  };

  if (allReq.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const handleAction = async (item, sts) => {
    console.log(sts);
    item.status = sts;
    refetch();

    try {
      await axiosSecure.patch(`/assetsReq/${item?._id}`, item);
      refetch();
      alert("Action Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-auto border">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Email of Requester</th>
            <th>Name of Request</th>
            <th>Request Date</th>
            <th>Additional Note</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="py-5">
          {allReq.map((item, idx) => (
            <tr key={item._id} className="bg-base-200 my-5 py-10">
              <th>{idx + 1}</th>
              <td>{item.productName}</td>
              <td>{item.type}</td>
              <td>{item.email}</td>
              <td>{item.name}</td>

              <td>{item.requestData.slice(0, 10)}</td>
              <td>{item.additionalNotes}</td>
              <td>{item.status}</td>

              <td>
                {item.status === "Reject" ? (
                  <div className="flex justify-center gap-8">
                    <button disabled className="btn btn-success text-white">
                      Approve
                    </button>
                    <button disabled className="btn btn-error text-white">
                      Reject
                    </button>{" "}
                  </div>
                ) : (
                  <div className="flex gap-8">
                    {item.status === "Approved" ? (
                      <button disabled className="btn btn-success text-white">
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(item, "Approved")}
                        className="btn btn-success text-white"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleAction(item, "Reject")}
                      className="btn btn-error text-white"
                    >
                      Reject
                    </button>{" "}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default AllRequest;
