import axios from "axios";

const withAxios = apiConfig => {
  const serviceMap = {};
  apiConfig.map(({ name, url, method }) => {
    serviceMap[name] = async function(data = {}) {
      let key = "params";
      console.log('method：', method)
      if (method === "post" || method === "put") {
        key = "data";
      }
      console.log(' [key]: data：',  [key], data)
      return axios({
        method,
        url,
        [key]: data
      });
    };
  });
  return serviceMap;
};

export default withAxios;
