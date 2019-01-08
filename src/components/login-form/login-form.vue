<template>
  <Form
    ref="loginForm"
    :label-width="70"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="username" style="width: 90%;" label="工号">
      <i-input v-model="form.username" size="large" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password" style="width: 90%;" label="密码">
      <i-input type="password" size="large" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem label="身份" prop="identity">
      <Select v-model="form.identity" size="large" style="width:150px">
        <Option value="admin" label="管理员">管理员</Option>
        <Option value="teacher" label="教师">教师</Option>
      </Select>
    </FormItem>
    <!-- <FormItem> -->
    <Button @click="handleSubmit" size="large" long type="info">登录</Button>
    <!-- </FormItem> -->
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    },
    identityRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "请选择身份", trigger: "blur" }];
      }
    }
  },
  data () {
    return {
      form: {
        username: "20156386",
        password: "123123",
        identity: "admin"
      }
    };
  },

  computed: {
    rules () {
      return {
        username: this.usernameRules,
        password: this.passwordRules,
        identity: this.identityRules
      };
    }
  },
  methods: {
    // 处理登录
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            username: this.form.username,
            password: this.form.password,
            identity: this.form.identity
          });
        }
      });
    }
  }
};
</script>
