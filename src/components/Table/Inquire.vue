<template>
  <div class="inquire" @click="cancel()">
    <div
      style="
        margin: 0 10%;
        padding: 4% 10%;
        background: white;
        border-radius: 10px;
      "
      @click="
        (e) => e.stopPropagation()
        //阻止事件冒泡
      "
    >
      <n-data-table :columns="columns" :data="tableInfo" />
      <div style="display: flex; justify-content: center; margin-top: 4%">
        <n-button style="margin: 0 1%" @click="cancel()">取消</n-button>
        <n-button style="margin: 0 1%" type="success" @click="confirm()"
          >确认</n-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, watch } from "vue";
import {
  DataTableColumns,
  NButton,
  NCheckbox,
  NDataTable,
  NIcon,
} from "naive-ui";
import {
  CheckmarkCircleOutline,
  CloseCircleOutline,
  ReloadOutline,
} from "@vicons/ionicons5";

//被选择的公司ID
let selectCompany: number[] = [];

const createColumns = (): DataTableColumns<any> => {
  return [
    {
      title: "公司ID",
      key: "companyId",
      align: "center",
    },
    {
      title: "公司名称",
      key: "companyName",
      align: "center",
    },
    {
      title: "公司类型",
      key: "companyType",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      width: 100,
      render(row: any) {
        let btn;
        watch(
          row,
          () => {
            if (row.price > 0) {
              row.status = 1;
            }
          },
          { deep: true }
        );
        if (row.status == -1) {
          btn = h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E6DF32",
              onclick: () => {
                setTimeout(() => {
                  row.price = 10000 + Math.floor(5000 * Math.random());
                }, 3000);
                row.status = 0;
              },
            },
            { default: () => "询价" }
          );
        }
        if (row.status == 0) {
          btn = h(
            NIcon,
            {
              style: "display:inline-block;animation: spin 2s linear infinite;",
              tertiary: true,
              size: 26,
            },
            {
              default: () => h(ReloadOutline),
            }
          );
        }
        if (row.status == 1) {
          btn = h(
            NIcon,
            {
              style: "display:inline-block;animation: spin 2s linear infinite;",
              tertiary: true,
              size: 26,
            },
            {
              default: () => h(CheckmarkCircleOutline),
            }
          );
        }
        if (row.status == 2) {
          btn = h(
            NIcon,
            {
              style: "display:inline-block;animation: spin 2s linear infinite;",
              tertiary: true,
              size: 26,
            },
            {
              default: () => h(CloseCircleOutline),
            }
          );
        }
        return [btn];
      },
    },
    {
      title: "价格",
      key: "status",
      align: "center",
      width: 150,
      render(row) {
        return row.price > 0 ? row.price : "";
      },
    },
    {
      title: "",
      key: "select",
      align: "center",
      width: 150,
      render(row) {
        return h(
          NCheckbox,
          {
            size: "large",
            disabled: row.status !== 1,
            "onUpdate:checked"() {
              let i = selectCompany.findIndex((item) => item == row.companyId);
              if (i == -1) {
                selectCompany.push(row.companyId);
              } else {
                selectCompany.splice(i, 1);
              }
            },
          },
          { default: () => "" }
        );
      },
    },
  ];
};

export default defineComponent({
  name: "Inquire",
  props: {
    tableInfo: {},
  },
  emits: ["cancel", "confirm"],

  setup(props, ctx) {
    function cancel() {
      ctx.emit("cancel", 1);
      selectCompany = [];
    }
    function confirm() {
      if (selectCompany.length > 0) {
        ctx.emit("confirm", selectCompany);
        selectCompany = [];
      }
    }
    return {
      columns: createColumns(),
      cancel,
      confirm,
    };
  },
  components: {
    NDataTable,
    NButton,
  },
});
</script>
<style scoped>
.inquire {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>