import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../ReactHooks/useAuth";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { Helmet } from "react-helmet-async";

const AddAsset = () => {
  const { user, currentUser } = useAuth();
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [userInfo] = useUserInfo();

  const handleAddFood = async (e) => {
    e.preventDefault();

    const form = e.target;

    const productName = form.productName.value;
    const productQuantity = parseInt(form.productQuantity.value);
    const hrEmail = user?.email;
    const hrName = user?.displayName;
    const productDetails = {
      productName,
      productQuantity,
      type,
      hrEmail,
      hrName,
      startDate,
    };
    console.log(productDetails);
    try {
      const { data } = await axios.post(
        "https://asset-management-system-server-side.vercel.app/assets",
        productDetails
      );
      toast.success("Assets Added Successfully");

      navigate("/assetList");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="md:p-24 p-5 bg-gray-100 ">
      <Helmet>
        <title>HR || Add Assets</title>
      </Helmet>

      <h1 className="text-center text-4xl font-bold pb-12">Add a new Assets</h1>
      <form onSubmit={handleAddFood}>
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
              />
            </label>
            <ReactDatePicker
              className="hidden input border-0 outline-0 rounded-md  "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
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
                value={type}
                name="deadline"
                id="deadline"
                className="  py-3 rounded-md px-3 w-full outline-2  "
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
          value="Add Assets"
        />
      </form>
      <Toaster />
    </div>
  );
};

export default AddAsset;
