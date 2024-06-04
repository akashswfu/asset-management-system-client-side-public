import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../ReactHooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myAssets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets", user?.email],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/assets/${user?.email}`);
    return data;
  };

  if (myAssets.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("User want to");
        try {
          const { data } = await axiosSecure.delete(`/asset/${id}`);
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
            // const remaining = foods.filter((f) => f._id !== id);
            // setFoods(remaining);
            refetch();
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-auto border">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Quantity</th>
            <th>Date Added</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="py-5">
          {myAssets.map((item, idx) => (
            <tr key={item._id} className="bg-base-200 my-5 py-10">
              <th>{idx + 1}</th>
              <td>{item.productName}</td>
              <td>{item.type}</td>
              <td>{item.productQuantity}</td>
              <td>{item.startDate}</td>
              <td>
                <Link to={`/updateAsset/${item._id}`}>
                  <td className="text-blue-600 underline">Update</td>
                </Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(item._id)}>
                  <td className="text-blue-600 underline">Delete</td>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
