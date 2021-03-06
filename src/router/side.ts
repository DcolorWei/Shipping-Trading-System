const sideRouter = [
    {
        path: '/account',
        name: "Account",
        itemName: '账户图标',
        component: (): Promise<typeof import("*.vue")> => import('../views/side/account/Account.vue')
    },
    {
        path: '/matter',
        name: "Matter",
        itemName: '任务图标',
        component: (): Promise<typeof import("*.vue")> => import('../views/side/matter/Matter.vue')
    },
    {
        path: '/chart',
        name: "Chart",
        itemName: '仪表图标',
        component: (): Promise<typeof import("*.vue")> => import('../views/side/chart/Chart.vue')
    },
    {
        path: '/company',
        name: "Company",
        itemName: '合作图标',
        component: (): Promise<typeof import("*.vue")> => import('../views/side/company/Company.vue')
    },

    {
        path: '/staff',
        name: "Staff",
        itemName: '员工图标',
        component: (): Promise<typeof import("*.vue")> => import('../views/side/staff/Staff.vue')
    }
]
export {
    sideRouter
}