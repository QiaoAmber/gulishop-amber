import store from "@/store";
const Home = () => import(/*webpackChunkName:'Home'*/ "@/views/Home");
const Login = () => import(/*webpackChunkName:'Login'*/ "@/views/Login");
const Search = () => import(/*webpackChunkName:'Search'*/ "@/views/Search");
const Detail = () => import(/*webpackChunkName:'Detail'*/ "@/views/Detail");
const ShopCart = () => import(/*webpackChunkName:'cart'*/ "@/views/ShopCart");
const AddCartSuccess = () =>
  import(/*webpackChunkName:'cart'*/ "@/views/AddCartSuccess");
const Trade = () => import(/*webpackChunkName:'Trade'*/ "@/views/Trade");
const Pay = () => import(/*webpackChunkName:'Pay'*/ "@/views/Pay");
const PaySuccess = () => import(/*webpackChunkName:'Pay'*/ "@/views/PaySuccess");
const Center = () => import(/*webpackChunkName:'Center'*/ "@/views/Center");
const MyOrder = () => import(/*webpackChunkName:'Center'*/ "@/views/Center/MyOrder");
const Register = () => import(/*webpackChunkName:'Register'*/ "@/views/Register");
const GroupOrder = () => import(/*webpackChunkName:'Center'*/ "@/views/Center/GroupOrder");

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
    beforeEnter: (to, from, next) => {
      if (store.state.user.userInfo.name) {
        next("/");
      } else {
        next();
      }
    },
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
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
      if (skuInfo && skuNum) {
        next();
      } else {
        next(from);
      }
    }
  },
  {
    name: "trade",
    path: "/trade",
    component: Trade
  },
  {
    name: "pay",
    path: "/pay",
    component: Pay
  },
  {
    name: "paySuccess",
    path: "/paySuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay") next();
      else next("/");
    }
  },
  {
    name: "center",
    path: "/center",
    component: Center,
    children: [
      {
        name: "",
        path: "",
        component: MyOrder
      },
      {
        name: "myOrder",
        path: "myOrder",
        component: MyOrder
      },
      {
        name: "groupOrder",
        path: "groupOrder",
        component: GroupOrder
      }
    ]
  }
];

export default routes;