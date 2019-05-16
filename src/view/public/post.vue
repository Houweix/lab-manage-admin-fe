<template>
  <Card :bordered="false" shadow>
    <p slot="title" style="font-size: 20px">公告管理</p>
    <div class="post-container">
      <Button type="primary" icon="md-add" @click="addModal = true">点击添加公告</Button>

      <!-- 主体显示表格 -->
      <Table :columns="postTitle" :data="postData" style="margin-top: 10px;">
        <!-- 插槽，显示每行的编辑功能 -->
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="postEdit(row)">编辑</Button>
          <Button type="error" size="default" @click="postDelete(row)">删除</Button>
        </template>
      </Table>

      <!-- 编辑modal -->
      <Modal
        v-model="editModal"
        title="编辑公告信息"
        @on-ok="handleEdit"
      >
        <Form :model="editForm" :label-width="120" ref="addForm">
          <FormItem label="公告标题" prop="title">
            <i-input v-model="editForm.title" style="width: 150px;"z></i-input>
          </FormItem>

          <FormItem label="公告详情" prop="content">
            <i-input
              v-model="editForm.content"
              type="textarea"
              :autosize="{minRows: 10,maxRows: 20}"
              placeholder="请输入正文"
            ></i-input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 添加modal -->
      <Modal
        v-model="addModal"
        title="添加公告信息"
        @on-visible-change="handleOpenAdd"
        @on-ok="handleAdd"
      >
        <Form :model="addForm" :label-width="120" ref="addForm">
          <FormItem label="公告标题" prop="title">
            <i-input v-model="addForm.title" style="width: 150px;" placeholder="请输入标题"></i-input>
          </FormItem>

          <FormItem label="公告详情" prop="content">
            <i-input
              v-model="addForm.content"
              type="textarea"
              :autosize="{minRows: 10,maxRows: 20}"
              placeholder="请输入正文"
            ></i-input>
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
import Cookies from "js-cookie";

export default {
  name: 'post',
  data () {
    return {
      columns: [],
      // 添加的弹窗开关
      addModal: false,
      editModal: false,
      postData: [],
      addForm: {
        title: '',
        user: '',
        content: ''
      },
      editForm: {
        id: '',
        title: '',
        user: '',
        content: ''
      },
      admin: []
    }
  },
  methods: {
    // 获取公告信息
    getPost () {
      adminModel.getPost().then((res) => {
        if (res.retcode === 0) {
          // console.log(res);
          this.postData = res.data;
        }
      });
    },
    //  添加
    handleAdd () {
      this.addForm.time = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日${new Date().getHours()}时${new Date().getMinutes()}分`;
      const pForm = deepClone(this.addForm);

      adminModel.addPost({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('添加成功!');
          this.addModal = false;

          this.getPost();
        } else {
          this.$Message.error({ content: '添加失败，请稍后重试', duration: 4 });
        }
      });
    },
    handleEdit () {
      const pForm = deepClone(this.editForm);

      adminModel.editPost({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('编辑成功!');
          this.editModal = false;

          this.getPost();
        } else {
          this.$Message.error({ content: '编辑失败，请稍后重试', duration: 4 });
        }
      });
    },
    //  点开添加的初始化
    handleOpenAdd (state) {
      if (state) {
        this.addForm.title = '';
        this.addForm.content = '';
        this.addForm.time = '11';
      }
    },
    //  编辑
    postEdit (row) {
      // 初始化数据
      this.editForm.id = row.id;
      this.editForm.title = row.title;
      this.editForm.content = row.content;

      // 打开弹窗
      setTimeout(() => {
        this.editModal = true;
      });
    },
    // 删除
    postDelete (row) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确认要删除该公告的信息吗？</p>',
        onOk: () => {
          adminModel.deletePost({ id: row.id }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('删除成功!');

              // 刷新数据
              this.getPost();
            } else {
              // 刷新数据
              this.getPost();
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
    postTitle () {
      if (this.postData[0]) {
        const arr = [];
        const newArr = arr.concat(setColumns(this.postData[0]));
        // 操作列
        newArr.push({
          title: '操作',
          slot: 'action',
          width: 170,
          align: 'center',
          fixed: 'right'
        });
        newArr.forEach((elem) => {
          //  超出...
          elem.ellipsis = true;
          if (elem.title === 'id') {
            elem.title = '公告id';
          } else if (elem.title === 'title') {
            elem.title = '公告标题';
          } else if (elem.title === 'user') {
            elem.title = '发布人';
          } else if (elem.title === 'content') {
            elem.title = '公告内容';
          } else if (elem.title === 'time') {
            elem.title = '发布时间';
          }
        });

        return newArr;
      }
    }
  },
  mounted () {
    this.getPost();
    //  设置发布人
    const user = JSON.parse(Cookies.get('user'));
    this.addForm.user = user.name;
    this.editForm.user = user.name;
    if (!Cookies.get('user')) {
      console.error('登录失效');
    }
  }
}
</script>

<style scoped lang="less">
</style>
