import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const onRequest = async (config) => {
  return new Promise(async (resolve) => {
    const token = Cookies.get("token");
    if (token && config.headers !== undefined) {
      config.headers["x-access-token"] = `${token}`;
    }
    resolve(config);
  });
};
apiClient.interceptors.request.use(onRequest);

export default apiClient;
