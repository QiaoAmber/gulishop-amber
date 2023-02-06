import axios from "axios";

const request = axios.create({
  baseURL: "http://39.98.123.211/",
  timeout: 20000
});

request.interceptors.request.use(config => {
  return config;
});

request.interceptors.response.use((res) => {
  return res.data;
}, err => {
  return new Promise(() => {
  });
});

export default request