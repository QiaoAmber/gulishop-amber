import { getTradeInfo } from "@/api";

const state = {
  tradeInfo: {},
};
const getters = {
  totalAmount(state) {
    return state.tradeInfo.totalAmount;
  },
  userAddressList(state) {
    return state.tradeInfo.userAddressList || [];
  },
  totalTradeNum(state) {
    return state.tradeInfo.totalNum;
  },
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || [];
  }
};
const mutations = {
  RECEIVE_TRADE_INFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};
const actions = {
  async getTradeInfoAsync({ commit }) {
    const result = await getTradeInfo();
    if (result.code === 200) {
      commit("RECEIVE_TRADE_INFO", result.data);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};