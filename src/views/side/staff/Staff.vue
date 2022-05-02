<template>
  <n-data-table :columns="columns" :data="staffdata" :bordered="false" />
  <popup
    v-if="editStatus"
    :formInfo="staffInfo"
    :label="staffInfolabel"
    @cancel="editStatus = false"
    @confirm="(value) => addStaff(value)"
  />
  <popup
    v-if="addStatus"
    :formInfo="staffInfoSimple"
    :label="staffInfoSimplelabel"
    @cancel="addStatus = false"
    @confirm="(value) => addStaff(value)"
  />
  <div class="affix" @click="addStatus = true">
    <n-icon size="40" :component="Add" />
  </div>
</template>

<script lang="ts">
import { Add } from "@vicons/ionicons5";
import { defineComponent, h, reactive, ref, Ref} from "vue";
import { NDataTable, DataTableColumns, NButton, NIcon } from "naive-ui";
import { Staff } from "./Staff.entity";
import Popup from "@/components/Table/Popup.vue";
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
                  for (let i in staffInfo) {
                    staffInfo[i as keyof Staff] = res.data[i];
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

const staffInfoSimple = reactive({
  staffName: "",
  staffJob: "",
});

let editStatus: Ref<boolean> = ref(false);
let addStatus: Ref<boolean> = ref(false);
const staffInfolabel: string[] = [
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
const staffInfoSimplelabel: string[] = ["姓名", "职务"];

function getAllStaff(): void {
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
}

getAllStaff();

function addStaff(value: { staffName: string; staffJob: string }) {
  axios({
    url: "https://cunyuqing.online:8081/staff/addStaff",
    method: "POST",
    data: value,
  })
    .then(() => {
      alert("处理完成！");
    })
    .catch((err) => {
      alert("信息错误！");
    })
    .finally(() => {
      addStatus.value = false;
      getAllStaff();
    });
}

function deleteStaff(row: Staff) {
  if (confirm(`确定要删除与员工${row.staffId}？`)) {
    axios({
      url: "https://cunyuqing.online:8081/staff/fireStaff",
      method: "GET",
      params: {
        id: row.staffId,
      },
    })
      .then(() => {
        getAllStaff();
        alert("删除成功！");
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
export default defineComponent({
  setup() {
    return {
      staffdata,
      staffInfo,
      staffInfolabel,
      staffInfoSimple,
      staffInfoSimplelabel,
      editStatus,
      addStatus,
      addStaff,
      columns: createColumns({
        deleteStaff,
      }),
      Add,
    };
  },
  components: {
    NDataTable,
    NIcon,
    Popup,
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