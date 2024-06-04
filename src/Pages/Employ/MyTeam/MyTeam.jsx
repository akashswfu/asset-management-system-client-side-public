import React from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();

  const {
    data: myTeam = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myTeam"],
  });

  const getData = async () => {
    if (userInfo.myHr !== "noHr") {
      const { data } = await axiosSecure.get(`/users/${userInfo?.myHr}`);
      return data;
    }
  };

  const { data: myHr = [] } = useQuery({
    queryFn: () => getHr(),
    queryKey: ["myHr"],
  });
  const getHr = async () => {
    const { data } = await axiosSecure.get(`/user/${userInfo?.myHr}`);
    return data;
  };

  return (
    <div>
      {myTeam.map((team) => (
        <div
          className="flex items-center gap-20 justify-center  mx-auto mb-10"
          key={team._id}
        >
          <div>
            <img className="w-20 h-20" src={team.photo} alt="" />
          </div>
          <h1>{team.name}</h1>
          <h1>{team.role}</h1>
        </div>
      ))}
      <div
        className="flex items-center gap-20 justify-center  mx-auto"
        key={myHr._id}
      >
        <div>
          <img className="w-20 h-20" src={myHr.photo} alt="" />
        </div>
        <h1>{myHr.name}</h1>
        <h1>{myHr.role}</h1>
      </div>
    </div>
  );
};

export default MyTeam;
