<template>
  <n-data-table
    :columns="columns"
    :data="companydata"
    :bordered="false"
  />
</template>

<script lang="ts">
import { defineComponent, h, reactive } from "vue";
import { NDataTable, DataTableColumns, NButton } from "naive-ui";
import { Company } from "./Company.entity";
import axios from "axios";
axios.defaults.withCredentials = true;

const createColumns = (): DataTableColumns<Company> => {
  return [
    {
      title: "企业ID",
      key: "companyId",
      align: "center",
    },
    {
      title: "企业名称",
      key: "companyName",
      align: "center",
    },
    {
      title: "企业类型",
      key: "companyType",
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
            "查看"
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#FAC11B",
            },
            "编辑"
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E63F32",
            },
            "删除"
          ),
        ];
      },
    },
  ];
};

let companydata: Company[] = reactive([]);

export default defineComponent({
  setup() {
    axios({
      url: "https://cunyuqing.online:8081/company/getJointVenture",
      method: "GET",
    }).then((res) => {
      //清空
      while (companydata.length > 0) {
        companydata.shift();
      }
      res.data.forEach((element: any) => {
        companydata.push(element);
      });
    });
    return {
      companydata,
      columns: createColumns()
    };
  },
  components: {
    NDataTable,
  },
});
</script>
