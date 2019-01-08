<template>
  <!-- 这里是个人中心的页面 -->
  <div class="personal-container">
    <Card :bordered="false" shadow>
       <p slot="title">
            修改个人密码
        </p>
      <Form ref="formInline" :label-width="100">
        <Row>
          <i-col span="5">
            <FormItem prop="password1" label="原始密码">
              <i-input type="password" v-model="userForm.password1" placeholder="原始密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="5">
            <FormItem prop="password2" label="新密码">
              <i-input type="password" v-model="userForm.password2" placeholder="新密码">
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

    }
  },
  data () {
    return {
      userForm: {
        password1: '',
        password2: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
