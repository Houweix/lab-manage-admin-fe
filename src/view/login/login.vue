<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-title">
      <p class="t1">黑龙江大学</p>
      <p class="t2">实验室管理系统</p>
    </div>
    <login-form @on-success-valid="handleSubmit"></login-form>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import Cookies from "js-cookie";
import adminModel from "@/api/admin.js";

export default {
  components: {
    LoginForm
  },
  methods: {
    // 处理登录操作
    handleSubmit ({ username, password, identity }) {
      adminModel
        .login({ username, password, identity })
        .then(res => {
          console.log(res);

          if (res.retcode === 0) {
            if (!Cookies.get("user")) {
              // 登录成功，设置cookie
              Cookies.set(
                "user",
                // 设置4h的Cookie有效期
                { name: res.data.name, identity: res.data.identity }, { expires: 1 / 6 }
              );
            }

            this.$Notice.success({
              title: "登录成功",
              desc: false
            });

            setTimeout(() => {
              this.$router.push({
                name: "home"
              });
            }, 1000);
          } else {
            // debugger
            this.$Notice.error({
              title: "登录失败",
              desc: res.msg
            });
          }
        })
        .catch(() => {
          this.$Notice.error({
            title: "登录失败",
            desc: false
          });
        });
    }
  }
};
</script>
