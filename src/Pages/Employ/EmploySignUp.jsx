import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAuth from "../../ReactHooks/useAuth";
import ReactDatePicker from "react-datepicker";
import useAxiosSecure from "../../ReactHooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";

const EmploySignUp = () => {
  const role = "employ";
  const myHr = "noHr";
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    createUser,
    googleLogin,
    setLoading,
    updateUserProfile,
    setUser,
    user,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleGoogleLogin = async () => {
    try {
      await googleLogin().then(async (res) => {
        console.log(res.user);
        const user = {
          name: res.user.displayName,
          email: res.user.email,
          startDate,
          role,
          myHr,
          photo: res.user.photoURL,
        };
        console.log(user);
        const { data } = await axios
          .post(`http://localhost:5000/users`, user)
          .then((res) => {
            toast.success("Registration Successfully");
            setLoading(false);
            setTimeout(() => {
              navigate(location?.state ? location.state : "/");
            }, 1000);
          });
      });
    } catch (err) {
      toast.error("Access Denied");
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    const user = {
      name,
      email,
      startDate,
      role,
      myHr,
      photo,
    };

    if (password.length < 6) {
      toast.warning("Password must be 6 or more characters long ");

      return;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      toast.warning("Password must have a lowercase and Uppercase character ");

      return;
    }

    setSuccess("");
    setError("");
    try {
      const result = await createUser(email, password);
      toast.success("Registration Successfully");

      await updateUserProfile(name);
      setUser({
        ...result?.user,
        displayName: name,
        photoURL: photo,
        email: email,
      });

      const { data } = await axios.post(`http://localhost:5000/users`, user);
      toast.success("Login Successfully");
      setLoading(false);
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 1000);
    } catch (err) {
      toast.warning("User Already Exists! ");
    }
  };

  return (
    <div data-aos="fade-left" data-aos-duration="1000">
      <div className="hero-content w-full  flex-col">
        <div className="text-center"></div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <h1 className="text-3xl text-transparent bg-gradient-to-r from-sky-500 to-indigo-800 bg-clip-text font-bold text-center mt-8">
            SignUp as a Employ
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body mb-0 pb-0"
          >
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
                  className="pe-3 cursor-pointer "
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
            <div className="form-control mt-6">
              <button className="btn  uppercase  text-white text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700 font-semibold ">
                SignUp
              </button>
            </div>
          </form>
          <p className="text-sm text-center my-3">
            Already Have an Account?
            <Link to="/login">
              <button className="btn btn-link">Login Here</button>
            </Link>
          </p>
          <div className="text-center mt-2  pb-5 flex gap-2 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline hover:border-0 hover:outline-none bg-gradient-to-r  hover:from-sky-600 hover:to-indigo-700 font-semibold text-sky-600"
            >
              <FcGoogle className="text-2xl me-2" />
              Google Login
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmploySignUp;
