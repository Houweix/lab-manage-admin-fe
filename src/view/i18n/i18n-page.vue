<template>
  <Row>
    <i-col span="6" offset="12">
      <login-form @on-success-valid="handleSubmit"></login-form>
    </i-col>
  </Row>
</template>

<script>
import adminModel from "@/api/admin.js";
import LoginForm from "_c/login-form";

export default {
  components: {
    LoginForm
  },
  name: "xx",
  data() {
    return {};
  },
  methods: {
    handleSubmit({ username, password, identity }) {
      adminModel.tmpAdd({ username, password, identity }).then(res => {
        //  todo 这里应该是请求登录接口然后返回用户数据
        console.log(res);
        if (res.retcode === 0) {
          this.$Notice.success({
            title: "添加成功",
            desc: false
          });
        } else {
          this.$Notice.error({
            title: "添加失败",
            desc: false
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>
