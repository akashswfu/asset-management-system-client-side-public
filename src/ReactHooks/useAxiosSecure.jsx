import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://tasty-bites-server-site.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
