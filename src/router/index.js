import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import Detail from "@/views/Detail";
import ShopCart from "@/views/ShopCart";
import AddCartSuccess from "@/views/AddCartSuccess";
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      isFootHide: true
    }
  },
  {
    name: "register",
    path: "/register",
    component: Register,
    meta: {
      isFootHide: true
    }
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart
  },
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: AddCartSuccess
  },
  {
    name: "trade",
    path: "/trade",
    component: Trade
  },
  {
    name: "pay",
    path: "/pay",
    component: Pay,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

const OriginPush = VueRouter.prototype.push;
const OriginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve === undefined && reject === undefined) {
    return OriginPush.call(this, location).catch(() => {
    });
  } else {
    return OriginPush.call(this, location, resolve, reject);
  }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve === undefined && reject === undefined) {
    return OriginReplace.call(this, location).catch(() => {
    });
  } else {
    return OriginReplace.call(this, location, resolve, reject);
  }
};

export default router;
