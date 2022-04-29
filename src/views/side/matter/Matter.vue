<template>
  <n-data-table :columns="columns" :data="matterdata" :bordered="false" />
</template>

<script lang="ts">
import { defineComponent, h, reactive } from "vue";
import { NDataTable, DataTableColumns, NButton } from "naive-ui";
import { Matter } from "./Matter.entity";
import axios from "axios";
axios.defaults.withCredentials = true;

const createColumns = (): DataTableColumns<Matter> => {
  return [
    {
      title: "订单ID",
      key: "orderIdId",
      align: "center",
    },
    {
      title: "委托方",
      key: "clientCompanyName",
      align: "center",
    },
    {
      title: "起始时间",
      key: "startDate",
      align: "center",
    },
    {
      title: "当前状态",
      key: "status",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      width: 300,
      render() {
        return [
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#EAEAEA",
            },
            { default: () => "查看" }
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#FAC11B",
            },
            { default: () => "编辑" }
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E63F32",
            },
            { default: () => "删除" }
          ),
        ];
      },
    },
  ];
};

let matterdata: Matter[] = reactive([]);

export default defineComponent({
  setup() {
    axios({
      url: "https://cunyuqing.online:8081/order/getAllOrder",
      method: "GET",
    }).then((res) => {
      //清空
      while (matterdata.length > 0) {
        matterdata.shift();
      }
      res.data.forEach((element: Matter) => {
        matterdata.push(element);
      });
    });
    return {
      matterdata,
      columns: createColumns(),
    };
  },
  components: {
    NDataTable,
  },
});
</script>
