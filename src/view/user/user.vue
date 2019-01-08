<template>
  <Card :bordered="false" shadow>
    <p slot="title" style="font-size: 20px">{{$route.meta.title}}</p>
    <div class="upload">
      <upload-excel @receiveSelect="handleChangeRole" @upSuccess="handleUpSuccess"></upload-excel>
    </div>
    <Tabs :value="activeTab" type="card" style="margin-top: 20px">
      <TabPane label="学生管理" name="student">
        <user-student :columns="newStudentTitle" :tableData="studentData"></user-student>
      </TabPane>
      <TabPane label="教师管理" name="teacher">
        <user-teacher></user-teacher>
      </TabPane>
      <TabPane label="管理员管理" name="admin">
        <user-admin></user-admin>
      </TabPane>
    </Tabs>
  </Card>
</template>

<script>
// import { getUserData } from "@/api/userManage";
import uploadExcel from '_c/excel/upload-excel'

// 管理员
import userAdmin from '_c/user-admin';
import userStudent from '_c/user-student';
import userTeacher from '_c/user-teacher';

import adminModel from "@/api/admin.js";

export default {
  // 注册组件
  components: {
    userStudent,
    userTeacher,
    userAdmin,
    uploadExcel
  },
  name: "user",
  data () {
    return {
      // 当前激活的是哪一个tab
      activeTab: "student",
      //  上传文件选择的角色
      uploadRole: 'student',
      // 学生表格
      studentData: [],
      studentTitle: [],
      // 教师表格
      teacherData: [],
      // 管理员表格
      adminData: []
    };
  },
  methods: {
    //  收到选择的角色
    handleChangeRole (role) {
      this.activeTab = role;
    },
    //  上传成功的回调
    handleUpSuccess () {
      // 更新表格数据
      this.getIndex();
      // console.log(`title`);
      // console.log(this.studentTitle);
      // console.log(`data`);
      // console.log(this.studentData);
    },
    //  获取首页信息
    getIndex () {
      adminModel.getAllData({ role: 'student' }).then((res) => {
        if (res.retcode === 0) {
          this.studentData = res.data;
          if (res.data[0]) {
            this.studentTitle = Object.keys(res.data[0]).map(item => {
              return { title: item, key: item };
            });
          }

          // console.log(`title`);
          // console.log(this.studentTitle);
          // console.log(`data`);
          // console.log(this.studentData);

          // console.log(this.newStudentTitle);
        }
      })
    }
  },
  mounted () {
    // 获取表格信息
    this.getIndex();
  },
  computed: {
    //  结尾增加操作列
    newStudentTitle () {
      const arr = [];
      const newArr = arr.concat(this.studentTitle);
      newArr.push({
        title: '操作',
        slot: 'action',
        width: 170,
        align: 'center',
        fixed: 'right'
      });

      return Array.from(this.studentTitle).length === 0 ? arr.concat(Array.from(this.studentTitle)) : newArr;
    }
  }
}
</script>

<style scoped lang="less">
</style>
