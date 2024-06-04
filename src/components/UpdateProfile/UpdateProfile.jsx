import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import profile from "/images/user.png";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { updateUserProfile, user, setLoading, setUser } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, photo } = data;

    updateUserProfile(name, photo)
      .then(() => {
        setUser({ displayName: name, photoURL: photo, email: user.email });
        Swal.fire({
          text: "Update info Successfully",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: "text-green-500 font-semibold text-center",
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          text: "Something Wrong!",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: "text-red-500 font-semibold text-center",
          },
        });
      });
  };

  const isValidPhotoUrl = (url) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    const googleRegex = /https?:\/\/lh[0-9]+\.googleusercontent\.com\/.*/i;
    const githubRegex = /https?:\/\/avatars\d*\.githubusercontent\.com\/.*/i;

    return (
      imageRegex.test(url) || googleRegex.test(url) || githubRegex.test(url)
    );
  };
  return (
    <div className="">
      <div className="w-full lg:flex-row flex flex-col justify-center items-center  mt-16  py-10 shadow-2xl  ">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="500"
          className="w-1/2 flex flex-col items-center justify-center space-y-4"
        >
          {isValidPhotoUrl(user.photoURL) ? (
            <img
              className="md:w-52 md:h-52 w-40 h-40 border-2 border-green-500 rounded-full"
              src={user.photoURL}
              alt="No image"
            />
          ) : (
            <img
              className="w-52 h-52 border-2  rounded-full"
              src={profile}
              alt="No image"
            />
          )}

          <h1 className="text-2xl font-semibold"> {user.displayName} </h1>
          <p className="font-semibold">{user.email}</p>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="1000"
          className="hero-content flex-col lg:w-1/2 w-full py-5 mx-auto items-center"
        >
          <div className="card shrink-0 w-[90%]  shadow-2xl bg-gray-100">
            <h1 className="text-3xl font-semibold text-center mt-5">
              Update Your Info
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  defaultValue={user.displayName}
                  name="name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-2">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  defaultValue={user.email}
                  name="photo"
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <div className="form-control mt-6">
                <button className="text-center uppercase w-full bg-green-600  hover:bg-green-700 py-3 rounded-md text-lg font-semibold text-white cursor-pointer ">
                  Update Info
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;