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
                  placeholder="ID/手机号/邮箱"
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
              <span @click="panelStatus = false">注册</span>
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
          <div class="btns" v-show="!panelStatus">
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
import {
  NInput,
  NButton,
  NPopover,
  NRow,
  NCol,
  NMessageProvider,
  useMessage,
  MessageReactive,
  MessageType,
} from "naive-ui";
import router from "@/router/index";
import * as cryptoTS from "crypto-ts";
import axios from "axios";

// import bcrypt from "bcrypt";
export default defineComponent({
  name: "Login",
  setup() {
    interface loginInfo {
      account: string;
      password: string;
    }

    let loginForm: loginInfo = reactive({
      account: "",
      password: "",
    });

    interface registerInfo {
      account: string;
      password: string;
      email: string;
      authCode: string;
    }

    let registerForm: registerInfo = reactive({
      account: "",
      password: "",
      email: "",
      authCode: "",
    });

    //验证码倒计时
    let countDown: Ref<number> = ref(0);
    function createMessage(
      msgReactive: MessageReactive | null,
      info: string,
      type: MessageType
    ) {
      msgReactive = useMessage().create(info, {
        type: type,
        duration: 10000,
      });
    }

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

    let panelStatus: Ref<string> = ref("login");

    function login() {
      axios
        .post("http://49.232.128.228:8080/account/Login", {
          account: loginForm.account,
          password: encrypt(loginForm.password),
        })
        .then(() => {
          router.push("/");
        });
    }

    async function getAuthCode() {
      countDown.value = 60;
      let setIntervaler = setInterval(() => {
        countDown.value--;
        if (countDown.value == 0) {
          clearInterval(setIntervaler);
        }
      }, 1000);

      let msgReactive: MessageReactive | null = null;

      if (registerForm.email) {
        await axios({
          method: "GET",
          url: "http://49.232.128.228:8080/account/AuthCode",
          params: {
            email: registerForm.email,
          },
        }).then(() => {
          setTimeout(() => {
            msgReactive!.content = "验证码已下发至邮箱";
            msgReactive!.type = "success";
          }, 1000);
        });
      }
    }
    async function register() {
      await axios.post("http://49.232.128.228:8080/account/Register", {
        account: registerForm.account,
        password: encrypt(registerForm.password),
        email: registerForm.email,
        authCode: registerForm.authCode,
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
      createMessage,
      info() {
        useMessage().info(
          "I don't know why nobody told you how to unfold your love",
          {
            keepAliveOnHover: true,
          }
        );
      },
    };
  },

  components: {
    NInput,
    NButton,
    NPopover,
    NRow,
    NCol,
    NMessageProvider,
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
  color: white;
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
  color: white;
  cursor: pointer;
  display: flex;
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