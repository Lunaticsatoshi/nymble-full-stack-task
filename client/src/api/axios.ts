import axios, { Method, AxiosResponse } from "axios";

// Build Api Method
const buildApi = (): any => {
  const processResponse = async (
    callInstance: Promise<AxiosResponse<any, any>>
  ) => {
    try {
      const { data } = await callInstance;
      if (data && data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (e: any) {
      if (e.response && e.response.status) {
        switch (e.response.status) {
          case 401:
            console.log("401");
            break;
          default:
            console.log("error", e.response.data.message);
        }
      }

      throw e;
    } finally {
    }
  };

  const callAxiosMethod = (methodName: Method, path: string, ...args: any) => {
    return processResponse(
      axios.request({
        method: methodName,
        url: path,
        data: args[1],
      })
    );
  };

  const requests = {
    get: (...args: any[]) => callAxiosMethod("get", args[0], ...args),
    post: (...args: any[]) => callAxiosMethod("post", args[0], ...args),
    put: (...args: any[]) => callAxiosMethod("put", args[0], ...args),
    patch: (...args: any[]) => callAxiosMethod("patch", args[0], ...args),
    delete: (...args: any[]) => callAxiosMethod("delete", args[0], ...args),
  };

  // User urls
  const getArticles = (data: any) => requests.post("user/auth/login/", data);

  return {
    getArticles,
  };
};

const api = () => buildApi();

export default api;
