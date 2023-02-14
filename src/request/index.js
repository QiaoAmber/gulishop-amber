import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

const request = axios.create({
  baseURL: "http://sph-h5-api.atguigu.cn/api",
  timeout: 20000
});

request.interceptors.request.use(
  (config) => {
    let userTempId = store.state.user.userTempId;
    if (userTempId) {
      config.headers.userTempId = userTempId;
    }
    let token = store.state.user.userInfo.token;
    if (token) {
      config.headers.token = token;
    }
    if(config.data&&config.data.showProgress) NProgress.start();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 300) {
      NProgress.done();
      return res.data;
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
      }
      // 以后项目中可以对error.message进行统一管理操作
    }
    NProgress.done();
    return Promise.reject(error);
  }
);

export default request;
