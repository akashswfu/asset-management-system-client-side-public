import React from "react";
import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import useAssetsList from "../../../ReactHooks/useAssetsList";

const LimitedStock = () => {
  const [myAssets, isLoading] = useAssetsList();
  console.log(myAssets);
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
      <h2 className="text-center text-4xl pb-10 pt-10 text-green-500">
        Limited Stock Items
      </h2>
      {limitedItems.slice(0, 5).map((data) => (
        <div
          className="flex items-center gap-20 justify-center  mx-auto mb-10"
          key={data._id}
        >
          <h1> {data.productName} </h1>

          <h1>{data.productQuantity}</h1>
          <h1>{data.type}</h1>
        </div>
      ))}
    </div>
  );
};

export default LimitedStock;
