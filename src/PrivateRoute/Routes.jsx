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

      //employ hr both
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },

      //hr routes
      {
        path: "/assetList",
        element: (
          <HrRoutes>
            <AssetList></AssetList>
          </HrRoutes>
        ),
      },
      {
        path: "/addAsset",
        element: (
          <HrRoutes>
            <AddAsset></AddAsset>
          </HrRoutes>
        ),
      },
      {
        path: "/addEmploy",
        element: (
          <HrRoutes>
            <AddEmploy></AddEmploy>
          </HrRoutes>
        ),
      },
      {
        path: "/allRequest",
        element: (
          <HrRoutes>
            <AllRequest></AllRequest>
          </HrRoutes>
        ),
      },
      {
        path: "/MyEmployList",
        element: (
          <HrRoutes>
            <MyEmployList></MyEmployList>
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
          fetch(`http://localhost:5000/asset/${params.id}`),
      },

      // employ routes
      {
        path: "/myAssets",
        element: (
          <EmployRoutes>
            <MyAssetsRequest></MyAssetsRequest>
          </EmployRoutes>
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
