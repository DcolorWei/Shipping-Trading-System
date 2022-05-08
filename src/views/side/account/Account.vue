<template>
  <div class="info-card">
    <n-row class="top">
      <div class="avatar">
        <n-avatar
          :size="100"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fd30cf9e20e8ff953efa909b9f0a450cbd22c75dc.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654348462&t=4b555a9293a70c53a4d65364169af19a">
        </n-avatar>
      </div>
      <div class="company-info">
        <div class="company-name">{{ info.companyName || "起名困难" }}</div>
        <div class="tags-group">
          <n-tag type="success">
            {{ info.companyType || "未知" }}
          </n-tag>
          <n-tag type="info">
            <n-icon :component="EditOutlined" />
          </n-tag>
          <n-tag type="info">
            <n-icon :component="ShareAltOutlined" />
          </n-tag>
        </div>
      </div>
    </n-row>
    <n-row class="center">
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>ID</th>
            <th>电话</th>
            <th>邮箱</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ info.companyId || "这总不能瞎编" }}</td>
            <td>{{ info.phone || "毕竟没有数据库数据" }}</td>
            <td>{{ info.email || "你说咋办嘛" }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-table :bordered="false" :single-line="false">
        <tbody>
          <tr>
            <th>国家</th>
            <td>{{ info.country || "境外势力" }}</td>
            <th>城市</th>
            <td>{{ info.city || "纽约碰上西雅图" }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-table :bordered="false" :single-line="false">
        <tbody>
          <tr>
            <th>地址</th>
            <td>{{ info.address || "你想开盒？不你做不到" }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { AcconutInfo } from "./Account.entity";
import { NAvatar, NRow, NTag, NTable, NIcon } from "naive-ui";
import { EditOutlined, ShareAltOutlined } from "@vicons/antd";
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
      EditOutlined,
      ShareAltOutlined,
    };
  },
  components: {
    NAvatar,
    NRow,
    NTag,
    NTable,
    NIcon,
  },
});
</script>
<style scoped>
.info-card {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5% 20%;
}

.info-card .top {
  border-bottom: 1px solid gray;
  padding-bottom: 1%;
  min-width: 600px;
  display: flex;
  flex-wrap: nowrap;
}

.info-card .center {
  padding-top: 5%;
  min-width: 600px;
}

.info-card .top .avatar {
  padding-left: 10%;
  width: 15%;
  min-width: 120px;
}

.info-card .top .company-info {
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.info-card .top .company-info .company-name {
  font-size: 28px;
  font-weight: 600;
  min-width: 121px;
  margin-right: 5%;
}

.info-card .top .company-info .tags-group {
  display: flex;
  align-content: center;
}
.info-card .top .company-info .tags-group > * {
  margin-right: 10px;
}
</style>