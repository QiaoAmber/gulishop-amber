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
