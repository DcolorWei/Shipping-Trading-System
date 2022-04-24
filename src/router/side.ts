const sideRouter = [
    {
        path: '/account',
        name: "Account",
        itemName:'账户图标',
        component: () => import('../views/side/account/Account.vue')
    },
    {
        path: '/chart',
        name: "Chart",
        itemName:'仪表图标',
        component: () => import('../views/side/chart/Chart.vue')
    },
    {
        path: '/company',
        name: "Company",
        itemName:'合作图标',
        component: () => import('../views/side/company/Company.vue')
    },
    {
        path: '/matter',
        name: "Matter",
        itemName:'任务图标',
        component: () => import('../views/side/matter/Matter.vue')
    },
    {
        path: '/staff',
        name: "Staff",
        itemName:'员工图标',
        component: () => import('../views/side/staff/Staff.vue')
    }
]
export {
    sideRouter
}