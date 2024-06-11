import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useAuth from "../../../ReactHooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { FaRegSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const RequestAnAssets = () => {
  const status = "Pending";
  const [userInfo, isLoading] = useUserInfo();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState(new Date());
  const navigate = useNavigate();
  const [singleAssets, setSingleAssets] = useState({});
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [assetsStock, setAssetsStock] = useState("");
  const [assetsType, setAssetsType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);

  const { data: myAssets = [], refetch } = useQuery({
    queryFn: () => getData(),
    queryKey: [
      "myAssets",
      userInfo?.myHr,
      assetsStock,
      assetsType,
      search,
      currentPage,
      itemsPerPage,
    ],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/assets/${userInfo?.myHr}?page=${currentPage}&size=${itemsPerPage}&assetsStock=${assetsStock}&assetsType=${assetsType}&search=${search}`
    );
    return data;
  };

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/assetsCount/${userInfo?.myHr}?search=${search}`
      );

      setCount(data.count);
    };
    getCount();
  }, [search]);
  console.log(count);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    if (userInfo.myHr === "noHr") {
      return toast.error("You have not any Hr Please Contact with your Hr");
    }

    const form = e.target;

    const additionalNotes = form.additionalNotes.value;

    const { email, name, myHr, photo, role } = userInfo;
    const { hrEmail, hrName, productName, type, _id } = singleAssets;
    const assetId = _id;

    console.log(singleAssets);

    const assetsReq = {
      productName,
      type,
      email,
      name,
      requestData,
      additionalNotes,
      status,
      myHr,
      photo,
      role,
      hrEmail,
      hrName,
      assetId,
    };

    // console.log(assetsReq);

    try {
      const { data } = await axiosSecure.post("/assetsReq", assetsReq);
      if (data.insertedId) {
        toast.success("Assets Request Successfully");
        await axiosSecure.patch(`/asset/${assetId}`, singleAssets);
        refetch();
        form.reset();
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
    setSort("");
    setAssetsStock("");
    setAssetsType("");
  };

  return (
    <div>
      <Helmet>
        <title>Employ || Assets</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-center items-center  md:gap-5 mb-5 md:mb-10 space-y-3 md:space-y-0 mt-5 md:mt-0">
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="px-6 py-2  text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              placeholder="Enter Food Name"
              aria-label="Enter Job Title"
            />

            <button className="text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn">
              Search
            </button>
          </div>
        </form>

        {/* filter by pending/approved  */}

        <div className="mt-10 md:mt-0">
          <select
            onChange={(e) => {
              setAssetsType(e.target.value);
            }}
            value={assetsType}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Assets Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* stocks and out of stocks filter  */}
        <div className="mt-10 md:mt-0">
          <select
            onChange={(e) => {
              setAssetsStock(e.target.value);
            }}
            value={assetsStock}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Availability</option>
            <option value="in">Available</option>
            <option value="out">Out Of Stocks</option>
          </select>
        </div>

        <button onClick={handleReset} className="btn btn-error text-white">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center pt-10 mx-auto gap-10 min-h-[calc(100vh-500px)]">
        {myAssets.map((assets) => (
          <div
            key={assets._id}
            className="card w-96 h-80 bg-base-100 shadow-2xl"
          >
            <div className="flex flex-col my-auto items-center space-y-5">
              <h2 className="card-title text-3xl ">{assets.productName}</h2>
              <p className="text-md font-semibold">
                {" "}
                Product Type : {assets.type}
              </p>
              <p className="text-lg font-semibold">
                Quantity : {assets.productQuantity}
              </p>
              {assets.productQuantity > 0 ? (
                <p className="text-xl font-semibold text-green-500">
                  Available
                </p>
              ) : (
                <p className="text-xl font-semibold text-red-500">
                  Out of Stock
                </p>
              )}

              <div className=" flex items-center justify-between">
                {assets.productQuantity > 0 ? (
                  <div>
                    <label
                      onClick={() => setSingleAssets(assets)}
                      htmlFor="my_modal_7"
                      className="btn  btn-outline rounded-md text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 px-8 font-semibold uppercase text-md  text-white border-0 text-md"
                    >
                      Requested
                    </label>

                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle w-full"
                    />
                    <div className="modal " role="dialog">
                      <div className="modal-box ">
                        <div className="md:p-24 p-5 bg-gray-100">
                          <form onSubmit={(e) => handleRequest(e)}>
                            <div className="md:flex w-full  gap-10 justify-center md:mb-6">
                              <div className="form-control w-full">
                                <label className="label">
                                  <span className="label-text">
                                    Additional Notes
                                  </span>
                                </label>
                                <label className="input-group">
                                  <input
                                    type="text"
                                    placeholder="Additional Notes"
                                    name="additionalNotes"
                                    className="input input-bordered w-full"
                                    required
                                  />
                                </label>
                              </div>
                            </div>

                            <input
                              className="btn w-full lg:mt-0 mt-5 text-lg uppercase  text-white text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700"
                              type="submit"
                              value="Request"
                            />
                          </form>
                        </div>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">
                        Close
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button disabled className="btn  px-9  ">
                      Requested
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
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

export default RequestAnAssets;
