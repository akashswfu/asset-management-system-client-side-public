import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useUserInfo from "./useUserInfo";
import useAxiosSecure from "./useAxiosSecure";

const useMyHrInfo = () => {
  const { user, currentUser, loading } = useAuth();
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const { data: myHr = {} } = useQuery({
    queryFn: () => getHr(),
    queryKey: ["myHr", currentUser?.myHr, userInfo?.myHr],
  });
  const getHr = async () => {
    if (currentUser && currentUser.role === "employ") {
      const { data } = await axiosSecure.get(`/user/${currentUser?.myHr}`);

      return data;
    } else if (userInfo && userInfo.role === "employ") {
      const { data } = await axiosSecure.get(`/user/${userInfo?.myHr}`);

      return data;
    }
  };
  return { myHr };
};

export default useMyHrInfo;
