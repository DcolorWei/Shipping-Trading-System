const topRouter = [
    //manage不存在，五个侧边栏按钮为其子页面
    {
        path: '/manage',
        name: "Manage",
        itemName: "MANAGE",
        component: () => import('../views/side/account/Account.vue')
    },
    {
        path: '/query',
        name: "Query",
        itemName: "QUERY",
        component: () => import('../views/top/query/Query.vue')
    },
    {
        path: '/message',
        name: "Message",
        itemName: "MESSAGE",
        component: () => import('../views/top/message/Message.vue')
    },
    {
        path: '/about',
        name: "About",
        itemName: "ABOUT",
        component: () => import('../views/top/about/About.vue')
    }
]
export {
    topRouter
}