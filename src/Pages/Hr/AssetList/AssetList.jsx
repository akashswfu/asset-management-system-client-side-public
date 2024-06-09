import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../ReactHooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useAssetsList from "../../../ReactHooks/useAssetsList";

const AssetList = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [assetsStock, setAssetsStock] = useState("");
  const [assetsType, setAssetsType] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: myAssets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets", user?.email, assetsStock, assetsType, search, sort],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/assets/${user?.email}?assetsStock=${assetsStock}&assetsType=${assetsType}&search=${search}&sort=${sort}`
    );
    return data;
  };

  if (isLoading) {
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
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
    setSort("");
    setAssetsStock("");
    setAssetsType("");
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-5 mb-10">
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="px-6 py-2  text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              placeholder="Enter Assets Name"
              aria-label="Enter Job Title"
            />

            <button className="text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn">
              Search
            </button>
          </div>
        </form>

        {/* filter by pending/approved  */}

        <div className="mt-10 md:mt-0">
          <select
            onChange={(e) => {
              setAssetsType(e.target.value);
            }}
            value={assetsType}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Assets Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* stocks and out of stocks filter  */}
        <div className="mt-10 md:mt-0">
          <select
            onChange={(e) => {
              setAssetsStock(e.target.value);
            }}
            value={assetsStock}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Availability</option>
            <option value="in">Available</option>
            <option value="out">Out Of Stocks</option>
          </select>
        </div>

        <div className="mt-10 md:mt-0">
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Sort By Quantity</option>
            <option value="dsc">Maximum Items</option>
            <option value="asc">Minimum Items</option>
          </select>
        </div>

        <button onClick={handleReset} className="btn btn-error text-white">
          Reset
        </button>
      </div>
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
    </div>
  );
};

export default AssetList;
