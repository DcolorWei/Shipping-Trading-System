import { defineStore } from 'pinia'

//这个store用于存储路由信息，任何页面相关路由都应该引用此文件
export const routeStore = defineStore('routeStore', {
    state: () => {
        return {
            path: '/'
        }
    },
})