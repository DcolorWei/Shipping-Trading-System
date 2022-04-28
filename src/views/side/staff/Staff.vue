<template>
  <n-data-table :columns="columns" :data="staffdata" :bordered="false" />
</template>

<script lang="ts">
import { defineComponent, h, reactive } from "vue";
import { NDataTable, DataTableColumns, NButton } from "naive-ui";
import { Staff } from "./Staff.entity";
import axios from "axios";
axios.defaults.withCredentials = true;

const createColumns = (): DataTableColumns<Staff> => {
  return [
    {
      title: "员工ID",
      key: "stuffId",
      align: "center",
    },
    {
      title: "员工姓名",
      key: "stuffName",
      align: "center",
    },
    {
      title: "员工职务",
      key: "stuffJob",
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

let staffdata: Staff[] = reactive([]);

export default defineComponent({
  setup() {
    axios({
      url: "https://cunyuqing.online:8081/stuff/getStuff",
      method: "GET",
    }).then((res) => {
      //清空
      while (staffdata.length > 0) {
        staffdata.shift();
      }
      res.data.forEach((element: Staff) => {
        staffdata.push(element);
      });
    });
    return {
      staffdata,
      columns: createColumns(),
    };
  },
  components: {
    NDataTable,
  },
});
</script>
