import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["userInfo", user?.email],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/user/${user?.email}`);
    return data;
  };

  return [userInfo, isLoading, refetch];
};

export default useUserInfo;
