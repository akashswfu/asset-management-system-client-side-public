import React from "react";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import useAssetsList from "../../../ReactHooks/useAssetsList";

const LimitedStock = () => {
  const [myAssets, isLoading] = useAssetsList();

  if (myAssets.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const limitedItems = myAssets.filter((item) => item.productQuantity < 10);

  return (
    <div>
      <h2 className="text-4xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase mt-20">
        Limited Stock Items
      </h2>
      {limitedItems.map((data) => (
        <div
          className="flex items-center gap-20 justify-center w-4/5 mx-auto mb-6"
          key={data._id}
        >
          <div className="flex items-center shadow-2xl rounded-xl justify-around bg-gray-200 py-10 px-20 w-full gap-10">
            <h1 className="text-2xl font-semibold uppercase  ">
              {" "}
              {data.productName}{" "}
            </h1>

            <h1 className="uppercase font-bold">{data.type}</h1>
            <h1 className="text-xl text-blue-500  font-semibold">
              {data.productQuantity}
            </h1>
          </div>
        </div>
      ))}
    </div>
    // <div>
    //   <h2 className="text-center text-4xl pb-10 pt-10 text-green-500">
    //     Limited Stock Items
    //   </h2>
    //   {limitedItems.slice(0, 5).map((data) => (
    //     <div
    //       className="flex items-center gap-20 justify-center  mx-auto mb-10"
    //       key={data._id}
    //     >
    //       <h1> {data.productName} </h1>

    //       <h1>{data.productQuantity}</h1>
    //       <h1>{data.type}</h1>
    //     </div>
    //   ))}
    // </div>
  );
};

export default LimitedStock;
