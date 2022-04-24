<template>
  <div class="barItemList">
    <n-tabs default-value="" :value="topTabShow" @before-leave="changePage">
      <n-tab
        display-directive="show"
        v-for="(item, index) in topRouter"
        :name="item.itemName"
        :key="index"
      >
      </n-tab>
    </n-tabs>

    <div class="barItem"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { routeStore } from "@/store/route";
import { routeItem } from "./Top.entity";
import { topRouter } from "@/router/top";
import { NTab, NTabs } from "naive-ui";

export default defineComponent({
  setup() {
    const route = routeStore();
    let topTabShow = ref();
    const barItemList: routeItem[] = reactive(topRouter);
    barItemList.unshift({ path: "/", itemName: "HOME" });
    watch(
      route,
      () => {
        const item = topRouter.find((e) => e.path == route.path);
        topTabShow.value = item?.itemName || "MANAGE";//点击侧边栏
      },
      {
        immediate: true,
        deep: true,
      }
    );

    function changePage(itemName: string): void {
      const item = topRouter.find((e) => e.itemName == itemName);
      topTabShow.value = item!.itemName;
      route.path = item!.path;
    }
    return {
      topTabShow,
      barItemList,
      changePage,
      topRouter,
    };
  },
  components: {
    NTab,
    NTabs,
  },
});
</script>
<style scoped>
.barItemList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.barItem {
  color: black;
  font-size: 20px;
  padding: 6%;
  width: 100%;
}
</style>