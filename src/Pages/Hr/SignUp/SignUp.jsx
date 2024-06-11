import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import useAuth from "../../../ReactHooks/useAuth";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const role = "HR";
  const [pack, setPack] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setLoading, updateUserProfile, setUser, user } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { name, companyName, photo, companyLogo, email, password } = data;

    const user = {
      name,
      companyName,
      companyLogo,
      email,
      startDate,
      pack,
      role,
      photo,
    };
    console.log(user);

    if (password.length < 6) {
      toast.error("Password must be 6 or more characters long ");

      return;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      toast.error("Password must have a lowercase and Uppercase character ");

      return;
    }

    setSuccess("");
    setError("");
    try {
      const result = await createUser(email, password);
      setCurrentUser(user);

      await updateUserProfile(name);
      setUser({
        ...result?.user,
        displayName: name,
        email: email,
        photoURL: photo,
      });

      const { data } = await axios.post(
        `https://asset-management-system-server-side.vercel.app/users`,
        user
      );
      toast.success("Registration Successfully");
      setLoading(false);
      navigate("/subscription");
    } catch (err) {
      toast.error("User Already Exists!");
    }
  };

  return (
    <div data-aos="fade-left" data-aos-duration="1000">
      <Helmet>
        <title>SignUp || HR</title>
      </Helmet>
      <div className="hero-content w-full  flex-col">
        <div className="text-center"></div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <h1 className="text-3xl text-transparent bg-gradient-to-r  from-pink-600 to-yellow-600 bg-clip-text font-bold text-center mt-8">
            SignUp as a HR
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body mb-0 pb-0"
          >
            {/* for name  */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2   "
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>
            {/* Compnay Name  */}
            <div>
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2   "
                  type="text"
                  name="companyName"
                  placeholder="Enter Company Name"
                  {...register("companyName", { required: true })}
                />
              </div>
              {errors.companyName && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>

            {/* company Logo  */}

            <div>
              <label className="label">
                <span className="label-text">Company Logo</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2   "
                  type="text"
                  name="companyLogo"
                  placeholder="Enter Your companyLogo"
                  {...register("companyLogo", { required: true })}
                />
              </div>
              {errors.companyLogo && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2   "
                  type="text"
                  name="photo"
                  placeholder="Enter Your Photo URL"
                  {...register("photo", { required: true })}
                />
              </div>
              {errors.photo && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2  "
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>

            {/* Photo URL  */}
            {/* <div>
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-2   "
                  type="text"
                  name="photo"
                  placeholder="Enter Your Photo URL"
                  {...register("photo", { required: true })}
                />
              </div>
              {errors.photo && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div> */}

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <input
                  className=" py-3 rounded-md px-3 w-full outline-none   "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="pe-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <span className="text-red-500 text-sm mt-2">
                  This field is required
                </span>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* date of birth  */}

            <div className="w-full">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <ReactDatePicker
                  className=" input border-0 outline-0 rounded-md  "
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            {/* package select  */}
            <div>
              <label className="label">
                <span className="label-text">Select a Package</span>
              </label>
              <div className="flex rounded-md border-2 border-gray-300  items-center">
                <select
                  value={pack}
                  name="deadline"
                  id="deadline"
                  className="  py-3 rounded-md px-3 w-full outline-2  "
                >
                  <option value="5">5 Members for $5</option>
                  <option value="10">10 Members for $8</option>
                  <option value="20">20 Members for $15</option>
                </select>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn  uppercase  text-white text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 font-semibold ">
                Signup
              </button>
            </div>
          </form>
          <p className="text-sm text-center my-3">
            Already Have an Account?
            <Link to="/login">
              <button className="btn btn-link">Login Here</button>
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
