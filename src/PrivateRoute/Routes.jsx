import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import SignUp from "../Pages/Hr/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import EmploySignUp from "../Pages/Employ/EmploySignUp";
import AddAsset from "../Pages/Hr/AddAsset/AddAsset";
import AddEmploy from "../Pages/Hr/AddEmploy/AddEmploy";
import AllRequest from "../Pages/Hr/AllRequest/AllRequest";
import AssetList from "../Pages/Hr/AssetList/AssetList";
import MyEmployList from "../Pages/Hr/MyEmployList/MyEmployList";
import MyAssetsRequest from "../Pages/Employ/MyAssets/MyAssetsRequest";
import MyTeam from "../Pages/Employ/MyTeam/MyTeam";
import RequestAnAssets from "../Pages/Employ/RequestAnAssets/RequestAnAssets";
import UpdateSingleAssetItem from "../Pages/Hr/AssetList/UpdateSingleAssetItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/employSignUp",
        element: <EmploySignUp></EmploySignUp>,
      },

      //hr routes
      {
        path: "/assetList",
        element: <AssetList></AssetList>,
      },
      {
        path: "/addAsset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "/addEmploy",
        element: <AddEmploy></AddEmploy>,
      },
      {
        path: "/allRequest",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/MyEmployList",
        element: <MyEmployList></MyEmployList>,
      },
      {
        path: "/updateAsset/:id",
        element: <UpdateSingleAssetItem></UpdateSingleAssetItem>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/asset/${params.id}`),
      },

      // employ routes
      {
        path: "/myAssets",
        element: <MyAssetsRequest></MyAssetsRequest>,
      },
      {
        path: "/myTeam",
        element: <MyTeam></MyTeam>,
      },
      {
        path: "requestAnAssets",
        element: <RequestAnAssets></RequestAnAssets>,
      },
    ],
  },
]);

export default router;
