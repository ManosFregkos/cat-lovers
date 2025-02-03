import axios, {AxiosError, AxiosRequestConfig, CancelTokenSource} from "axios";
import {API_URL} from "../config.ts";

export interface SpringBootError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  timestamp: number;
  "full-path": string;
}

function handleError(err: AxiosError<SpringBootError>) {
  if (err.response) {
    const errorMsg = err.response?.data?.detail;
    throw new Error(errorMsg);
  }

  throw new Error(err.message);
}

const cancelTokenSources = new Map<string, CancelTokenSource>();


const setupCancelToken = (requestKey: string): CancelTokenSource => {
  if (cancelTokenSources.has(requestKey)) {
    cancelTokenSources.get(requestKey)!.cancel();
  }
  const source = axios.CancelToken.source();
  cancelTokenSources.set(requestKey, source);
  return source;
};

const clearCancelToken = (requestKey: string) => {
  cancelTokenSources.delete(requestKey);
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'x-api-key' : import.meta.env.VITE_KEY }
});


// HTTP methods
export const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
  requestKey?: string
): Promise<T> => {
  const source = requestKey ? setupCancelToken(requestKey) : undefined;
  try {
    const response = await axiosInstance.get<T>(url, {
      ...config,
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request was canceled');
    }
    throw (handleError(error as AxiosError<SpringBootError>));
  } finally {
    if (requestKey) clearCancelToken(requestKey);
  }
};

export const postData = async <T>(
  url: string,
  data: object = {},
  config?: AxiosRequestConfig,
  requestKey?: string
): Promise<T> => {
  const source = requestKey ? setupCancelToken(requestKey) : undefined;
  const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' };

  try {
    const response = await axiosInstance.post<T>(url, data, {
      ...config,
      headers: { ...headers, ...config?.headers },
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request was canceled');
    }
    throw (handleError(error as AxiosError<SpringBootError>));
  } finally {
    if (requestKey) clearCancelToken(requestKey);
  }
};

export const updateData = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  requestKey?: string
): Promise<T> => {
  const source = requestKey ? setupCancelToken(requestKey) : undefined;
  try {
    const response = await axiosInstance.put<T>(url, data, {
      ...config,
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request was canceled');
    }
    throw (handleError(error as AxiosError<SpringBootError>));
  } finally {
    if (requestKey) clearCancelToken(requestKey);
  }
};

export const deleteData = async <T>(
  url: string,
  data: object = {},
  config?: AxiosRequestConfig,
  requestKey?: string
): Promise<T> => {
  const source = requestKey ? setupCancelToken(requestKey) : undefined;
  try {
    const response = await axiosInstance.delete<T>(url, {
      ...config,
      data,
      cancelToken: source?.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request was canceled');
    }
    throw (handleError(error as AxiosError<SpringBootError>));
  } finally {
    if (requestKey) clearCancelToken(requestKey);
  }
};