<template>
  <div><Echarts1></Echarts1></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Echarts1 from "./chartStock/echarts1.vue";
export default defineComponent({
  setup() {
    return {};
  },
  components: {
    Echarts1,
  },
});
</script>
