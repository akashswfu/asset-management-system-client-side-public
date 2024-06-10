import React from "react";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";

const TopRequest = () => {
  const [allReq, refetch, isLoading] = useAssetsReqByEmploy();

  if (isLoading) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
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
      <h2 className="text-4xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase mt-20">
        Top most requested items
      </h2>
      {productsWithStats.slice(0, 4).map((data) => (
        <div
          className="flex items-center gap-20 justify-center w-4/5 mx-auto mb-6"
          key={data._id}
        >
          <div className="flex items-center shadow-2xl rounded-xl justify-around bg-gray-200 py-10 px-20 w-full gap-10">
            <h1 className="text-2xl font-semibold uppercase">
              {" "}
              {data.productName}{" "}
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
      ))}
    </div>
    // <div>
    //   <h2 className="text-center text-4xl pb-10 pt-10 text-green-500">
    //     Top most requested items
    //   </h2>
    //   {productsWithStats.map((data) => (
    //     <div
    //       className="flex items-center gap-20 justify-center  mx-auto mb-10"
    //       key={data._id}
    //     >
    //       <h1> {data.productName} </h1>

    //       <h1>
    //         Request for <span className="text-red-500">{data.count}</span> Times
    //       </h1>
    //     </div>
    //   ))}
    // </div>
  );
};

export default TopRequest;
