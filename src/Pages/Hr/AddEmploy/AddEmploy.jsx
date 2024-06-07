import React, { useState } from "react";
import useAuth from "../../../ReactHooks/useAuth";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../ReactHooks/useUserInfo";

const AddEmploy = () => {
  const { user, hrEmploy } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userInfo] = useUserInfo();
  console.log(hrEmploy, userInfo?.pack);
  const [employCount, setEmployCount] = useState(hrEmploy);

  const {
    data: employ = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["employ"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ newItem, item }) => {
      const { data } = await axiosSecure.patch(`/users/${item._id}`, newItem);
    },
    onSuccess: () => {
      toast.success("Updated Successfully");
      setEmployCount(employCount + 1);
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 500);
      refetch();
    },
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/users/noHr`);

    return data;
  };

  if (employ.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const handleUpdate = async (item) => {
    if (userInfo?.pack <= employCount) {
      return alert("Your need increase your package for add member");
    }
    item.myHr = user?.email;
    const { name, email, startDate, role, myHr, photo } = item;
    console.log(myHr);
    const newItem = {
      name,
      email,
      startDate,
      role,
      myHr,
      photo,
    };
    console.log(newItem);

    await mutateAsync({ newItem, item });
  };

  const handleIncrease = () => {
    navigate("/subscription");
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-5 mb-16">
        <h1 className="text-3xl font-semibold text-center ">
          Employees : <span className="text-green-500">{employCount}</span> ,
          Current Package :{" "}
          <span className="text-green-500">{userInfo.pack}</span> employees
        </h1>
        <button onClick={handleIncrease} className="btn btn-primary">
          Increase
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-auto border">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Member Type</th>
              <th>Click To Add</th>
            </tr>
          </thead>
          <tbody className="py-5">
            {employ.map((item, idx) => (
              <tr key={item._id} className="bg-base-200 my-5 py-10">
                <th>{idx + 1}</th>
                <td>
                  {" "}
                  <div className=" w-full h-full">
                    <img
                      className="w-16 h-16 rounded-lg"
                      src={item.photo}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>Normal Employ</td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleUpdate(item)}
                    className="btn btn-primary"
                  >
                    Add
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Toaster />
      </div>
    </div>
  );
};

export default AddEmploy;
