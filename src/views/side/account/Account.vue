<template>
  <div class="info-card">
    <n-row class="top">
      <div class="avatar">
        <n-avatar
          :size="100"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F9e%2F32%2F9a%2F9e329acc0c79523b0204f6ed7ea1e45e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653746645&t=f79876514d1f70af33a41cc14ea07084"
        >
        </n-avatar>
      </div>
      <div class="company-info">
        <div class="company-name">{{ info.companyName }}</div>
        <n-tag type="success">
          {{ info.companyType }}
        </n-tag>
      </div>
    </n-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { AcconutInfo } from "./Account.entity";
import { NAvatar, NRow, NCol, NTag } from "naive-ui";
import { ZhihuCircleFilled } from "@vicons/antd";
import axios from "axios";
axios.defaults.withCredentials = true;

export default defineComponent({
  setup() {
    let info: AcconutInfo = reactive({} as AcconutInfo);
    axios({
      url: "https://cunyuqing.online:8081/account/Info",
      method: "GET",
    }).then((res) => {
      for (let i in res.data) {
        info[i as keyof AcconutInfo] = res.data[i];
      }
    });
    return {
      info,
      ZhihuCircleFilled,
    };
  },
  components: {
    NAvatar,
    NRow,
    NTag,
  },
});
</script>
<style scoped>
.info-card {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 5% 30%;
}

.top {
  border-bottom: 1px solid gray;
  padding-bottom: 1%;
  min-width: 500px;
  display: flex;
  flex-wrap: nowrap;
}

.info-card .top .avatar {
  padding-left: 10%;
  width: 15%;
  min-width: 150px;
}

.info-card .top .company-info {
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.info-card .top .company-info .company-name {
  font-size: 30px;
  font-weight: 600;
  min-width: 121px;
  margin-right: 5% ;
}
</style>