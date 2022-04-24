<template>
  <div class="message-card">
    <div class="title">通知中心</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
  components: {},
});
</script>

<style scoped>
.message-card {
  margin: 1% 20%;
  width: 60%;
  height: 80%;
  background: whitesmoke;
}

.message-card .title {
  padding: 2% 5%;
  border-bottom: 2px solid rgb(70, 70, 70);
  text-align: left;
  font-size: 23px;
  font-weight: 600;
}
</style>