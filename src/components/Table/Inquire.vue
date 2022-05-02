<template>
  <div class="inquire">
    <div
      style="
        margin: 0 10%;
        padding: 1% 10%;
        background: white;
        border-radius: 10px;
      "
    >
      <n-data-table :columns="columns" :data="tableInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, watch } from "vue";
import { DataTableColumns, NButton, NDataTable, NIcon } from "naive-ui";
import {
  CheckmarkCircleOutline,
  CloseCircleOutline,
  ReloadOutline,
} from "@vicons/ionicons5";

const createColumns = (): DataTableColumns<any> => {
  return [
    {
      title: "船公司ID",
      key: "companyId",
      align: "center",
    },
    {
      title: "船公司名称",
      key: "companyName",
      align: "center",
    },
    {
      title: "船公司类型",
      key: "companyType",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      width: 200,
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
                  row.price = Math.floor(1000 * Math.random());
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
              size: 25,
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
              size: 25,
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
              size: 25,
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
      render(row) {
        return row.price > 0 ? row.price : "";
      },
    },
  ];
};

export default defineComponent({
  name: "Inquire",
  props: {
    tableInfo: {},
  },
  setup() {
    return {
      columns: createColumns(),
    };
  },
  components: {
    NDataTable,
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
  background: rgba(0, 0, 0, 0.1);
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