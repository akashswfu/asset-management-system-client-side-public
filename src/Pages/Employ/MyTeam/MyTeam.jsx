import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import App from "../../../App";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();
  const [accept, setAccept] = useState("Accept");
  const acc = "Accepted";
  const rej = "Rejected";

  const {
    data: myTeam = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["myTeam", userInfo?.myHr],
  });

  const getData = async () => {
    if (userInfo.myHr !== "noHr") {
      const { data } = await axiosSecure.get(`/users/${userInfo?.myHr}`);
      return data;
    }
  };

  const { data: myHr = [] } = useQuery({
    queryFn: () => getHr(),
    queryKey: ["myHr", userInfo?.myHr],
  });
  const getHr = async () => {
    const { data } = await axiosSecure.get(`/user/${userInfo?.myHr}`);
    return data;
  };
  const documentRef = useRef(null);
  const handleDownload = async (team) => {
    const doc = <MyDocument />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "example.pdf");
  };

  return (
    <div className="min-h-[calc(100vh-450px)]">
      <div>
        {myTeam.map((team) => (
          <div
            className="flex items-center gap-20 w-full justify-evenly  mx-auto mb-10"
            key={team._id}
          >
            <div className="bg-base-200 shadow-2xl w-[600px] py-5 flex justify-around rounded-md items-center gap-20">
              <div>
                <img
                  className="w-32 h-32 rounded-md"
                  src={team.photo}
                  alt="No Photo"
                />
              </div>
              <h1 className="text-2xl font-semibold">{team.name}</h1>
              <h1 className="font-bold text-green-500 text-xl uppercase">
                {team.role}
              </h1>
            </div>
          </div>
        ))}

        {/* <div
          className="flex items-center gap-20 justify-center  mx-auto mb-10"
          key={myHr._id}
        >
          <div>
            <img className="w-20 h-20 bg-blue-500 " alt="" />
          </div>
          <h1>{myHr.name}</h1>
          <h1>{myHr.role}</h1>
        </div> */}
      </div>
    </div>
  );
};

export default MyTeam;
