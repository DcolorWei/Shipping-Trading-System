import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/account',
        name: "Account",
        component: () => import('../views/basic/account/Account.vue')
      },
      {
        path: '/chart',
        name: "Chart",
        component: () => import('../views/basic/chart/Chart.vue')
      },
      {
        path: '/company',
        name: "Company",
        component: () => import('../views/basic/company/Company.vue')
      },
      {
        path: '/matter',
        name: "Matter",
        component: () => import('../views/basic/matter/Matter.vue')
      },
      {
        path: '/staff',
        name: "Staff",
        component: () => import('../views/basic/staff/Staff.vue')
      },
    ]
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
  next();
});

export default router
