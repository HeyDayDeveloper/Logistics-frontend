<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { type FormInstance, FormRules, ElMessage } from "element-plus"
// import { getLoginCodeApi } from "@/api/login"
import { type ILoginRequestData } from "@/api/login/types/login"
import Validation from "./c-cpn/Validation.vue"

import md5 from "js-md5"
import { fa } from "element-plus/es/locale"
const isLogin = ref(true)
const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null)
const registerFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
// const codeUrl = ref("")
/** 登录表单数据 */
const loginForm: ILoginRequestData = reactive({
  username: "admin",
  password: "admin123",
  code: ""
})

// 注册表单数据
const registerForm = reactive({
  username: "",
  password: "",
  repeatPassword: ""
})

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}

// 验证码逻辑
let change_img_code: boolean = false // 刷新验证码
let img_code: string = "" // 加密后的验证码值

// 刷新验证码操作
const changeImageCode = () => {
  change_img_code = !change_img_code
}

// 接收组件返回加密后的验证码值
const backImageCode = (code: any) => {
  img_code = code
  console.log("data", img_code)
}

/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (loginForm.code == img_code) {
      if (valid) {
        loading.value = true

        useUserStore()
          .login({
            username: loginForm.username,
            password: loginForm.password,
            code: loginForm.code
          })
          .then(() => {
            router.push({ path: "/" })
          })
          .catch(() => {
            changeImageCode()
            loginForm.password = ""
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        return false
      }
    } else {
      ElMessage({
        message: "验证码错误",
        grouping: true,
        type: "error"
      })
      loginForm.code = ""
      return false
    }
  })
}
/** 注册逻辑 */
const handleRegister = () => {
  registerFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      if (registerForm.password === registerForm.repeatPassword) {
        console.log(registerForm)
        useUserStore()
          .register({
            ...registerForm
          })
          .then(() => {
            useUserStore().login({
              username: registerForm.username,
              password: registerForm.password
            })
          })
          .catch(() => {
            changeImageCode()
            registerForm.password = ""
          })
          .finally(() => {
            loading.value = false
            router.push({ path: "/" })
          })
      } else {
        ElMessage({
          message: "两次密码不一致",
          type: "warning"
        })
        registerForm.repeatPassword = ""
      }
    } else {
      return false
    }
  })
}

/** 创建验证码 */
// const createCode = () => {
//   // 先清空验证码的输入
//   loginForm.code = ""
//   // 获取验证码
//   codeUrl.value = ""
//   // getLoginCodeApi().then((res) => {
//   //   codeUrl.value = res.data
//   // })
//   codeUrl.value = "1234"
// }

// /** 初始化验证码 */
// createCode()

// 切换登录注册
const changeLogin = () => {
  isLogin.value = !isLogin.value
  console.log(isLogin.value)
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo.png" />
        <span>应急物资捐赠系统</span>
      </div>
      <!-- 登录页面 -->
      <div class="loginContent" v-show="isLogin">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="loginForm.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <!-- 验证码 -->
                <Validation :change="change_img_code" @click="changeImageCode" @getCode="backImageCode" />
              </template>
            </el-input>
          </el-form-item>
          <el-text class="changeBtn" @click="changeLogin">没有账号？注册一个吧</el-text>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin"> 登 录 </el-button>
        </el-form>
      </div>
      <!-- 注册页面 -->
      <div class="registerContent" v-show="!isLogin">
        <el-form ref="registerFormRef" :model="registerForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="registerForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="registerForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="registerForm.repeatPassword"
              placeholder="确认密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-text class="changeBtn" @click="changeLogin">有账户了，去登录</el-text>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleRegister"> 注 册 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(to bottom right, #7a88ff, #7affaf);
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 4rem;
      }
      span {
        font-size: 2rem;
      }
    }
    .loginContent {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .changeBtn {
        cursor: pointer;
        margin-top: 10px;
        :hover {
          color: #222;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }

    .registerContent {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .changeBtn {
        margin-top: 10px;
        :hover {
          color: #222;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
