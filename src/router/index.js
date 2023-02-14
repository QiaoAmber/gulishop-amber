import Vue from "vue";
import VueRouter from "vue-router";
import "nprogress/nprogress.css";
import store from "@/store";
import routes from "@/router/routes";
import NProgress from "nprogress";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let targetPath = to.path;
  if (
    targetPath.indexOf("/pay") === 0 ||
    targetPath.startsWith("/trade") ||
    targetPath.startsWith("/center")
  ) {
    if (store.state.user.userInfo.name) {
      next();
    } else {
      alert("请先登录！");
      next("/login?redirect=" + targetPath);
    }
  } else {
    next();
  }
});
router.afterEach((to,from)=>{
  NProgress.done()
})
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
