<template>
  <div class="side">
    <Aside></Aside>
  </div>
  <div class="header">
    <Top></Top>
  </div>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { routeStore } from "@/store/route";
import Aside from "@/components/Aside.vue";
import Top from "@/components/Top.vue";
import router from "@/router";

export default defineComponent({
  name: "Home",
  setup() {
    const route = routeStore();
    watch(
      route,
      () => {
        router.push(route.path);
      },
      { deep: true }
    );
  },
  components: {
    Aside,
    Top,
  },
});
</script>

<style scoped>
.side {
  position: absolute;
  height: 100%;
  width: 8%;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  position: absolute;
  left: 8%;
  height: 10%;
  width: 86%;
  padding-left: 4%;
  background: whitesmoke;
  display: flex;
  align-items: flex-end;
}
.container {
  position: absolute;
  top: 10%;
  left: 8%;
  height: 90%;
  width: 92%;
  background: #eeeeee;
}
</style>
