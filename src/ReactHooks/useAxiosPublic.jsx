import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosSecure;
};

export default useAxiosPublic;
