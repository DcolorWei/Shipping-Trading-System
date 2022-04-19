<template>
  <div class="sideItemList">
    <div
      class="sideItem"
      v-for="(item, index) in barItemList"
      :key="index"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const barItemList = reactive([
      {
        icon: "AddReactionOutlined",
        routePath: "home",
      },
      {
        icon: "QUERY",
        routePath: "query",
      },
      {
        icon: "MANAGER",
        routePath: "manager",
      },
      {
        icon: "ABOUT",
        routePath: "about",
      },
      {
        icon: "HELP",
        routePath: "help",
      },
    ]);
    return {
      barItemList,
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
  margin: 5px;
  width: 40px;
  height: 40px;
  border: 2px solid red;
  background: white;
  border-radius: 50%;
}
</style>