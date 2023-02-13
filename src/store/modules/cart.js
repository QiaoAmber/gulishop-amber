import { getCartInfo, postAddCart, getCartIsChecked, deleteCartItem } from "@/api";

const state = {
  cartInfoList: []
};
const getters = {
  totalSum(state) {
    return state.cartInfoList.reduce((prev, item) => (
      prev + item.cartInfoList.reduce((initial, next) => (initial + (next.isChecked === 1 ? next.skuNum * next.skuPrice : 0)), 0)), 0);
  },
  totalNum(state) {
    return state.cartInfoList.reduce((prev, item) => (
      prev + item.cartInfoList.reduce((initial, next) => (initial + (next.isChecked === 1 ? next.skuNum : 0)), 0)
    ), 0);
  },
  isAllCheck(state) {
    return state.cartInfoList.every(item => item.cartInfoList.every(box => box.isChecked === 1 && item.cartInfoList.length > 0));
  }
};
const mutations = {
  RECEIVE_CART_INFO(state, cartInfo) {
    state.cartInfoList = cartInfo;
  }
};
const actions = {
  async addToCart({ commit }, { skuId, skuNum }) {
    const result = await postAddCart(skuId, skuNum);
    if (result.code === 200) return "ok";
    else return Promise.reject(new Error("fail"));
  },
  async getCartInfoAsync({ commit }) {
    const result = await getCartInfo();
    if (result.code === 200) {
      commit("RECEIVE_CART_INFO", result.data);
    }
  },
  async getCartIsCheckedAsync({ commit }, { skuId, isChecked }) {
    const result = await getCartIsChecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  async updateAllCheck({ dispatch, state }, isChecked) {
    let promises = [];
    const cart = state.cartInfoList;
    const cartL = cart.length;
    for (let i = 0; i < cartL; i++) {
      const specialCart = cart[i].cartInfoList;
      const specialCartL = specialCart.length;
      for (let q = 0; q < specialCartL; q++) {
        if (specialCart[q].isChecked !== isChecked) {
          const promise = await dispatch("getCartIsCheckedAsync", {
            skuId: specialCart[q].skuId,
            isChecked
          });
          promises.push(promise);
        }
      }
    }
    return Promise.all(promises);
  },
  async deleteCartItemAsync({ commit }, skuId) {
    const result = await deleteCartItem(skuId);
    if (result.code === 200) return "ok";
    else return Promise.reject(new Error("fail"));
  },
  async deleteCartIsChecked({ dispatch, state }) {
    let promises = [];
    const cart = state.cartInfoList;
    const cartL = cart.length;
    for (let i = 0; i < cartL; i++) {
      const specialCart = cart[i].cartInfoList;
      const specialCartL = specialCart.length;
      for (let q = 0; q < specialCartL; q++) {
        if (specialCart[q].isChecked === 1) {
          const promise = await dispatch(
            "deleteCartItemAsync",
            specialCart[q].skuId
          );
          promises.push(promise);
        }
      }
    }
    return Promise.all(promises);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};