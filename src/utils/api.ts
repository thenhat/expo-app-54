import axiosClient from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export type HttpProps = {
  method: "get" | "post" | "put" | "patch" | "delete";
  endPoint?: string;
  body?: object;
  type?: "normal" | "option";
  fullUrl?: string;
  requiredToken?: boolean;
  headers?: any;
};

interface CustomRequestConfig extends AxiosRequestConfig {
  requiredToken?: boolean;
}

const sendApiRequest = async <T>({
  method,
  endPoint = "",
  body = {},
  fullUrl,
  requiredToken = true,
  headers,
}: HttpProps): Promise<T> => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (fullUrl) {
      const resp = await axiosClient
        .request({
          url: fullUrl,
          method,
          requiredToken,
        } as CustomRequestConfig)
        .catch((err: any) => err);
      if (!resp.data) throw resp;
      return resp.data;
    }
    axiosClient.defaults.baseURL = process.env.EXPO_PUBLIC_API_BASE;
    const resp = await axiosClient.request({
      url: endPoint,
      method,
      requiredToken,
      ...{
        [method === "get" ? "params" : "data"]: body,
      },
      headers,
    } as CustomRequestConfig);
    if (!resp.data) throw resp;
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export default sendApiRequest;
