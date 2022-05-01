<template>
  <!-- 复用性极低的样子 -->
  <div class="popup">
    <div style="margin: 0 10%; padding: 1% 10%; background: white">
      <n-row :gutter="40">
        <n-form ref="formRef" :model="staffInfo" :rules="rules">
          <n-col
            :span="12"
            v-for="(item, index) in Object.keys(staffInfo)"
            :key="index"
          >
            <n-form-item :label="label[index]">
              <n-input />
            </n-form-item>
          </n-col>
        </n-form>
      </n-row>
    </div>
    {{ staff }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { NForm, NFormItem, NInput, NRow, NCol } from "naive-ui";

export default defineComponent({
  name: "Popup",
  props: {
    staffInfo: {},
    label: [],
  },
  setup() {
    return {};
  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
  },
});
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>