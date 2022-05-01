<template>
  <n-data-table :columns="columns" :data="staffdata" :bordered="false" />
  <popup v-if="editStatus" :staffInfo="staffInfo" :label="label">
    <template></template>
  </popup>
</template>

<script lang="ts">
import { defineComponent, h, reactive, ref, Ref } from "vue";
import { NDataTable, DataTableColumns, NButton } from "naive-ui";
import { Staff } from "./Staff.entity";
import Popup from "@/components/Table/popup.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

const createColumns = ({
  deleteStaff,
}: {
  deleteStaff: (row: Staff) => void;
}): DataTableColumns<Staff> => {
  return [
    {
      title: "员工ID",
      key: "staffId",
      align: "center",
    },
    {
      title: "员工姓名",
      key: "staffName",
      align: "center",
    },
    {
      title: "员工职务",
      key: "staffJob",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      width: 300,
      render(row: Staff) {
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
              onclick: () => {
                axios({
                  url: "https://cunyuqing.online:8081/staff/getStaffInfo",
                  method: "GET",
                  params: {
                    staffId: row.staffId,
                  },
                }).then((res) => {
                  for (let i in res.data){
                    staffInfo[i as keyof Staff]=res.data[i]
                  }
                  editStatus.value = true;
                });
              },
            },
            { default: () => "编辑" }
          ),
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#E63F32",
              onclick: () => deleteStaff(row),
            },
            { default: () => "删除" }
          ),
        ];
      },
    },
  ];
};

let staffdata: Staff[] = reactive([]);
const staffInfo: Staff = reactive({
  staffId: 1,
  sex: "f",
  phone: null,
  email: null,
  fax: null,
  joinDate: null,
  birthDay: null,
  country: null,
  city: null,
  address: null,
});

let editStatus: Ref<boolean> = ref(false);
const label: string[] = [
  "ID",
  "性别",
  "电话",
  "邮箱",
  "传真",
  "加入时间",
  "生日",
  "国家",
  "城市",
  "地址",
];

setInterval(() => {
  staffInfo.staffId!++;
}, 1000);

export default defineComponent({
  setup() {
    axios({
      url: "https://cunyuqing.online:8081/staff/getStaff",
      method: "GET",
    }).then((res) => {
      //清空
      while (staffdata.length > 0) {
        staffdata.shift();
      }
      if (res !== null) {
        res.data.forEach((element: Staff) => {
          staffdata.push(element);
        });
      }
    });

    return {
      staffdata,
      staffInfo,
      label,
      editStatus,
      columns: createColumns({deleteStaff(row: Staff) {
          if (confirm(`确定要删除与${row.staffId}联系？`)) {
            axios({
              url: "https://cunyuqing.online:8081/staff/fireStaff",
              method: "GET",
              params: {
                id: row.staffId,
              },
            })
              .then(() => {
                axios({
                  url: "https://cunyuqing.online:8081/staff/getStaff",
                  method: "GET",
                }).then((res) => {
                  //清空
                  while (staffdata.length > 0) {
                    staffdata.shift();
                  }

                  if (res!=null) {
                    res.data.forEach((element: Staff) => {
                      staffdata.push(element);
                    });
                  }
                });
                alert("删除成功！");
              })
              .catch((err) => {
                alert(err.message);
              });
          }
        },}),
    };
  },
  components: {
    NDataTable,
    Popup,
  },
});
</script>
