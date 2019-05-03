<template>
  <div class="admin-container">
    <Button type="primary" icon="md-add" @click="addModal = true">点击添加一条记录</Button>
    <Table :columns="columns" :data="transAdminData" style="margin-top: 10px;">
      <!-- 插槽，显示每行的编辑功能 -->
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="default" style="margin-right: 5px" @click="adminEdit(row)">编辑</Button>
        <Button type="error" size="default" @click="adminDelete(row)">删除</Button>
      </template>
    </Table>

    <!-- 添加modal -->
    <Modal v-model="addModal" title="添加管理员信息" @on-ok="handleAdd">
      <Form :model="addForm" :label-width="80" :rules="addRule" ref="addForm">
        <FormItem label="姓名" prop="name">
          <i-input v-model="addForm.name" style="width: 150px;"></i-input>
          <span style="margin-left: 10px;">长度2~10位</span>
        </FormItem>

        <FormItem label="密码" prop="password">
          <i-input v-model="addForm.password" style="width: 150px;"></i-input>
          <span style="margin-left: 10px;">长度5~10位</span>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑modal -->
    <Modal
      v-model="editModal"
      title="编辑管理员信息"
      @on-visible-change="handleOpenEdit"
      @on-ok="handleEdit"
    >
      <Form :model="editForm" :label-width="80" :rules="editRule" ref="editForm">
        <FormItem label="姓名" prop="name">
          <i-input v-model="editForm.name" style="width: 150px;"></i-input>
          <span style="margin-left: 10px;">长度2~10位</span>
        </FormItem>

        <FormItem label="新密码" prop="password">
          <i-input v-model="editForm.password" style="width: 150px;" placeholder></i-input>
          <span style="margin-left: 10px;">长度5~10位</span>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import adminModel from "@/api/admin.js";
import { deepClone } from '@/libs/tools.js';

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

    const validatePass = (rule, value, callback) => {
      if (value === '' || value === ' ') {
        callback(new Error('请输入密码'));
      } else if (value.length < 5 || value.length > 10) {
        callback(new Error('请输入长度5~10的密码！'));
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
      addForm: {
        name: '',
        password: ''
      },
      //  课程临时
      courses: [],
      //  编辑弹窗的验证
      editRule: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      },
      addRule: {
        name: [
          { validator: validateName, required: true, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
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
    //  点击删除一条信息
    adminDelete (row) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确认要删除该用户的信息吗？</p>',
        onOk: () => {
          adminModel.deleteUser({ role: 'admin', id: row.id }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('删除成功!');

              // 刷新数据
              this.$emit('upSuccess', 'admin');
            } else {
              this.$Message.error({ content: '删除失败，请稍后重试', duration: 4 });
            }
          });
        }
      });

      console.log(row);
    },
    // 点击编辑一条信息
    adminEdit (row) {
      // 初始化数据
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.class_name = row.class_name;

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
    handleOpenAdd () {
      this.addForm.name = '';
      this.addForm.password = '';
    },
    //  点击弹窗的确认编辑
    handleEdit () {
      this.loading1 = false;
      const refName = 'editForm';
      this.$refs[refName].validate((valid) => {
        if (valid) {
          console.log('confirm');

          const pForm = this.editForm;

          console.table(pForm);

          Object.keys(pForm) // 这里取到key
            .forEach((key) => { // 这里取到value
              console.log(pForm[key]);
              if (!pForm[key]) {
                delete pForm[key];
              }
            });

          console.log(pForm);

          adminModel.editInfo({ role: 'admin', editForm: pForm }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('修改成功!');
              this.editModal = false;

              if (this.searchInput) {
                this.handleSearch();
              } else {
                this.$emit('upSuccess', 'admin');
              }
            } else {
              this.$Message.error({ content: '修改失败，请稍后重试', duration: 4 });
            }
          })
        } else {
          this.$Message.error({ content: '请检查后重新提交!', duration: 4 });
        }
      });
    },
    //  点击弹窗的确认添加
    handleAdd () {
      const refName = 'addForm';
      // debugger
      this.$refs[refName].validate((valid) => {
        console.log(this.addForm);
        if (valid) {
          const pForm = deepClone(this.addForm);

          adminModel.addUser({ role: 'admin', postData: pForm }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('添加成功!');
              this.addModal = false;

              // 刷新数据
              this.$emit('upSuccess', 'admin');
            } else {
              this.$Message.error({ content: '添加失败，请稍后重试', duration: 4 });
            }
          });
        } else {
          this.$Message.error({ content: '请检查完整后重新提交!', duration: 4 });
        }
      });
    }
  },
  computed: {
    transAdminData () {
      const data = [];
      if (this.tableData) {
        this.tableData.forEach((elem, idx) => {
          data.push(elem);
        });
      }

      return data;
    }
  }
}
</script>

<style scoped>
</style>
