<template>
  <Card :bordered="false" shadow>
    <p slot="title" style="font-size: 20px">实验室管理</p>
    <div class="lab-container">
      <Button type="primary" icon="md-add" @click="addModal = true">点击添加实验室</Button>

      <!-- 主体显示表格 -->
      <Table :columns="labTitle" :data="transLabData" style="margin-top: 10px;">
        <!-- 插槽，显示每行的编辑功能 -->
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="labEdit(row)">编辑</Button>
          <Button type="error" size="default" @click="labDelete(row)">删除</Button>
        </template>
      </Table>

      <!-- 编辑modal -->
      <Modal
        v-model="editModal"
        title="编辑实验室信息"
        @on-visible-change="handleOpenEdit"
        @on-ok="handleEdit"
      >
        <Form :model="editForm" :label-width="120" ref="addForm">
          <FormItem label="实验室名称" prop="name">
            <i-input v-model="editForm.name" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="实验室管理员名称" prop="admin_name">
            <Select filterable v-model="editForm.admin_name" style="width: 150px;">
              <Option :value="item.id" :label="item.name" v-for="(item,idx) in admin" :key="idx"></Option>
            </Select>
          </FormItem>

          <FormItem label="是否开放" prop="status">
            <i-switch v-model="editForm.status"/>
          </FormItem>

          <FormItem label="座位数" prop="seat">
            <i-input v-model="editForm.seat" style="width: 150px;"></i-input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 添加modal -->
      <Modal
        v-model="addModal"
        title="添加实验室信息"
        @on-visible-change="handleOpenAdd"
        @on-ok="handleAdd"
      >
        <Form :model="addForm" :label-width="120" ref="addForm">
          <FormItem label="实验室名称" prop="name">
            <i-input v-model="addForm.name" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="实验室管理员名称" prop="admin_name">
            <Select filterable v-model="addForm.admin_name" style="width: 150px;">
              <Option :value="item.id" :label="item.name" v-for="(item,idx) in admin" :key="idx"></Option>
            </Select>
          </FormItem>

          <FormItem label="是否开放" prop="status">
            <i-switch v-model="addForm.status"/>
          </FormItem>

          <FormItem label="座位数" prop="seat">
            <i-input v-model="addForm.seat" style="width: 150px;"></i-input>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </Card>
</template>

<script>
import adminModel from "@/api/admin.js";
import { setColumns } from '@/libs/util'
import { deepClone } from '@/libs/tools.js';

export default {
  name: 'lab',
  data () {
    return {
      columns: [],
      // 添加的弹窗开关
      addModal: false,
      editModal: false,
      labData: [],
      addForm: {
        name: '',
        admin_name: '',
        status: true,
        seat: ''
      },
      editForm: {
        name: '',
        admin_name: '',
        status: false,
        seat: ''
      },
      admin: []
    }
  },
  methods: {
    // 获取实验室信息
    getLab () {
      adminModel.getLab().then((res) => {
        if (res.retcode === 0) {
          // console.log(res);
          this.labData = res.data;
        }
      });
    },
    //  获取管理员列表
    getAdmin () {
      adminModel.getAdmin().then((res) => {
        if (res.retcode === 0) {
          // console.log(res);
          this.admin = res.data;
        }
      });
    },
    //  添加
    handleAdd () {
      const pForm = deepClone(this.addForm);

      adminModel.addLab({ postData: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('添加成功!');
          this.addModal = false;

          this.getLab();
        } else {
          this.$Message.error({ content: '添加失败，请稍后重试', duration: 4 });
        }
      });
    },
    handleEdit () {
      const pForm = deepClone(this.editForm);

      adminModel.editLab({ postData: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('编辑成功!');
          this.editModal = false;

          this.getLab();
        } else {
          this.$Message.error({ content: '编辑失败，请稍后重试', duration: 4 });
        }
      });
    },
    //  点开添加的初始化
    handleOpenAdd () {
      this.addForm.name = '';
      this.addForm.admin_name = '';
      this.addForm.seat = '';
      this.getAdmin();
    },
    handleOpenEdit () {
      this.getAdmin();
    },

    //  编辑
    labEdit (row) {
      // 初始化数据
      this.editForm.id = row.id;
      this.editForm.admin_name = this.labData.find(elem => elem.id === row.id).admin_name;
      this.editForm.name = row.name;
      if (row.status === '未开放') {
        this.editForm.status = false;
      } else {
        this.editForm.status = true;
      }
      this.editForm.seat = row.seat;

      // 打开弹窗
      setTimeout(() => {
        this.editModal = true;
      });
    },
    // 删除
    labDelete (row) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确认要删除该实验室的信息吗？</p>',
        onOk: () => {
          adminModel.deleteLab({ id: row.id }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('删除成功!');

              // 刷新数据
              this.getLab();
            } else {
              // 刷新数据
              this.getLab();
              this.$Message.error({ content: '删除失败，请稍后重试', duration: 4 });
            }
          });
        }
      });
    },
    getNameById (id) {
      return this.admin.find(item => Number(item.id) === Number(id)) ? this.admin.find(item => Number(item.id) === Number(id)).name : '';
    }
  },
  computed: {
    // 班级的columns
    labTitle () {
      if (this.labData[0]) {
        const arr = [];
        const newArr = arr.concat(setColumns(this.labData[0]));
        // 操作列
        newArr.push({
          title: '操作',
          slot: 'action',
          width: 170,
          align: 'center',
          fixed: 'right'
        });
        newArr.forEach((elem) => {
          if (elem.title === 'id') {
            elem.title = '实验室id';
          } else if (elem.title === 'name') {
            elem.title = '实验室名称';
          } else if (elem.title === 'admin_name') {
            elem.title = '管理员名称';
          } else if (elem.title === 'status') {
            elem.title = '实验室状态';
          } else if (elem.title === 'seat') {
            elem.title = '座位数';
          }
        });

        return newArr;
      }
    },
    transLabData () {
      const data = [];
      if (this.labData[0]) {
        this.labData.forEach((elem, idx) => {
          data.push(deepClone(elem));
          // 性别过滤
          if (elem.status === '1') {
            data[idx].status = '开放';
          } else {
            data[idx].status = '未开放';
          }
          data[idx].admin_name = this.getNameById(data[idx].admin_name) ? this.getNameById(data[idx].admin_name) : data[idx].admin_name;
        });
      }
      return data;
    }
  },
  mounted () {
    this.getLab();
    this.getAdmin();
  }
}
</script>

<style scoped lang="less">
</style>
