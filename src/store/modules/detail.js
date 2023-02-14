import { getSkuInfo } from "@/api";

const state = {
  skuInfo: {},
};
const getters = {
  categoryView(state) {
    return state.skuInfo.categoryView || {};
  },
  spuSaleAttrList(state) {
    return state.skuInfo.spuSaleAttrList || [];
  },
  skuInfo(state) {
    return state.skuInfo.skuInfo || {};
  },
};
const mutations = {
  RECEIVE_SKU_INFO(state, skuInfo) {
    state.skuInfo = skuInfo;
  },
};
const actions = {
  async getSkuInfoAsync({ commit }, id) {
    const result = await getSkuInfo(id);
    if (result.code === 200) {
      commit("RECEIVE_SKU_INFO", result.data);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
