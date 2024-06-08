import React, { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useUserInfo from "./useUserInfo";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAssetsReqByEmploy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["allReq"],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(`/hrReq/${user?.email}`);
    return data;
  };

  return [allReq, refetch, isLoading];
};

export default useAssetsReqByEmploy;
