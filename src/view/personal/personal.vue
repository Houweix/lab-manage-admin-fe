<template>
  <!-- 这里是个人中心的页面 -->
  <div class="personal-container">
    <Card :bordered="false" shadow>
       <p slot="title">
            修改个人密码
        </p>
      <Form ref="formInline" :label-width="100">
      <!-- <Form ref="formInline"> -->
        <Row>
          <i-col span="7">
            <FormItem prop="password1" label="原始密码" >
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
              <i-input type="password" v-model="userForm.password2s" placeholder="再次输入新密码" @on-blur="handleCheck">
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
export default {
  name: 'personal',
  methods: {
    // 处理修改密码的操作
    handleSubmit () {
      if (this.checkPass) {

      } else {
        this.$Notice.error({
          title: "两次密码输入不一致，请检查后重新输入！"
        });
      }
    },
    handleCheck() {
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
        password1: '',
        password2: '',
        password2s: ''
      }
    }
  },
  computed: {
    checkPass() {
      return this.userForm.password2 === this.userForm.password2s;
    }
  }
}
</script>

<style scoped>
</style>
