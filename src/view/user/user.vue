<template>
  <Card :bordered="false" shadow>
    <p slot="title" style="font-size: 20px">{{$route.meta.title}}</p>
    <!-- <div class="upload">
      <upload-excel @receiveSelect="handleChangeRole" @upSuccess="handleUpSuccess"></upload-excel>
    </div> -->
    <Tabs :value="activeTab" type="card" style="margin-top: 20px" @on-click="handleChangeTab">
      <TabPane label="学生管理" name="student">
        <!-- 表格 -->
        <user-student
          :columns="newStudentTitle"
          :tableData="studentData"
          @upSuccess="handleUpSuccess"
          @searchUser="setTableData"
        ></user-student>
      </TabPane>
      <TabPane label="教师管理" name="teacher">
        <user-teacher
          :columns="newTeacherTitle"
          :tableData="teacherData"
          @upSuccess="handleUpSuccess"
          @searchUser="setTableData"
        ></user-teacher>
      </TabPane>
      <TabPane label="管理员管理" name="admin">
        <user-admin
          :columns="newAdminTitle"
          :tableData="adminData"
          @upSuccess="handleUpSuccess"
          @searchUser="setTableData"
        ></user-admin>
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
      // todo 修改默认激活的tab为 'student'
      activeTab: "student",
      //  上传文件选择的角色
      uploadRole: 'student',
      studentTitle: [],
      studentData: [],

      teacherTitle: [],
      teacherData: [],

      adminTitle: [],
      adminData: []
    };
  },
  methods: {
    //  收到选择的角色
    handleChangeRole (role) {
      this.activeTab = role;
    },
    //  上传成功的回调
    handleUpSuccess (name) {
      this.getIndex(name);
    },
    //  获取首页信息
    getIndex (name) {
      adminModel.getAllData({ role: name }).then((res) => {
        if (res.retcode === 0) {
          if (name === 'student') {
            // 学生
            this.studentData = res.data;
            if (res.data[0]) {
              this.setColumns(res.data[0], 'student');
            }
          } else if (name === 'teacher') {
            // 教师
            this.teacherData = res.data;
            if (res.data[0]) {
              this.setColumns(res.data[0], 'teacher');
            }
          } else if (name === 'admin') {
            //  管理员
            this.adminData = res.data;
            if (res.data[0]) {
              this.setColumns(res.data[0], 'admin');
            }
          } else {
            console.error('错误角色');
          }
        }
      });
    },
    // 根据传来的表格数据设置table
    setTableData (table, type) {
      //  当有第二个参数的时候，设置表格数据
      if (table) {
        if (type === 'student') {
          this.studentData = table;
        } else if (type === 'teacher') {
          this.teacherData = table;
        }
      }
    },
    //  设置列的分类
    setColumns (data, type) {
      // 格式化数据
      if (type === 'student') {
        this.studentTitle = Object.keys(data).map(item => {
          return { title: item, key: item };
        });
      } else if (type === 'teacher') {
        this.teacherTitle = Object.keys(data).map(item => {
          return { title: item, key: item };
        });
      } else if (type === 'admin') {
        this.adminTitle = Object.keys(data).map(item => {
          return { title: item, key: item };
        });
      }
    },
    //  当tab的值发生变化，请求对应的数据
    handleChangeTab (name) {
      console.log('--------------name----------');
      console.log(name);
      this.getIndex(name);
    }
  },
  mounted () {
    // 获取表格信息 //第一次默认学生
    this.getIndex('student');
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
      this.studentTitle.forEach((elem) => {
        if (elem.title === 'id') {
          elem.title = '学号';
        } else if (elem.title === 'password') {
          elem.title = '密码';
        } else if (elem.title === 'name') {
          elem.title = '姓名';
        } else if (elem.title === 'sex') {
          elem.title = '性别';
        } else if (elem.title === 'class') {
          elem.title = '班级';
        }
      });

      return Array.from(this.studentTitle).length === 0 ? arr.concat(Array.from(this.studentTitle)) : newArr;
    },
    newTeacherTitle () {
      const arr = [];
      const newArr = arr.concat(this.teacherTitle);
      newArr.push({
        title: '操作',
        slot: 'action',
        width: 170,
        align: 'center',
        fixed: 'right'
      });
      this.teacherTitle.forEach((elem) => {
        if (elem.title === 'id') {
          elem.title = '工号';
        } else if (elem.title === 'password') {
          elem.title = '密码';
        } else if (elem.title === 'name') {
          elem.title = '姓名';
        } else if (elem.title === 'sex') {
          elem.title = '性别';
        } else if (elem.title === 'class_name') {
          elem.title = '班级';
        } else if (elem.title === 'course_id') {
          elem.title = '课程';
        }
      });

      return Array.from(this.teacherTitle).length === 0 ? arr.concat(Array.from(this.teacherTitle)) : newArr;
    },
    newAdminTitle () {
      const arr = [];
      const newArr = arr.concat(this.adminTitle);
      newArr.push({
        title: '操作',
        slot: 'action',
        width: 170,
        align: 'center',
        fixed: 'right'
      });
      this.adminTitle.forEach((elem) => {
        if (elem.title === 'id') {
          elem.title = '工号';
        } else if (elem.title === 'password') {
          elem.title = '密码';
        } else if (elem.title === 'name') {
          elem.title = '姓名';
        }
      });

      return Array.from(this.adminTitle).length === 0 ? arr.concat(Array.from(this.adminTitle)) : newArr;
    }

  }
}
</script>

<style scoped lang="less">
</style>
