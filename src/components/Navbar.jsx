import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// import icons from "../../../public/icons.png";
// import homeIcons from "/images/h.png";
import Swal from "sweetalert2";
import useAuth from "../ReactHooks/useAuth";
import useAxiosSecure from "../ReactHooks/useAxiosSecure";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const [showTooltip, setShowTooltip] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      setLoggedUser(data);
    };
    getUser();
  }, [user?.email]);

  console.log(loggedUser);

  console.log(loggedUser.role);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          text: "LogOut Success! ",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: "text-green-500 font-semibold text-center",
          },
        });
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const links = (
    <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold ">
      <li className="">
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <div className="flex flex-col md:flex-row lg:flex-row md:gap-4 uppercase font-semibold ">
          <li className="">
            <NavLink to="/signUp">Join as HR</NavLink>
          </li>
          <li className="">
            <NavLink to="/employSignUp">Join as Employ</NavLink>
          </li>
        </div>
      )}
      {loggedUser.role === "HR" && (
        <div className="flex gap-3">
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
            <NavLink to="/myEmployList">My Employs</NavLink>
          </li>
          <li className="">
            <NavLink to="/addEmploy">Add Employ</NavLink>
          </li>
        </div>
      )}
      {loggedUser.role === "employ" && (
        <div className="flex gap-3">
          <li className="">
            <NavLink to="/myAssets">My Assets</NavLink>
          </li>
          <li className="">
            <NavLink to="/myTeam">My Team</NavLink>
          </li>
          <li className="">
            <NavLink to="/requestAnAssets">Request for an Assets</NavLink>
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
  // const handleToggle = (e) => {
  //   e.preventDefault();
  //   if (e.target.checked) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

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
            className="menu menu-sm dropdown-content mt-6  z-10  p-2 shadow bg-base-100  relative rounded-box w-52 md:w-[700px]"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          {/* <img
            className="w-10 h-10 hidden md:flex lg:flex"
            src="{icons}"
            alt=""
          /> */}
          <span className="hidden text-xl lg:text-3xl font-bold md:flex lg:flex text-transparent bg-gradient-to-r from-sky-500 to-indigo-800 bg-clip-text ">
            LOGO
          </span>
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
              className="btn  text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="btn btn-outline rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700 px-8 font-semibold uppercase text-md  text-white border-0 text-md">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="ms-4">
        {/* <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "light" ? false : true}
          />
          <svg
            onClick={() => setTheme("dark")}
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label> */}

        {/* Toogle Theme  */}

        {/* <div className="flex gap-5">
          {theme === "light" ? (
            <button onClick={() => setTheme("dark")}>
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </button>
          ) : (
            <button onClick={() => setTheme("light")}>
              <svg
                onClick={() => setTheme("dark")}
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
