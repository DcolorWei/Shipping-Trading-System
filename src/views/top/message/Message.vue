<template>
  <div style="margin: 0 15%; height: 100%">
    <div class="title">通知中心</div>
    <div class="message-container">
      <div class="message-list" v-show="messageList.length > 0">
        <div
          class="message-item"
          v-for="item in messageList"
          :key="item.messageId"
          v-bind:style="{
            //根据不同状态切换卡片颜色
            background:
              item.messageType == '0'
                ? 'white'
                : item.messageType == '1'
                ? '#ECF5FF'
                : '#F0F9EB',
            'border-left': `4px solid ${
              item.isRead == 1 ? 'transparent' : 'red'
            }`,
          }"
        >
          <div class="sender">{{ item.companyName }}</div>
          <div class="sendtime">{{ item.sendTime }}</div>
        </div>
      </div>
      <div class="message-content" v-show="messageList.length > 0">
        <div v-if="messageContent == null" class="message-text">
          <n-skeleton text :repeat="10" />
          <n-skeleton text style="width: 60%" />
        </div>
        <div v-else class="message-text">
          {{ messageContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, watch } from "vue";
import { NSkeleton } from "naive-ui";
import { messageStore } from "@/store/message";
import { Message } from "./Message.entity";
export default defineComponent({
  setup() {
    let messageList: Message[] = reactive([]);
    watch(
      messageStore(),
      (news) => {
        messageList = news.messageList;
      },
      {
        immediate: true,
      }
    );

    let messageContent: Ref<string | null> = ref(null);
    return {
      messageList,
      messageContent,
    };
  },
  components: {
    NSkeleton,
  },
});
</script>

<style scoped>
.title {
  padding: 2% 5%;
  border-bottom: 2px solid rgb(70, 70, 70);
  text-align: left;
  font-size: 23px;
  font-weight: 600;
}

.message-container {
  display: flex;
  justify-content: center;
  height: 85%;
}
.message-list {
  width: 30%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.message-list::-webkit-scrollbar {
  width: 2px;
}
.message-list::-webkit-scrollbar-thumb {
  border-radius: 1px;
  background-color: #ccc;
}
.message-list::-webkit-scrollbar-track-piece {
  background-color: whitesmoke;
}

.message-list .message-item {
  width: 90%;
  height: 16%;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  margin: 5% auto;
  background: white;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.message-content {
  width: 70%;
  height: 90%;
  margin: 2% 2%;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
  background: white;
}

.message-content .message-text {
  padding: 10%;
}

.sender {
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
}
.sendtime {
  margin: 0 auto;
  text-align: center;
  color: gray;
}
</style>