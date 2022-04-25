<template>
  <div class="side">
    <Aside></Aside>
  </div>
  <div class="header">
    <Top></Top>
  </div>
  <div class="container">
    <div class="panel">
      <router-view></router-view>

      <div style="margin: 0 auto; padding-top: 5%" v-show="showHome">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 70px;
            font-weight: 600;
            width: 100%;
          "
        >
          航运物流系统
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: 600;
            width: 100%;
          "
        >
          一个好产品，只需要功能，不需要描述
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            font-weight: 300;
            width: 100%;
          "
        >
          <del>（真的不是因为写不出文案）</del>
        </div>
        <div
          style="
            padding-top: 5%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: 600;
            width: 100%;
          "
        >
          <n-button type="success" size="large" strong>
            产品经理说要有一个按钮
          </n-button>
        </div>
        <div
          style="
            padding-top: 5%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-style: italic;
            color:grey;
          "
        >
          <pre>
          两月美工找不到，图标画完也得删。
                                        ——村雨清
          </pre>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { routeStore } from "@/store/route";
import Aside from "@/components/Aside.vue";
import Top from "@/components/Top.vue";
import router from "@/router";
import { NButton } from "naive-ui";

export default defineComponent({
  name: "Home",
  setup() {
    const route = routeStore();
    let showHome = ref(false);
    watch(
      route,
      () => {
        router.push(route.path);
        if (route.path === "/") {
          showHome.value = true;
        } else {
          showHome.value = false;
        }
      },
      { deep: true, immediate: true }
    );

    return {
      showHome,
    };
  },
  components: {
    Aside,
    Top,
    NButton,
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
  width: 88%;
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

.panel {
  margin: 2% 5%;
  width: 90%;
  height: 90%;
  background: whitesmoke;
}
</style>
