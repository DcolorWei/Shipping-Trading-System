<template>
  <div class="loginframe">
    <n-message-provider />
    <div class="loginpanel">
      <div class="title">物流管理系统</div>
      <!--登录模块-->
      <transition>
        <div class="input" v-show="panelStatus">
          <div>
            <n-popover placement="right" trigger="focus">
              <template #trigger>
                <n-input
                  v-model:value="loginForm.account"
                  type="text"
                  placeholder="账户名"
              /></template>
              <span>aaa</span>
            </n-popover>
          </div>
          <div>
            <n-input
              v-model:value="loginForm.password"
              type="password"
              placeholder="6-16位密码"
            />
            <div class="tip">
              <span @click="panelStatus = 'register'">注册</span>
              <span>找回密码</span>
            </div>
          </div>
          <div class="btns" v-show="panelStatus">
            <n-button round type="success" size="large" @click="login()">
              立即登录
            </n-button>
          </div>
        </div>
      </transition>
      <!--注册模块-->
      <transition mode="in-out">
        <div class="input" v-show="!panelStatus">
          <div>
            <n-popover placement="right" trigger="focus">
              <template #trigger>
                <n-input
                  v-model:value="registerForm.account"
                  type="text"
                  placeholder="账户名，仅支持英文和数字"
              /></template>
              <span>aaa</span>
            </n-popover>
          </div>
          <div>
            <n-popover placement="right" trigger="focus">
              <template #trigger>
                <n-input
                  v-model:value="registerForm.password"
                  type="text"
                  placeholder="6-16位密码"
              /></template>
              <span>aaa</span>
            </n-popover>
          </div>
          <div>
            <n-row style="display:flex;just">
              <n-col :span="18">
                <n-popover placement="right" trigger="focus">
                  <template #trigger>
                    <n-input
                      v-model:value="registerForm.email"
                      type="text"
                      placeholder="邮箱"
                  /></template>
                  <span>aaa</span>
                </n-popover>
              </n-col>
              <n-col :span="6">
                <n-button
                  type="success"
                  v-if="countDown == 0"
                  @click="getAuthCode()"
                >
                  验证
                </n-button>
                <n-button type="info" v-else>
                  {{ countDown + "s" }}
                </n-button>
              </n-col>
            </n-row>
          </div>
          <div>
            <n-row>
              <n-col :span="12">
                <n-input
                  v-model:value="registerForm.authCode"
                  type="text"
                  placeholder="验证码"
                />
              </n-col>
            </n-row>
          </div>
          <div class="btns" v-show="panelStatus == 'register'">
            <n-button round type="warning" size="large" @click="register()">
              注册
            </n-button>
          </div>
        </div>
      </transition>
    </div>
    <div class="logincover">
      <img style="height: 100%" src="@/assets/cover.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from "vue";
import { NInput, NButton, NPopover, NRow, NCol } from "naive-ui";

import { panelStatus, loginInfo, registerInfo } from "./Login.entity";
import router from "@/router/index";
import * as cryptoTS from "crypto-ts";
import axios from "axios";

// import bcrypt from "bcrypt";
export default defineComponent({
  name: "Login",
  setup() {
    let loginForm: loginInfo = reactive({
      account: null,
      password: null,
    });

    let registerForm: registerInfo = reactive({
      account: null,
      password: null,
      email: null,
      authCode: null,
    });

    //验证码倒计时
    let countDown: Ref<number> = ref(0);

    function encrypt(word: string): string {
      const key = cryptoTS.enc.Utf8.parse("sunyuqingcnmlgcb");
      const srcs = cryptoTS.enc.Utf8.parse(word); //加密方式:时间戳＋密文
      const encrypted = cryptoTS.AES.encrypt(srcs, key, {
        mode: cryptoTS.mode.CBC,
        padding: cryptoTS.pad.PKCS7,
        iv: key,
      });
      return encrypted.toString();
    }

    let panelStatus: Ref<panelStatus> = ref("login");

    function login() {
      axios({
        method: "POST",
        url: "https://cunyuqing.online:8081/account/Login",
        data: {
          account: loginForm.account,
          password: encrypt(loginForm.password!),
        },
      }).then((res) => {
        router.push("/");
      });
    }

    async function getAuthCode() {
      countDown.value = 60;
      if (registerForm.email) {
        await axios({
          method: "POST",
          url: "https://cunyuqing.online:8081/account/AuthCode",
          data: {
            email: registerForm.email,
          },
        }).then(() => {
          let setIntervaler = setInterval(() => {
            countDown.value--;
            if (countDown.value == 0) {
              clearInterval(setIntervaler);
            }
          }, 1000);

          setTimeout(() => {
            alert("验证码发送成功");
          }, 100);
        });
      }
    }
    async function register() {
      axios({
        url: "https://cunyuqing.online:8081/account/Register",
        data: {
          account: registerForm.account,
          password: encrypt(registerForm.password!),
          email: registerForm.email,
          authCode: registerForm.authCode,
        },
      }).then(() => {
        alert("注册成功！");
        panelStatus = ref("login");
      });
    }

    return {
      loginForm,
      registerForm,
      panelStatus,
      login,
      register,
      getAuthCode,
      countDown,
    };
  },

  components: {
    NInput,
    NButton,
    NPopover,
    NRow,
    NCol,
  },
});
</script>

<style scoped>
.loginframe {
  position: absolute;
  background: whitesmoke;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.loginpanel {
  width: 30%;
  height: 50%;
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
  color: black;
  font-size: 22px;
  font-weight: 600;
  padding: 8%;
}

.loginpanel .input > * {
  padding: 2% 20%;
}

.loginpanel .btns {
  display: flex;
  justify-content: center;
}

.loginpanel .tip {
  position: relative;
  color: black;
  cursor: pointer;
  display: flex;
  margin-top: 3%;
  justify-content: space-between;
}

.loginpanel .btns > * {
  margin: 0% 6%;
  position: relative;
}

/* 切换到注册的动画 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  left: 0;
  opacity: 1;
}

.v-enter-active {
  transition: 0.4s steps(1);
}
.v-leave-active {
  transition: 0.2s linear;
}
</style>