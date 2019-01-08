<template>
  <div class="admin-container">
    <!-- 主体显示表格 -->
    <Table :columns="columns" :data="tableData">
      <!-- 插槽，显示每行的编辑功能 -->
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="default" style="margin-right: 5px" @click="studentEdit(row)">编辑</Button>
        <Button type="error" size="default" @click="studentDelete(row)">删除</Button>
      </template>
    </Table>

    <!-- 编辑modal -->
    <Modal
      v-model="editModal"
      title="编辑学生信息"
      @on-visible-change="handleOpenEdit"
      @on-ok="handleEdit"
      :loading = "loading1"
    >
      <Form :model="editForm" :label-width="80" :rules="editRule" ref="editForm">
        <FormItem label="姓名" prop="name">
          <i-input v-model="editForm.name" style="width: 150px;"></i-input><span style="margin-left: 10px;">长度2~10位</span>
        </FormItem>
        <FormItem label="新密码">
          <i-input v-model="editForm.pass" style="width: 150px;" placeholder="如不修改不填写即可"></i-input>
        </FormItem>

        <!-- <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem> -->
      </Form>
    </Modal>

    <!-- 添加modal -->
    <Modal
      v-model="addModal"
      title="Common Modal dialog box title"
      @on-visible-change="handleOpenAdd"
      @on-ok="handleAdd"
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>

export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length < 2 || value.length > 10) {
        callback(new Error('请输入长度2~10的名字！'));
      } else {
        callback();
      }
    };
    return {
      editModal: false,
      addModal: false,
      //  编辑表格
      editForm: {
        id: -1,
        name: '',
        password: ''
      },
      //  添加表格
      addForm: {},
      // edit
      loading1: false,
      // add
      loading2: false,
      //  编辑弹窗的验证
      editRule: {
        name: [
          { validator: validateName, required: true, message: '请输入名字', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    //  点击删除一条学生信息
    studentDelete (row) {
      console.log(row);
    },
    // 点击编辑一条学生信息
    studentEdit (row) {
      // 初始化数据
      this.editForm.id = row.id;
      this.editForm.name = row.name;

      // 打开弹窗
      this.editModal = true;
    },
    //  点开编辑的初始化
    handleOpenEdit (status) {
      if (status) {
        //  打开前的初始化

      } else {
        //  关闭的初始化
        //  关闭的初始化
        const refName = 'editForm';
        this.$refs[refName].resetFields();
      }
    },
    //  点开添加的初始化
    handleOpenAdd (status) {
      if (status) {
        //  打开前的初始化

      } else {
        //  关闭的初始化
        const refName = 'addForm';
        this.$refs[refName].resetFields();
      }
    },
    //  点击弹窗的确认编辑
    handleEdit () {
      this.loading1 = false;
      const refName = 'editForm';
      this.$refs[refName].validate((valid) => {
        if (valid) {
          // todo 请求编辑接口
          this.$Message.success('修改成功!');
          this.editModal = false;
        } else {
          this.$Message.error({content: '请检查后重新提交!', duration: 4});
        }
      });
    },
    //  点击弹窗的确认编添加
    handleAdd () {

    }
  }
}
</script>

<style scoped>
</style>
