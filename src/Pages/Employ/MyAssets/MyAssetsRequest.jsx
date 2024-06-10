import React, { useEffect, useState } from "react";
import useAuth from "../../../ReactHooks/useAuth";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ReactPDF, { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const MyAssetsRequest = () => {
  const { user, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [returnBtn, setReturnBtn] = useState({});
  const assetsList = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [assetsType, setAssetsType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const [printItem, setPrintItem] = useState({});
  console.log(printItem);

  const {
    data: myReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: [
      "myReq",
      user?.email,
      search,
      sort,
      assetsType,
      currentPage,
      itemsPerPage,
    ],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/assetsReq/${user?.email}?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sort}&assetsType=${assetsType}`
    );
    return data;
  };

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/myAssetsReq/${user?.email}?search=${search}`
      );

      setCount(data.count);
    };
    getCount();
  }, [search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  if (myReq.length == 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const handleCancel = (item) => {
    const itemAssets = assetsList.filter((ass) => ass._id === item.assetId);
    console.log(itemAssets[0]);
    Swal.fire({
      title: "Are you sure?",
      text: "If you do this, you need request again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("User want to");
        try {
          await axiosSecure
            .patch(`/assets/${item.assetId}`, itemAssets[0])
            .then(async (res) => {
              if (res.data.modifiedCount > 0) {
                const { data } = await axiosSecure.delete(
                  `/assetsReq/${item._id}`
                );
                console.log(data);
                if (data.deletedCount > 0) {
                  Swal.fire({
                    title: "Canceled!",
                    text: "Your Item has been Canceled.",
                    icon: "success",
                  });
                  // const remaining = foods.filter((f) => f._id !== id);
                  // setFoods(remaining);
                  refetch();
                }
              }
            });
          refetch();
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };
  const handleReturn = async (item, sts) => {
    item.status = sts;

    const itemAssets = assetsList.filter((ass) => ass._id === item.assetId);
    console.log(itemAssets[0]);

    try {
      await axiosSecure
        .patch(`/assetsReq/${item?._id}`, item)
        .then(async (res) => {
          refetch();
          if (res.data.modifiedCount > 0) {
            await axiosSecure
              .patch(`/assets/${item.assetId}`, itemAssets[0])
              .then((res) => {
                if (res.data.modifiedCount > 0) {
                  alert("Data Updated");
                }
              });
            refetch();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
    setSort("");
    setAssetsType("");
  };
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{printItem.productName}</Text>
          <Text>{printItem.type}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const handlePrint = async (item) => {
    setPrintItem(item);
    console.log(item);
    const doc = <MyDocument />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "example.pdf");
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
              placeholder="Enter Food Name"
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
              setSort(e.target.value);
            }}
            value={sort}
            name="deadline"
            id="deadline"
            className=" p-4  rounded-md text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700  px-6 font-semibold uppercase text-md  text-white border-0 text-md btn"
          >
            <option value="">Click To Filter</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        {/* assets type filter  */}
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
              <th>Request Date</th>
              <th className="text-center"> Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="py-5">
            {myReq.map((item, idx) => (
              <tr key={item._id} className="bg-base-200 my-5 py-10">
                <th>{idx + 1}</th>
                <td>{item.productName}</td>
                <td>{item.type}</td>
                <td>{item.requestData.slice(0, 10)}</td>
                <td>{item.status}</td>

                {item.status === "Pending" && (
                  <td className="flex items-center gap-2 justify-center">
                    <p
                      onClick={() => handleCancel(item)}
                      className="bg-red-500 rounded-md text-white px-2 py-1 cursor-pointer "
                    >
                      Cancel
                    </p>
                  </td>
                )}

                {item.status === "Approved" && item.type === "Returnable" && (
                  <td className="flex items-center gap-2 justify-center">
                    <p
                      onClick={() => handlePrint(item)}
                      className="bg-red-500 cursor-pointer rounded-md text-white px-2 py-1"
                    >
                      Print
                    </p>
                    <button
                      onClick={() => {
                        handleReturn(item, "Return");
                      }}
                      className="bg-red-500 rounded-md text-white px-2 py-1 cursor-pointer"
                    >
                      Return
                    </button>
                  </td>
                )}

                {item.status === "Return" && item.type === "Returnable" && (
                  <td className="flex items-center gap-2 justify-center">
                    <button
                      disabled
                      className="bg-gray-300 rounded-md  px-2 py-1 disabled "
                    >
                      Returned
                    </button>
                  </td>
                )}

                {item.status === "Approved" &&
                  item.type === "Non-returnable" && (
                    <td className="flex items-center gap-2 justify-center">
                      <p
                        onClick={() => handlePrint(item)}
                        className="bg-red-700 rounded-md text-white px-2 py-1 cursor-pointer"
                      >
                        Print
                      </p>
                    </td>
                  )}

                {item.status === "Reject" && (
                  <td className="flex w-full gap-2 justify-center ">
                    <p className="text-lg text-red-500 font-semibold">
                      {" "}
                      {item.status}ed by HR
                    </p>
                  </td>
                )}

                {/* <td>{item.startDate}</td> */}
                {/* <td>
                <Link to={`/updateAsset/${item._id}`}>
                  <td className="text-blue-600 underline">Update</td>
                </Link>
              </td>
              <td>
                <Link onClick={() => handleDelete(item._id)}>
                  <td className="text-blue-600 underline">Delete</td>
                </Link>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gradient-to-r bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:from-sky-600 hover:to-indigo-700  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span></span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum
                ? "text-transparent text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-700"
                : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline   hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-gradient-to-r  text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:from-sky-600 hover:to-indigo-700 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className=""></span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyAssetsRequest;
