import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/home";
import Login from "../components/login";
import List from "../components/list";
import store from '../store/index'

// import Home from "../components/home"
const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      isNeedLogin: true
    },
    children: [
      {
        path: "list",
        component: resolve => require(["../components/list"], resolve),
        meta: {
          isNeedLogin: true
        }
      },
      {
        path: "create",
        component: resolve => require(["../components/create"], resolve),
        meta: {
          isNeedLogin: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  let isLogin = store.state.isLogin
  if (to.meta.isNeedLogin) {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router;
