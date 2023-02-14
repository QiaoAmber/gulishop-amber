import { getUserTempId } from "@/utils/userAbout";
import { postRegister, postLogin, getLogout } from "@/api";

const state = {
  userTempId: getUserTempId(),
  userInfo: JSON.parse(localStorage.getItem("USERINFO_KEY")) || {},
};
const getters = {};
const mutations = {
  RECEIVE_LOGIN_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  REMOVE_USER_INFO(state) {
    state.userInfo = {};
  },
};
const actions = {
  async postRegisterAsync(userInfo) {
    const result = await postRegister(userInfo);
    if (result.code === 200) return "ok";
    else return Promise.reject(new Error("fail"));
  },
  async postLoginAsync({ commit }, userInfo) {
    const result = await postLogin(userInfo);
    if (result.code === 200) {
      commit("RECEIVE_LOGIN_INFO", result.data);
      localStorage.setItem("USERINFO_KEY", JSON.stringify(result.data));
      return "ok";
    } else return Promise.reject(new Error("fail"));
  },
  async getLogoutAsync({ commit }) {
    const result = await getLogout();
    if (result.code === 200) {
      commit("REMOVE_USER_INFO");
      localStorage.removeItem("USERINFO_KEY");
      return "ok";
    } else return Promise.reject(new Error("fail"));
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
