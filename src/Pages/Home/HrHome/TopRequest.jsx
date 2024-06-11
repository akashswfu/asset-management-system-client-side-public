import React from "react";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const TopRequest = () => {
  const [allReq, refetch, isLoading] = useAssetsReqByEmploy();

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const productStatsMap = {};

  allReq.forEach((item) => {
    const { productName, requests } = item;
    if (productStatsMap[productName]) {
      productStatsMap[productName].requests += requests;
      productStatsMap[productName].count += 1;
    } else {
      productStatsMap[productName] = { requests, count: 1 };
    }
  });

  const productsWithStats = Object.entries(productStatsMap).map(
    ([productName, stats]) => ({
      productName,
      requests: stats.requests,
      count: stats.count,
    })
  );

  productsWithStats.sort((a, b) => b.requests - a.requests);

  return (
    <div className="mt-5">
      {allReq.length > 0 && (
        <h2 className="text-2xl md:text-4xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase mt-20">
          Top most requested items
        </h2>
      )}
      {productsWithStats.slice(0, 4).map((data) => (
        <div
          className="flex items-center gap-20 justify-center md:w-11/12 lg:w-4/5 w-full mx-auto mb-6"
          key={data._id}
        >
          <div className="md:flex items-center shadow-2xl md:rounded-xl md:justify-between bg-gray-200 py-10 px-5 md:px-20 w-full gap-10">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-20 w-full justify-center md:justify-between">
              <h1 className="text-2xl font-semibold uppercase">
                {data.productName}
              </h1>

              <h1 className="text-2xl uppercase">
                Request for{" "}
                <span className="text-green-500 text-3xl font-bold ">
                  {data.count}
                </span>{" "}
                Times
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRequest;
