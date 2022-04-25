<template>
  <div style="margin: 0 15%; height: 100%">
    <div class="title">通知中心</div>
    <div class="message-container">
      <div class="message-list" v-if="messageList.length > 0">
        >
        <div
          class="message-item"
          v-for="item in messageList"
          :key="item.messageId"
        ></div>
      </div>
      <div class="message-content" v-if="messageList.length > 0">
        <div class="message-text">
          <n-skeleton text :repeat="10" />
          <n-skeleton text style="width: 60%" />
        </div>
      </div>
      <div v-else>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { NSkeleton, NResult, NButton } from "naive-ui";
import axios from "axios";
export default defineComponent({
  setup() {
    let messageList = reactive([]);
    axios.get("http://49.232.128.228:8080/message/getMessage").then((res) => {
      messageList = res.data;
    });
    return {
      messageList,
    };
  },
  components: {
    NSkeleton,
    NResult,
    NButton,
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