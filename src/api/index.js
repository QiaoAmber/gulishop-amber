import request from "@/request";
import mock from "@/request/mock";

export const reqCategoryList = () => {
  return request.get("/product/getBaseCategoryList");
};

export const mockBanner = () => {
  return mock.get("/banner");
};
export const mockFloor = () => {
  return mock.get("/floor");
};

/*
请求地址：/api/list
请求方式：post
请求参数：
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": [
        "1:1700-2799:价格",
        "2:6.65-6.74英寸:屏幕尺寸"
    ],
    "trademark": "4:小米"
}
*/

export const postGoodsList = (data) => {
  return request.post("/list", data);
};

export const getSkuInfo = (id) => {
  return request.get(`/item/${id}`);
};

export const postAddCart = (skuId, skuNum) => {
  return request.post(`/cart/addToCart/${skuId}/${skuNum}`);
};

export const getCartInfo = () => {
  return request.get("/cart/cartList");
};

//GET /api/cart/checkCart/{skuId}/{isChecked}
export const getCartIsChecked = (skuId, isChecked) => {
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`);
};

export const deleteCartItem = (skuId) => {
  return request.delete(`/cart/deleteCart/${skuId}`);
};

export const getSendCode = (phone) => {
  return request.get(`/user/passport/sendCode/${phone}`);
};

export const postRegister = (userInfo) => {
  return request.post("/user/passport/register", userInfo);
};

//POST /api/user/passport/login
export const postLogin = (userInfo) => {
  return request.post("/user/passport/login", userInfo);
};

//GET /api/user/passport/logout

export const getLogout = () => {
  return request.get("/user/passport/logout");
};

export const getTradeInfo = () => {
  return request.get("/order/auth/trade");
};

export const postSubmitOrder = (tradeNo, tradeInfo) => {
  return request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfo);
};

///payment/weixin/createNative/{orderId}
export const getPayment = (orderId)=>{
  return request.get(`/payment/weixin/createNative/${orderId}`);
}