<template>
  <!-- 复用性极低的样子 -->
  <div class="popup">
    <div
      style="
        margin: 0 10%;
        padding: 1% 10%;
        background: white;
        border-radius: 10px;
      "
    >
      <n-row :gutter="40">
        <n-form ref="formRef" :model="formInfoCopy">
          <n-col
            v-for="(item, index) in Object.keys(formInfo)"
            :key="index"
            :span="label[index].size"
          >
            <n-form-item :label="label[index].name">
              <n-input
                v-if="label[index].type == 'input'"
                v-model:value="formInfoCopy[item]"
              />
              <n-select
                v-if="label[index].type == 'select'"
                v-model:value="formInfoCopy[item]"
                :options="label[index].options"
              />
              <n-date-picker
                v-if="label[index].type == 'date'"
                v-model:value="formInfoCopy[item]"
                type="date"
                clearable
              />
              <n-data-table
                v-if="label[index].type == 'table'"
                :bordered="false"
                :columns="columns"
                :data="data"
              />
              <div v-if="label[index].type == 'complex'">
                <n-row :gutter="5">
                  <n-col
                    v-for="(i, index) in Object.keys(formInfoCopy[item])"
                    :key="index"
                    :span="8"
                  >
                    <n-input v-model:value="formInfoCopy[item][i]" />
                  </n-col>
                </n-row>
              </div>
            </n-form-item>
          </n-col>
        </n-form>
      </n-row>
      <n-row style="display: flex; justify-content: center">
        <n-button @click="cancel()">取消</n-button>
        <n-button @click="confirm()">确认</n-button>
      </n-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, h } from "vue";
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NDatePicker,
  NDataTable,
  NRow,
  NCol,
  NButton,
  DataTableColumns,
} from "naive-ui";

let newItem = reactive({
  cargoName: "",
  cargoModel: "",
  cargoSize: "",
  cargoNum: "",
  category: "",
  cargoWeight: "",
});

let newItemModel = {
  cargoName: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.cargoName = v;
    },
  }),
  cargoModel: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.cargoModel = v;
    },
  }),
  cargoSize: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.cargoSize = v;
    },
  }),
  cargoNum: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.cargoNum = v;
    },
  }),
  category: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.category = v;
    },
  }),
  cargoWeight: h(NInput, {
    tertiary: true,
    onUpdateValue(v) {
      newItem.cargoWeight = v;
    },
  }),
};
let data = reactive([newItemModel]);
const createColumns = (): DataTableColumns<any> => {
  return [
    {
      title: "货物名称",
      key: "cargoName",
      align: "center",
    },
    {
      title: "货物型号",
      key: "cargoModel",
      align: "center",
    },
    {
      title: "类型",
      key: "category",
      align: "center",
    },
    {
      title: "货物尺寸",
      key: "cargoSize",
      align: "center",
    },
    {
      title: "货物数量",
      key: "cargoNum",
      align: "center",
    },

    {
      title: "货物质量",
      key: "cargoWeight",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      width: 200,
      render(row) {
        let btn;
        if (typeof row.cargoName !== "string") {
          btn = h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E6DF32",
              onclick: () => addItem(newItem),
            },
            { default: () => "增加" }
          );
        } else {
          btn = h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E63F32",
            },
            { default: () => "删除" }
          );
        }
        return [btn];
      },
    },
  ];
};

function addItem(item: any) {
  data.pop();
  data.push(JSON.parse(JSON.stringify(item)));
  data.push(newItemModel);
}

export default defineComponent({
  name: "Popup",
  props: {
    formInfo: {},
    label: [],
  },
  emits: ["cancel", "confirm"],

  setup(props, ctx) {
    //深拷贝
    const formInfoCopy = reactive(JSON.parse(JSON.stringify(props.formInfo)));
    function confirm() {
      //烂尾标记
      data.pop();
      formInfoCopy.cargos = data;
      ctx.emit("confirm", formInfoCopy);
    }
    function cancel() {
      ctx.emit("cancel", 1);
    }
    return {
      formInfoCopy,
      confirm,
      data,
      cancel,
      addItem,
      columns: createColumns(),
    };
  },
  components: {
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NDatePicker,
    NDataTable,
    NButton,
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