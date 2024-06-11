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
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import HrRoutes from "./HrRoutes";
import EmployRoutes from "./EmployRoutes";
import PrivateRoute from "./PrivateRoute";
import Subscription from "../Pages/Hr/Subscription/Subscription";
import Payment from "../Pages/Hr/Payment/Payment";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import HrHomeRoutes from "./HrHomeRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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

      //employ hr both
      {
        path: "/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },

      //hr routes
      {
        path: "/subscription",
        element: (
          <HrRoutes>
            <Subscription></Subscription>
          </HrRoutes>
        ),
      },
      {
        path: "/payment",
        element: (
          <HrRoutes>
            <Payment></Payment>
          </HrRoutes>
        ),
      },
      {
        path: "/assetList",
        element: (
          <HrRoutes>
            <HrHomeRoutes>
              <AssetList></AssetList>
            </HrHomeRoutes>
          </HrRoutes>
        ),
      },
      {
        path: "/addAsset",
        element: (
          <HrRoutes>
            <HrHomeRoutes>
              <AddAsset></AddAsset>
            </HrHomeRoutes>
          </HrRoutes>
        ),
      },
      {
        path: "/addEmploy",
        element: (
          <HrRoutes>
            <HrHomeRoutes>
              {" "}
              <AddEmploy></AddEmploy>
            </HrHomeRoutes>
          </HrRoutes>
        ),
      },
      {
        path: "/allRequest",
        element: (
          <HrRoutes>
            <HrHomeRoutes>
              <AllRequest></AllRequest>
            </HrHomeRoutes>
          </HrRoutes>
        ),
      },
      {
        path: "/MyEmployList",
        element: (
          <HrRoutes>
            <HrHomeRoutes>
              <MyEmployList></MyEmployList>
            </HrHomeRoutes>
          </HrRoutes>
        ),
      },
      {
        path: "/updateAsset/:id",
        element: (
          <HrRoutes>
            <UpdateSingleAssetItem></UpdateSingleAssetItem>
          </HrRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://asset-management-system-server-side.vercel.app/asset/${params.id}`
          ),
      },

      // employ routes
      {
        path: "/myAssets",
        element: (
          <EmployRoutes>
            <MyAssetsRequest></MyAssetsRequest>
          </EmployRoutes>
        ),
        loader: () =>
          fetch(
            "https://asset-management-system-server-side.vercel.app/assets"
          ),
      },
      {
        path: "/myTeam",
        element: (
          <EmployRoutes>
            <MyTeam></MyTeam>
          </EmployRoutes>
        ),
      },
      {
        path: "requestAnAssets",
        element: (
          <EmployRoutes>
            <RequestAnAssets></RequestAnAssets>
          </EmployRoutes>
        ),
      },
    ],
  },
]);

export default router;
