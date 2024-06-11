import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../ReactHooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UpdateSingleAssetItem = () => {
  const asset = useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [type, setType] = useState("");
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (updateProduct) => {
      const { data } = await axiosSecure.put(
        `http://localhost:5000/asset/${asset._id}`,
        updateProduct
      );
    },
    onSuccess: () => {
      toast.success(" Updated Successfully");
      setTimeout(() => {
        // navigate("/manageMyFood");
      }, 500);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const productName = form.productName.value;
    const productQuantity = parseInt(form.productQuantity.value);
    const hrEmail = user?.email;
    const hrName = user?.displayName;
    const updateProduct = {
      productName,
      productQuantity,
      hrEmail,
      hrName,
    };
    console.log(updateProduct);
    await mutateAsync(updateProduct);
  };

  return (
    <div className="md:p-24 p-5 bg-gray-100 ">
      <Helmet>
        <title> {asset.productName}</title>
      </Helmet>
      <h1 className="text-center pb-12 uppercase font-bold text-3xl">
        Update Asset Item
      </h1>
      <form onSubmit={handleUpdate}>
        {/* foodname and foodImage row  */}
        <div className="w-full  gap-10 justify-center md:mb-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Product Name"
                name="productName"
                className="input input-bordered w-full"
                required
                defaultValue={asset.productName}
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Product Type</span>
            </label>
            <div className="flex rounded-md border-2 border-gray-300  items-center">
              <select
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={asset.type}
                name="deadline"
                id="deadline"
                className="  py-3 rounded-md px-3 w-full outline-2"
                disabled
              >
                <option value="">Select One</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Quantity</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                name="productQuantity"
                defaultValue={asset.productQuantity}
                placeholder="Product Quantity"
                className="input input-bordered  w-full"
                required
              />
            </label>
          </div>
        </div>

        {/* user email and name  */}

        <input
          className="btn w-full text-lg uppercase mt-16  text-white text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700"
          type="submit"
          value="Update Assets"
        />
      </form>
      <Toaster />
    </div>
  );
};

export default UpdateSingleAssetItem;
