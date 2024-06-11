import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../ReactHooks/useAuth";
import useAxiosSecure from "../ReactHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import useUserInfo from "../ReactHooks/useUserInfo";
import icons from "/images/icon.png";

const Navbar = () => {
  const { logOut, user, loading, setLoading, currentUser, setCurrentUser } =
    useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      setLoggedUser(data);
    };
    getUser();
  }, [user?.email]);

  const { data: myHr = [] } = useQuery({
    queryFn: () => getHr(),
    queryKey: ["myHr", loggedUser?.myHr],
  });
  const getHr = async () => {
    const { data } = await axiosSecure.get(`/user/${loggedUser?.myHr}`);
    return data;
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!");
        setCurrentUser("");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const links = (
    <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold ">
      {!user && (
        <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold ">
          <li className="">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/signUp">Join as HR</NavLink>
          </li>
          <li className="">
            <NavLink to="/employSignUp">Join as Employ</NavLink>
          </li>
        </div>
      )}
      {(currentUser.role === "HR" || userInfo.role === "HR") && (
        <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold">
          <li className="">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/assetList">Asset List</NavLink>
          </li>
          <li className="">
            <NavLink to="/addAsset">Add Asset</NavLink>
          </li>
          <li className="">
            <NavLink to="/allRequest">All Request</NavLink>
          </li>
          <li className="">
            <NavLink to="/myEmployList">My employee</NavLink>
          </li>
          <li className="">
            <NavLink to="/addEmploy">Add employee</NavLink>
          </li>
          <li className="">
            <NavLink to="/updateProfile">Profile</NavLink>
          </li>
        </div>
      )}
      {(currentUser.role === "employ" || userInfo.role === "employ") && (
        <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold">
          <li className="">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/myAssets">My Assets Request</NavLink>
          </li>
          <li className="">
            <NavLink to="/myTeam">My Team</NavLink>
          </li>
          <li className="">
            <NavLink to="/requestAnAssets">Request for an Assets</NavLink>
          </li>
          <li className="">
            <NavLink to="/updateProfile">Profile</NavLink>
          </li>
        </div>
      )}
    </div>
  );

  const isValidPhotoUrl = (url) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    const googleRegex = /https?:\/\/lh[0-9]+\.googleusercontent\.com\/.*/i;
    const githubRegex = /https?:\/\/avatars\d*\.githubusercontent\.com\/.*/i;

    return (
      imageRegex.test(url) || googleRegex.test(url) || githubRegex.test(url)
    );
  };

  console.log(currentUser, userInfo);

  return (
    <div className="navbar  dark:bg-purple-700 bg-gray-200 py-4 px-4 md:mb-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex  lg:hidden "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-6  z-10  p-2 shadow bg-base-100 flex flex-col relative rounded-box w-40 md:w-[800px]"
          >
            {links}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {/* <span className="hidden text-xl lg:text-3xl font-bold md:flex lg:flex text-transparent bg-gradient-to-r from-sky-500 to-indigo-800 bg-clip-text ">
            {loggedUser.role === "HR" && <p>{loggedUser.companyLogo}</p>}
            {loggedUser.role === "employ" && <p>{myHr.companyLogo}</p>}
            {loggedUser.length === 0 && <p>No User</p>}
          </span> */}
          {currentUser.length > 0 && currentUser.role === "HR" && (
            <img
              className="w-14 h-14 bg-green-500 rounded-full border-none"
              src={currentUser.companyLogo}
              alt="No Logo"
            />
          )}
          {userInfo.length > 0 && userInfo.role === "HR" && (
            <img
              className="w-14 h-14 bg-green-500 rounded-full border-none"
              src={userInfo.companyLogo}
              alt="No Logo"
            />
          )}
          {!user && (
            <img
              className="w-14 h-14 bg-green-500 rounded-full border-none"
              src={icons}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="navbar-center hidden  lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <div>
              {isValidPhotoUrl(user?.photoURL) ? (
                <div
                  className="w-12 border-0 p-0  h-12 rounded-full relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <img
                    className="w-full h-full rounded-full bg-gray-50 border"
                    src={user?.photoURL}
                  />
                  {showTooltip && (
                    <div className="absolute top-1/2 me-2 right-full transform -translate-y-1/2  font-bold px-2">
                      {user?.displayName}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="w-12 border-0 p-0  h-12 rounded-full relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <img
                    className="w-full h-full rounded-full bg-gray-50 border"
                    src="{profile}"
                  />
                  {showTooltip && (
                    <div className="absolute top-1/2 me-2 right-full transform -translate-y-1/2  font-bold px-2">
                      {user?.displayName}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="btn  text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="btn btn-outline rounded-md text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700 px-8 font-semibold uppercase text-md  text-white border-0 text-md">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
