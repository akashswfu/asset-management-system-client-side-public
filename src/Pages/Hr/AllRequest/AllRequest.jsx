import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { ref } from "firebase/database";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import { Helmet } from "react-helmet-async";

const AllRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);

  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const { user, setLoading } = useAuth();
  const {
    data: allReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allReq", user?.email, search, currentPage, itemsPerPage],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/hrReq/${user?.email}?page=${currentPage}&size=${itemsPerPage}&search=${search}`
    );
    return data;
  };

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/hrReqs/${user?.email}?search=${search}`
      );

      setCount(data.count);
    };
    getCount();
  }, [search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  if (allReq.length == 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

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
      await axiosSecure.patch(`/assetsReq/${item?._id}`, item).then((res) => {
        refetch();
        toast.success("Action Updated Successfully");
      });
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
      <div className="flex flex-col md:flex-row justify-center items-center  md:gap-5 mb-5 md:mb-10 space-y-3 md:space-y-0 mt-5 md:mt-0">
        <Helmet>
          <title>HR || All Request</title>
        </Helmet>
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

            <button className="text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn">
              Search
            </button>
          </div>
        </form>
        <button onClick={handleReset} className="btn btn-error text-white">
          Reset
        </button>
      </div>
      <div className="overflow-x-auto min-h-[calc(100vh-550px)]">
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
              <tr key={item._id} className="bg-base-100 my-5 py-10">
                <th>{idx + 1}</th>
                <td>{item.productName}</td>
                <td>{item.type}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>

                <td>{item.requestData.slice(0, 10)}</td>
                <td>{item.additionalNotes}</td>
                <td>{item.status}</td>

                <td>
                  {item.status === "Reject" || item.status === "Return" ? (
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
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gradient-to-r bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:from-pink-600 hover:to-yellow-700  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span></span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum
                ? "text-transparent text-white bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700"
                : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline   `}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gradient-to-r  text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:from-pink-600 hover:to-yellow-700 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className=""></span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default AllRequest;
