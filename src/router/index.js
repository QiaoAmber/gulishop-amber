import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isFootHide: true
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isFootHide: true
    }
  },
  {
    path: "/search/:keyword",
    component: Search
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
