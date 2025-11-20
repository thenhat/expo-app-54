import axios, { AxiosResponse } from "axios";
import { LocalStoreKey } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
  timeout: 300 * 1000,
  headers: {
    "content-type": "application/json",
    "Accept-Language": "ko-KR",
  },
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem(LocalStoreKey.TOKEN);

    if (config.headers) {
      if (config.requiredToken && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        const token = await AsyncStorage.getItem(LocalStoreKey.TOKEN);
        if (token !== null) {
          await AsyncStorage.removeItem(LocalStoreKey.TOKEN);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
