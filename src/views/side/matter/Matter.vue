<template>
  <n-data-table :columns="columns" :data="matterdata" :bordered="false" />
  <div class="affix" @click="addStatus = true">
    <n-icon size="40" :component="Add" />
  </div>
  <popup
    v-if="addStatus"
    :formInfo="MatterInfo"
    :label="matterlabel"
    @cancel="addStatus = false"
    @confirm="(value, test) => addMatter(value)"
  />
  <inquire
    v-if="inquireStatus"
    :orderInfo="orderInfo"
    :a="'2'"
    :tableInfo="tableInfo"
    @cancel="inquireStatus = false"
    @confirm="
      (value) => {
        submitSelectCompany(value);
        inquireStatus = false;
      }
    "
  />
</template>

<script lang="ts">
import { defineComponent, h, reactive, ref, Ref } from "vue";
import { NDataTable, DataTableColumns, NButton, NIcon } from "naive-ui";
import { Matter, Matters } from "./Matter.entity";
import Popup from "@/components/Table/Popup.vue";
import Inquire from "@/components/Table/Inquire.vue";
import axios from "axios";
import { Add } from "@vicons/ionicons5";
axios.defaults.withCredentials = true;

const createColumns = (): DataTableColumns<Matter> => {
  return [
    {
      title: "订单ID",
      key: "orderId",
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
      title: "海运方",
      key: "seaTransCompanyName",
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
      render(row) {
        return [
          h(
            NButton,
            {
              tertiary: true,
              size: "small",
              style: "margin:1%;background:#EAEAEA",
              onclick: () => {
                axios({
                  url: "https://cunyuqing.online:8081/order/getOrderInfo",
                  method: "GET",
                  params: {
                    orderId: row.orderId,
                  },
                }).then((res) => {
                  for (let i in res.data) {
                    orderInfo[i] = res.data[i];
                  }
                });

                inquireStatus.value = true;
                getBargainCompany(row.orderId);
              },
            },
            { default: () => "查看" }
          ),
        ];
      },
    },
  ];
};

let matterdata: Matter[] = reactive([]);

let tableInfo: any[] = reactive([]);

let orderInfo: any = reactive({});

let addStatus: Ref<boolean> = ref(false);

let inquireStatus: Ref<boolean> = ref(false);

const MatterInfo: Partial<Matters> = reactive({
  phone: null,
  email: null,
  fax: null,
  sendAddress: {
    country: null,
    city: null,
    address: null,
  },
  receiveAddress: {
    country: null,
    city: null,
    address: null,
  },
  incoterms: null,
  deliveryDate: null,
  hopeReachDate: null,

  cargos: [],
});
const matterlabel: any = [
  {
    name: "电话",
    size: 8,
    type: "input",
  },
  {
    name: "邮件",
    size: 8,
    type: "input",
  },
  {
    name: "传真",
    size: 8,
    type: "input",
  },
  {
    name: "发货地址",
    size: 12,
    type: "complex",
  },
  {
    name: "收货地址",
    size: 12,
    type: "complex",
  },
  {
    name: "INCOTERMS",
    size: 8,
    type: "select",
    options: [
      {
        label: "Ex Works",
        value: "Ex Works",
      },
      {
        label: "FOR/FOT",
        value: "FOR/FOT",
      },
      {
        label: "Free…",
        value: "Free…",
      },
      {
        label: "FAS",
        value: "FAS",
      },
      {
        label: "FOB",
        value: "FOB",
      },
      {
        label: "C&F",
        value: "C&F",
      },
      {
        label: "Freight or Carriage paid to",
        value: "Freight or Carriage paid to",
      },
    ],
  },
  {
    name: "预计发货日期",
    size: 8,
    type: "date",
  },
  {
    name: "期望抵达日期",
    size: 8,
    type: "date",
  },
  {
    name: "货物列表",
    size: 24,
    type: "table",
  },
];

function getBargainCompany(orderId: number | null) {
  axios({
    url: "https://cunyuqing.online:8081/order/getAllBargain",
    method: "GET",
    params: {
      orderId: orderId,
    },
  }).then((res) => {
    while (tableInfo.length > 0) {
      tableInfo.shift();
    }
    res.data.forEach((element: any) => {
      tableInfo.push(element);
    });
  });
}

function getAllMatter() {
  axios({
    url: "https://cunyuqing.online:8081/order/getAllOrder",
    method: "GET",
  }).then((res) => {
    //清空
    while (matterdata.length > 0) {
      matterdata.shift();
    }

    if (res != null) {
      res.data.forEach((element: Matter) => {
        matterdata.push(element);
      });
    }
  });
}

function addMatter(value: any) {
  addStatus.value = false;
  axios({
    url: "https://cunyuqing.online:8081/order/submitOrder",
    method: "POST",
    data: value,
  }).finally(() => {
    getAllMatter();
    alert("添加成功！");
  });
}

//烂尾设计
function submitSelectCompany(value: any): void {
  axios({
    url: "https://cunyuqing.online:8081/order/chooseAgent",
    method: "POST",
    data: value,
  }).then(()=>{
    alert('这不就成了嘛，然后你就可以等了')
  });
}

export default defineComponent({
  setup() {
    getAllMatter();
    return {
      matterdata,
      Add,
      columns: createColumns(),
      addStatus,
      inquireStatus,
      MatterInfo,
      tableInfo,
      orderInfo,
      matterlabel,
      addMatter,
      submitSelectCompany,
    };
  },
  components: {
    Inquire,
    NIcon,
    NDataTable,
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