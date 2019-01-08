<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-title">
      <p class="t1">黑龙江大学</p>
      <p class="t2">实验室管理系统</p>
    </div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
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
          //  todo 这里应该是请求登录接口然后返回用户数据
          console.log(res);

          if (res.retcode === 0) {
            if (!Cookies.get("user")) {
              // 登录成功，设置cookie
              Cookies.set(
                "user",
                // 设置4h的Cookie有效期
                { name: res.data.name, identity: res.data.identity }, { expires: 1 / 8 }
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
