import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { Toaster } from "react-hot-toast";
import { ref } from "firebase/database";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const {
    data: allReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allReq", user?.email, search],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/hrReq/${user?.email}?search=${search}`
    );
    return data;
  };

  if (isLoading) {
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-5 mb-10">
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="px-6 py-2  text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              placeholder="Enter Requester Name"
              aria-label="Enter Job Title"
            />

            <button className="text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn">
              Search
            </button>
          </div>
        </form>
        <button onClick={handleReset} className="btn btn-error text-white">
          Reset
        </button>
      </div>
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
    </div>
  );
};

export default AllRequest;
