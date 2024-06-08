import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAssetsList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myAssets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myAssets", user?.email],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/assets/${user?.email}`);
    return data;
  };
  return [myAssets, refetch, isLoading];
};

export default useAssetsList;
