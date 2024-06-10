import React from "react";
import useAuth from "../../../ReactHooks/useAuth";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const MyEmployList = () => {
  const { user, hrEmploy, setHrEmploy } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myTeam = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myTeam"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ newItem, item }) => {
      const { data } = await axiosSecure.patch(`/user/${item._id}`, newItem);
    },
    onSuccess: () => {
      toast.success("Remove from team Successfully");
      refetch();
    },
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/users/${user?.email}`);
    setHrEmploy(data.length);
    return data;
  };

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const handleUpdate = async (item) => {
    item.myHr = "noHr";
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
  return (
    <div className="overflow-x-auto min-h-[calc(100vh-450px)]">
      <table className="table table-auto border mt-10">
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
          {myTeam.map((item, idx) => (
            <tr key={item._id} className="bg-base-200 my-5 py-10">
              <th>{idx + 1}</th>
              <td>
                {" "}
                <div className=" w-full h-full">
                  <img
                    className="w-16 h-16 rounded-lg"
                    src={item.photo}
                    alt="NO PHOTO"
                  />
                </div>
              </td>
              <td>{item.name}</td>
              <td>Normal Employ</td>
              <td>
                {" "}
                <button
                  onClick={() => handleUpdate(item)}
                  className="btn bg-red-500 hover:bg-red-600 border-0 text-white"
                >
                  Remove
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default MyEmployList;
