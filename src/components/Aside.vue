<template>
  <div class="sideItemList">
    <div
      class="sideItem"
      v-for="(item, index) in barItemList"
      :key="index"
      @click="changePage(item.routePath)"
    >
      {{ item.icon }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { routeStore } from "@/store/route";
export default defineComponent({
  setup() {
    const route = routeStore();

    const barItemList = reactive([
      {
        icon: "账号",
        routePath: "account",
      },
      {
        icon: "任务",
        routePath: "matter",
      },
      {
        icon: "视图",
        routePath: "chart",
      },
      {
        icon: "人员",
        routePath: "staff",
      },
      {
        icon: "合作",
        routePath: "company",
      },
    ]);

    function changePage(routePath: string): void {
      route.path = routePath;
    }
    return {
      barItemList,
      changePage,
    };
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

.sideItem {
  margin: 10px;
  width: 40px;
  height: 40px;
  border: 2px solid red;
  background: white;
  border-radius: 50%;
  transition: 0.2s linear;
}

.sideItem:hover {
  width: 50px;
  height: 50px;
}
</style>