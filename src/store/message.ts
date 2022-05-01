import { defineStore } from 'pinia'
//这个store用于存储消息，全局订阅
import axios from "axios";
import { reactive } from 'vue';
import { Message } from "@/views/top/message/Message.entity"
axios.defaults.withCredentials = true

const messageList: Message[] = reactive([])

//更新消息列表方法
function updateMessage(): void {
    axios({
        url: "https://cunyuqing.online:8081/message/getMessage",
        params: {
            messageId: 1,
        },
    }).then(res => {
        console.log(res.data)

        //清空旧消息列表
        while (messageList.length > 0) {
            messageList.shift();
        }

        //载入新消息列表
        if (res!=null) {
            res.data.forEach((element: Message) => {
                messageList.push(element)
            })
        }
    }).catch(res => {//获取失败，展示示例数据
        //清空旧消息列表
        while (messageList.length > 0) {
            messageList.shift();
        }

        //载入新消息列表
        [
            { messageId: 1, companyName: '系统消息', messageType: '0', sendTime: '2022-04-27 06:50:31', isRead: 0 },
            { messageId: 2, companyName: '好友请求', messageType: '1', sendTime: '2022-04-26 09:50:31', isRead: 1 },
            { messageId: 3, companyName: '询价动态', messageType: '2', sendTime: '2022-04-26 09:48:43', isRead: 0 }
        ].forEach((element: Message) => {
            messageList.push(element)
        })
    })
}

updateMessage();

//创建websocket链接
const ws = new WebSocket('wss://cunyuqing.online:8081/ws')
//连接成功，初始化数据
ws.onopen = (e) => { console.log(e); updateMessage() };

//有消息更新
ws.onmessage = () => (updateMessage());


export const messageStore = defineStore('messageStore', {
    state: () => {
        return {
            messageList: messageList,
            updateMessage
        }
    },
})