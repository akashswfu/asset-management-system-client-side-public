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

  const { data: myAssets = [], refetch } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets", userInfo?.myHr],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/assets/${userInfo?.myHr}`);
    return data;
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    if (userInfo.myHr === "noHr") {
      return alert("You are not any Hr Please Contact with your Hr");
    }

    const form = e.target;

    const additionalNotes = form.additionalNotes.value;

    const { email, name, myHr, photo, role, startDate } = userInfo;
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

  if (myAssets.length === 0) {
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
                                  defaultValue={assets.productName}
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
  );
};

export default RequestAnAssets;
