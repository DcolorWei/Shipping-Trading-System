<template>
  <div style="margin: 0 15%; height: 100%">
    <div class="title">通知中心</div>
    <div class="message-container">
      <div class="message-list" v-show="messageList.length > 0">
        <div
          class="message-item"
          v-for="item in messageList"
          :key="item.messageId"
        >
          <div>{{ item.companyName }}</div>
          <div>{{ item.sendTime }}</div>
        </div>
      </div>
      <div class="message-content" v-show="messageList.length > 0">
        <div class="message-text">
          <n-skeleton text :repeat="10" />
          <n-skeleton text style="width: 60%" />
        </div>
      </div>
      <!-- <div v-if="messageList.length == 0">
        <div style="font-size: 200px; margin-bottom: -100px">🍵</div>
        <n-result
          status="209"
          title="并不会有人找你"
          description="一切尽在不言中"
        >
          <template #footer>
            <n-button>真是个杯具</n-button>
          </template>
        </n-result>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { NSkeleton } from "naive-ui";
import { messageStore } from "@/store/message";

export default defineComponent({
  setup() {
    let messageList: any[] = reactive([]);
    watch(
      messageStore(),
      (news) => {
        messageList = news.messageList;
      },
      {
        immediate: true,
      }
    );
    return {
      messageList,
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
</style>