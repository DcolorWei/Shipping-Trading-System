import { defineStore } from 'pinia'
//这个store用于存储消息，全局订阅
import axios from "axios";
import { reactive } from 'vue';

const messageList: any[] = reactive([])
function updateMessage(): Promise<any> {
    return axios({
        url: "https://cunyuqing.online:8081/message/getMessage",
        params: {
            messageId: 1,
        },
    })
}

const ws = new WebSocket('wss://cunyuqing.online:8081/ws')
ws.onopen = async () => ((await updateMessage()).data.forEach((element: any) => {
    messageList.push(element)
}));//连接成功，初始化数据
ws.onmessage = async () => ((await updateMessage()).data.forEach((element: any) => {
    messageList.push(element);
}));


export const messageStore = defineStore('messageStore', {
    state: () => {
        return {
            messageList: messageList
        }
    },
})