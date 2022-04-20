<template>
  <div class="loginframe">
    <div class="loginpanel">
      <div class="title" @click="panelStatus = true">物流管理系统</div>
      <div class="input">
        <n-input
          v-model:value="value"
          type="text"
          placeholder="ID/手机号/邮箱"
        />
      </div>
      <div class="input">
        <n-input v-model:value="value" type="text" placeholder="6-16位密码" />
      </div>

      <div class="btns">
        <transition>
          <n-button round dashed type="success" v-show="panelStatus">
            登录
          </n-button>
        </transition>
        <transition>
          <n-button
            round
            dashed
            type="warning"
            v-show="panelStatus"
            @click="panelStatus = false"
          >
            注册
          </n-button>
        </transition>
        <transition>
          <n-button
            round
            dashed
            type="success"
            v-show="!panelStatus"
            @click="panelStatus = true"
          >
            返回
          </n-button>
        </transition>
        <transition>
          <n-button round dashed type="warning" v-show="!panelStatus">
            确定
          </n-button>
        </transition>
      </div>
    </div>
    <div class="logincover">
      <img style="height: 100%" src="@/assets/cover.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import { NInput, NButton } from "naive-ui";
export default defineComponent({
  name: "Login",
  setup() {
    let loginForm: { userid: string; password: string } = reactive({
      userid: "",
      password: "",
    });

    let panelStatus: Ref<boolean> = ref(true);
    return {
      loginForm,

      panelStatus,
    };
  },
  methods: {},
  components: {
    NInput,
    NButton,
  },
});
</script>

<style scoped>
.loginframe {
  position: absolute;
  background: #35415e;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.loginpanel {
  width: 30%;
  height: 45%;
  border: none;
  border-radius: 5%;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}

.logincover {
  width: 35%;
  height: 95%;
  overflow: hidden;
  border: none;
  border-radius: 1%;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
}

.loginpanel .title {
  display: flex;
  justify-content: center;
  color: white;
  font-size: 22px;
  font-weight: 600;
  padding: 10%;
}
.input {
  padding: 2% 20%;
}
.btns {
  display: flex;
  justify-content: center;
}
.btns > * {
  margin: 2% 6%;
}

/* 切换到注册的动画 */
.v-enter-from,
.v-leave-to {
  left: -100%;
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  left: 0;
  opacity: 1;
}

.v-enter-active,
.v-leave-active {
  transition: 0.3s linear;
}
</style>