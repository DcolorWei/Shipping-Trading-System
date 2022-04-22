<template>
  <div class="barItemList">
    <div class="barItem" v-for="(item, index) in barItemList" :key="index">
      {{ item.itemName }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const barItemList = reactive([
      {
        itemName: "HOME",
        routePath: "home",
      },
      {
        itemName: "QUERY",
        routePath: "query",
      },
      {
        itemName: "MESSAGE",
        routePath: "massage",
      },
      {
        itemName: "ABOUT",
        routePath: "about",
      }
    ]);
    return {
      barItemList,
    };
  },
  components: {},
});
</script>
<style scoped>
.barItemList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.barItem {
  color: white;
  font-size: 20px;
  padding: 6%;
  width: 100%;
}
</style>