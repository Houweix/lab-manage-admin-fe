<template>
  <!-- 这里是个人中心的页面 -->
  <div class="personal-container">
    <Card :bordered="false" shadow>
      <p slot="title">修改个人密码</p>
      <Form ref="formInline" :label-width="100">
        <!-- <Form ref="formInline"> -->
        <Row>
          <i-col span="7">
            <FormItem prop="password1" label="原始密码">
              <i-input type="password" v-model="userForm.password1" placeholder="原始密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="7">
            <FormItem prop="password2" label="新密码">
              <i-input type="password" v-model="userForm.password2" placeholder="新密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="7">
            <FormItem prop="password2" label="再次输入新密码">
              <i-input
                type="password"
                v-model="userForm.password2s"
                placeholder="再次输入新密码"
                @on-blur="handleCheck"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
            </FormItem>
          </i-col>
        </Row>

        <FormItem>
          <Button type="primary" @click="handleSubmit">修改密码</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import adminModel from "@/api/admin.js";

export default {
  name: 'personal',
  methods: {
    // 处理修改密码的操作
    handleSubmit () {
      if (this.checkPass) {
        adminModel.editPass({ editForm: this.userForm }).then((res) => {
          if (res.retcode === 0) {
            this.$Message.success({content: '修改成功!', duration: 4});
          } else if (res.retcode === 2) {
            this.$Message.error({ content: '原始密码不正确，核对重试', duration: 4 });
          } else {
            this.$Message.error({ content: '修改失败，请稍后重试', duration: 4 });
          }
        });
      } else {
        this.$Notice.error({
          title: "两次密码输入不一致，请检查后重新输入！"
        });
      }
    },
    handleCheck () {
      if (!this.checkPass) {
        this.$Notice.error({
          title: "两次密码输入不一致，请检查后重新输入！"
        });
      }
    }
  },
  data () {
    return {
      userForm: {
        //  cookies中读取
        user: '',
        identity: '',
        // 用户输入
        password1: '',
        password2: '',
        password2s: ''
      }
    }
  },
  computed: {
    checkPass () {
      return this.userForm.password2 === this.userForm.password2s;
    }
  },
  mounted () {
    const user = JSON.parse(Cookies.get('user'));
    console.log(user);
    if (user) {
      this.userForm.user = user.id;
      this.userForm.identity = user.identity;
    } else {
      alert('登录态失效，请重新登录');
      windows.location.reload();
    }
  }
}
</script>

<style scoped>
</style>
