import { getSkuInfo } from "@/api";

const state = {
  skuInfo: {}
};
const getters = {
  spuSaleAttrList(state) {
    return state.skuInfo.spuSaleAttrList || [];
  },
  skuInfo(state) {
    return state.skuInfo.skuInfo || {};
  },
  skuImageList(state) {
    return state.skuInfo.skuInfo.skuImageList || [];
  },
  skuAttrValueList(state) {
    return state.skuInfo.skuInfo.skuAttrValueList || [];
  },
  skuSaleAttrValueList(state) {
    return state.skuInfo.skuInfo.skuSaleAttrValueList || [];
  }
};
const mutations = {
  RECEIVE_SKU_INFO(state, skuInfo) {
    state.skuInfo = skuInfo;
  }
};
const actions = {
  async getSkuInfoAsync({ commit }, id) {
    const result = await getSkuInfo(id);
    if (result.code === 200) {
      commit("RECEIVE_SKU_INFO", result.data);
      console.log(result.data);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};