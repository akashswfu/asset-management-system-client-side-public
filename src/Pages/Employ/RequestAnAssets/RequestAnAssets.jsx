import React, { useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useAuth from "../../../ReactHooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { FaRegSquare } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const { data: myAssets = [], refetch } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets", userInfo?.myHr, assetsStock, assetsType, search],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/assets/${userInfo?.myHr}?assetsStock=${assetsStock}&assetsType=${assetsType}&search=${search}`
    );
    return data;
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    if (userInfo.myHr === "noHr") {
      return alert("You are not any Hr Please Contact with your Hr");
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
        alert("Assets Added Successfully");
        await axiosSecure.patch(`/asset/${assetId}`, singleAssets);
        refetch();
      }

      setTimeout(() => {
        // navigate("/myAssets");
      }, 500);

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
      <div className="flex justify-center items-center gap-5 mb-10">
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

            <button className="text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn">
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
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
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
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
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
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center mx-auto gap-10">
        {myAssets.map((assets) => (
          <div key={assets._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{assets.productName}</h2>
              <p>{assets.type}</p>
              <p>Quantity: {assets.productQuantity}</p>
              <div className=" flex items-center justify-between">
                <div>
                  {assets.productQuantity > 0 ? "Available" : "Out of Stock"}
                </div>

                {assets.productQuantity > 0 ? (
                  <div>
                    <label
                      onClick={() => setSingleAssets(assets)}
                      htmlFor="my_modal_7"
                      className="btn  btn-outline rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700 px-8 font-semibold uppercase text-md  text-white border-0 text-md"
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
                              className="btn w-full lg:mt-0 mt-5 text-lg uppercase  text-white text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700"
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
                    <button disabled className="btn  btn-primary">
                      Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestAnAssets;
