<template>
  <div class="sideItemList">
    <div
      class="sideItem"
      v-for="(item, index) in barItemList"
      :key="index"
      @click="changePage(item.path)"
    >
      <n-icon size="40" :component="iconList[index]" />
    </div>
  </div>
  <div class="tab-bar"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { routeItem } from "./Aside.entity";
import { routeStore } from "@/store/route";
import { sideRouter } from "@/router/side";
import { NIcon } from "naive-ui";
import { ClipboardOutline, TimerOutline,LayersOutline } from "@vicons/ionicons5";
import { TeamOutlined, UserOutlined } from "@vicons/antd";
export default defineComponent({
  setup() {
    const route = routeStore();
    const barItemList: routeItem[] = reactive(sideRouter);

    const iconList = [
      UserOutlined,
      ClipboardOutline,
      TimerOutline,
      LayersOutline,
      TeamOutlined,
    ];
    function changePage(routePath: string): void {
      route.path = routePath;
    }
    return {
      barItemList,
      changePage,
      sideRouter,
      iconList,
    };
  },
  components: {
    NIcon,
  },
});
</script>
<style scoped>
.sideItemList {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.sideItemList .sideItem {
  margin: 10px;
  width: 40px;
  height: 40px;
  border: 2px solid #b3d0d6;
  background: white;
  border-radius: 30%;
  transition: 0.15s linear;
}

.sideItemList .sideItem:hover {
  transform: scale(1.25) rotate(10deg);
}

</style>