<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="block">
        <el-avatar :size="150" :src="circleUrl"></el-avatar>
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" placeholder="邮箱/用户名" @blur="loaderAvatar"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getRequest} from "@/api/api";
  import {DeepCopy} from "../../../supplier-web/src/jxzj-ui/utils/tool"
  import {postRequest} from "../api/api"
  export default {
    name: "Login",
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        loginForm: {
          email: "",
          password: ""
        },
        loginRules: {
          email: [
            {required: true, message: "请输入用户名/邮箱", trigger: "blur"},
            {min: 3, max: 24, message: "长度在 3 到 24 个字符", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur"}
          ]
        },
        userMessage:null
      }
    },
    methods: {
      loginSubmit() {
        let verify = ["email", "password"]
        let valid = true
        verify.forEach(item => {
          if (!this.loginForm[item]) {
            console.log(this.loginForm[item])
            valid = false
          }
        })
        if (valid) {
          postRequest('user/do-login',this.loginForm).then(res => {
            console.log('res：', res)
            if (res.error === 0) {
              // 登录成功
              localStorage.setItem("token", res.data.token) // 缓存至本地
              this.$store.commit("setToken", res.data.token) // 存入store
              console.log('this.$route.query.redirect：', this.$route.query.redirect)
              // 回跳
              const redirect = this.$route.query.redirect || "/"
              this.$router.push(redirect)
            } else {
              // 登录失败
              this.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              })
              console.log("登录失败")
            }
          })
        }
      },
      loaderAvatar() {
        if (this.loginForm.email.trim() === "") return
        let prams = {email: this.loginForm.email}
        getRequest('user/get-portrait',prams)
          .then(res => {
              if (res.error === 0) {
                this.userMessage =DeepCopy(res.data[0])
                this.circleUrl =  '/zsw'+this.userMessage.avatar
                this.$forceUpdate()
              } else {
                console.log('res：', res.error)
                this.circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png?a"+ Date.now()
                this.$forceUpdate()
              }
          })
          .catch(err => {
            if (err) {
              console.log(err)
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #2f4050;

    .login {
      position: absolute;
      background-color: #fff;
      width: 400px;
      height: 250px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      padding: 30px;

      .block {
        z-index: 9;
        position: absolute;
        left: 50%;
        top: -15%;
        transform: translate(-50%, -22%);
      }

      /deep/ .el-form {
        margin-top: 50px;

        .el-form-item {
          margin-top: 30px;

          input {
            height: 35px;
          }

          button {
            width: 100%;
            background-color: #2f4050;
            height: 35px;
            border: none;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
