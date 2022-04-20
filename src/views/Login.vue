<template>
  <div class="loginframe">
    <div class="loginpanel">
      <div class="title">物流管理系统</div>
      <div class="input">
        <n-popover placement="right" trigger="focus">
          <template #trigger>
            <n-input
              v-model:value="loginForm.userid"
              type="text"
              placeholder="ID/手机号/邮箱"
          /></template>
          <span>aaa</span>
        </n-popover>
      </div>
      <div class="input">
        <n-input
          v-model:value="loginForm.password"
          type="password"
          placeholder="6-16位密码"
        />
        <div class="tip">忘记密码？</div>
      </div>

      <div class="btns">
        <transition>
          <n-button
            round
            dashed
            type="success"
            v-show="panelStatus"
            @click="login()"
          >
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
import { NInput, NButton, NPopover } from "naive-ui";
import router from "@/router/index";
import * as cryptoTS from "crypto-ts";
import axios from "axios";

// import bcrypt from "bcrypt";
export default defineComponent({
  name: "Login",
  setup() {
    let loginForm: { userid: string; password: string } = reactive({
      userid: "",
      password: "",
    });

    function encrypt(word: string) {
      const key = cryptoTS.enc.Utf8.parse("sunyuqingcnmlgcb");
      const srcs = cryptoTS.enc.Utf8.parse(word); //加密方式:时间戳＋密文
      const encrypted = cryptoTS.AES.encrypt(srcs, key, {
        mode: cryptoTS.mode.CBC,
        padding: cryptoTS.pad.PKCS7,
        iv: key,
      });
      return encrypted.toString();
    }

    let panelStatus: Ref<string> = ref("login");

    async function login() {
      console.log(encrypt("abc"));
      await axios.post(
        "http://49.232.128.228:8080/account/Login",
        {
          userid: loginForm.userid,
          password: encrypt(loginForm.password),
        },
        {}
      );
      router.push("/");
    }
    return {
      loginForm,
      panelStatus,
      login,
    };
  },
  components: {
    NInput,
    NButton,
    NPopover,
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
.loginpanel .input {
  padding: 2% 20%;
}
.loginpanel .btns {
  display: flex;
  justify-content: center;
}
.loginpanel .tip {
  position: relative;
  text-align: right;
  color: white;
  cursor: pointer;
}
.loginpanel .btns > * {
  margin: 0% 6%;
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