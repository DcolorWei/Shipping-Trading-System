<template>
  <n-dialog-provider>
    <n-data-table :columns="columns" :data="companydata" :bordered="false" />
  </n-dialog-provider>

  <div class="affix" @click="addCompany()">
    <n-icon size="40" :component="Add" />
  </div>
</template>

<script lang="ts">
import { Add } from "@vicons/ionicons5";
import { defineComponent, h, reactive } from "vue";
import { NDataTable, DataTableColumns, NButton, NIcon } from "naive-ui";
import { Company } from "./Company.entity";
import axios from "axios";
axios.defaults.withCredentials = true;

const createColumns = ({
  deleteCompany,
}: {
  deleteCompany: (row: Company) => void;
}): DataTableColumns<Company> => {
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
      render(row) {
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
            { default: () => "发信" }
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E63F32",
              onclick: () => deleteCompany(row),
            },
            { default: () => "删除" }
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
      res.data.forEach((element: Company) => {
        companydata.push(element);
      });
    });

    function addCompany() {
      let companyId = prompt("输入对方ID");
      axios({
        url: "https://cunyuqing.online:8081/company/makeFriends",
        method: "POST",
        data: {
          companyId: Number(companyId),
        },
      })
        .then((res) => {
          alert("发送请求成功");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      companydata,
      columns: createColumns({
        deleteCompany(row: Company) {
          if (confirm(`确定要删除与${row.companyName}联系？`)) {
            axios({
              url: "https://cunyuqing.online:8081/company/deleteFriends",
              method: "POST",
              data: {
                companyId: row.companyId,
              },
            })
              .then((res) => {
                axios({
                  url: "https://cunyuqing.online:8081/company/getJointVenture",
                  method: "GET",
                }).then(() => {
                  //清空
                  while (companydata.length > 0) {
                    companydata.shift();
                  }
                  res.data.forEach((element: Company) => {
                    companydata.push(element);
                  });
                });
                alert("删除成功！");
              })
              .catch((err) => {
                alert(err.message);
              });
          }
        },
      }),
      addCompany,
      Add,
    };
  },
  components: {
    NDataTable,
    NIcon,
  },
});
</script>

<style scoped>
.affix {
  width: 40px;
  height: 40px;
  background: #ffd664;
  border: 3px solid #474747;
  border-radius: 50%;
  position: fixed;
  right: 6%;
  bottom: 20%;
}
</style>