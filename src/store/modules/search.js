import { postGoodsList } from "@/api";

const state = {
  goodsInfoList: {},
};
const getters = {
  attrsList(state) {
    return state.goodsInfoList.attrsList;
  },
  goodsList(state) {
    return state.goodsInfoList.goodsList;
  },
  trademarkList(state) {
    return state.goodsInfoList.trademarkList;
  },
};
const mutations = {
  RECEIVE_GOODSINFO_LIST(state, goodsInfoList) {
    state.goodsInfoList = goodsInfoList;
  },
};
const actions = {
  async postGoodsInfoAsync({ commit }, searchInfo) {
    const { data, code } = await postGoodsList(searchInfo);
    if (code === 200) commit("RECEIVE_GOODSINFO_LIST", data);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
