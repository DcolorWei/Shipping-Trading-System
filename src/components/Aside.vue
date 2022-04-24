<template>
  <div class="sideItemList">
    <div
      class="sideItem"
      v-for="(item, index) in barItemList"
      :key="index"
      @click="changePage(item.path)"
    >
      {{ item.itemName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { routeItem } from "./Aside.entity";
import { routeStore } from "@/store/route";
import { sideRouter } from "@/router/side";
export default defineComponent({
  setup() {
    const route = routeStore();
    const barItemList:routeItem[] = reactive(sideRouter);

    function changePage(routePath: string): void {
      route.path = routePath;
    }
    return {
      barItemList,
      changePage,
      sideRouter,
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
  border: 2px solid #b3d0d6;
  background: white;
  border-radius: 50%;
  transition: 0.2s linear;
}

.sideItem:hover {
  width: 50px;
  height: 50px;
}
</style>