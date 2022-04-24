import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { sideRouter } from './side';
import { topRouter } from './top';
import { routeStore } from "@/store/route";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: sideRouter.concat(topRouter)
  },
  {
    path: '/login',
    name: "Login",
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {//未登录无法进入
  // if (to.path != "/login") {
  //   if (document.cookie.indexOf('userid') == -1)
  //     router.push('/login')
  // }
  
  //刷新后同步store和router数据
  routeStore().path=to.fullPath;
  next();
});

export default router
