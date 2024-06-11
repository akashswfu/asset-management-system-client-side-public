import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../ReactHooks/useAxiosSecure";
import useUserInfo from "../../../ReactHooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import App from "../../../App";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet-async";

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
      {/* {myTeam.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-4xl font-semibold text-red-500 py-16 uppercase">
            You have no HR
          </p>
        </div>
      )} */}
      <Helmet>
        <title>Employ || My Team</title>
      </Helmet>
      <div>
        {myTeam.map((team) => (
          <div
            className="flex items-center gap-20 w-full justify-evenly  mx-auto mb-10"
            key={team._id}
          >
            <div className="bg-base-200 shadow-2xl w-full md:w-[600px] py-5 flex flex-col md:flex-row justify-around rounded-md items-center gap-20">
              <div>
                <img
                  className="w-40 h-40 md:w-32 md:h-32 rounded-md"
                  src={team.photo}
                  alt="No Photo"
                />
              </div>
              <div className="flex items-center justify-between gap-20">
                <h1 className="text-2xl font-semibold">{team.name}</h1>
                <h1 className="font-bold text-green-500 text-xl uppercase">
                  {team.role}
                </h1>
              </div>
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
