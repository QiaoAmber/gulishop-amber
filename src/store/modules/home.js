import { mockBanner, mockFloor, reqCategoryList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  RECIEVE_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECEIVE_BANNER_LIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVE_FLOOR_LIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async getCategoryList({ commit }) {
    const result = await reqCategoryList();
    commit("RECIEVE_CATEGORY_LIST", result.data);
  },
  async getBannerList({ commit }) {
    const result = await mockBanner();
    commit("RECEIVE_BANNER_LIST", result.data);
  },
  async getFloorList({ commit }) {
    const result = await mockFloor();
    commit("RECEIVE_FLOOR_LIST", result.data);
  },
};

export default {
  // eslint-disable-next-line no-undef
  // namespaced,
  state,
  mutations,
  actions,
};
