<template>
  <div class="grade-container">
    <Card title="成绩管理" bordered shadow>
      <Row :gutter="16">
        <i-col span="4">
          <Select v-model="classSelect" @on-change="getSelectClass" placeholder="请选择班级" filterable>
            <Option
              v-for="(item, idx) in classData"
              :key="idx"
              :label="item.class"
              :value="item.class"
            ></Option>
          </Select>
        </i-col>
        <i-col span="6">
          <Select
            v-model="courseSelect"
            @on-change="getSelectCourse"
            placeholder="请选择课程"
            filterable
          >
            <Option
              v-for="(item,idx) in nowClassCourse"
              :key="idx"
              :value="item.course"
              :label="item.course"
            ></Option>
          </Select>
        </i-col>

        <Button type="primary" icon="md-add" @click="addModal = true">点击添加学生成绩</Button>
      </Row>
      <!-- 表格区域 -->
      <Table border stripe :columns="studentTitle" :data="studentTableData" style="margin-top: 30px;">
        <!-- 插槽，显示每行的编辑功能 -->
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="default"
            style="margin-right: 5px"
            @click="courseEdit(row)"
          >编辑</Button>
          <Button type="error" size="default" @click="courseDelete(row)">删除</Button>
        </template>
      </Table>
    </Card>

    <Modal v-model="addModal" title="添加成绩信息" @on-visible-change="handleOpenAdd" @on-ok="handleAdd">
      <Form :model="addForm" :label-width="80" ref="addForm">
        <FormItem label="学生姓名" prop="name">
          <Select
            v-model="addForm.student"
            placeholder="请选择学生"
            filterable
            style="width: 150px;"
          >
            <Option
              v-for="(item,idx) in studentData"
              :key="idx"
              :value="item.name"
              :label="item.name"
            ></Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import adminModel from "@/api/admin.js";
import { setColumns } from '@/libs/util'

export default {
  name: 'grade',
  data () {
    return {
      //  班级当前选中
      classSelect: '',
      //  课程当前选中
      courseSelect: '',
      // 总的class数据
      classData: [],
      //  总的课程信息
      courseData: [],

      //  当前选中班级的课程
      nowClassCourse: [],
      addModal: false,
      editModal: false,
      addForm: {
        student: '',
        course: '',
        grade_val: '',
        class: ''
      },
      //  当前班级的学生信息(select)
      studentData: [{name: 'houwei'}, {name: 'zouhao'}],
      //  table的学生信息
      studentTableData: []
    }
  },
  methods: {
    // 获取所有的班级
    getClass () {
      adminModel.getClass().then((res) => {
        if (res.retcode === 0) {
          console.log(res);
          this.classData = res.data;
        }
      });
    },
    //  获取指定班级的已选课程
    getCourseByClass (val) {
      adminModel.getCourseByClass({ name: val }).then((res) => {
        if (res.retcode === 0) {
          this.nowClassCourse = res.data;
        }
      });
    },
    //  根据班级和课程列出学生
    getFilterStudentData(val) {
      adminModel.getFilterStudentData({ classN: this.classSelect, courseN: val }).then((res) => {
        if (res.retcode === 0) {
          this.studentTableData = res.data;
        }
      });
    },
    // 班级
    getSelectClass (val) {
      this.getCourseByClass(val);
    },
    // 课程
    getSelectCourse (val) {
      this.getFilterStudentData(val);
    },
    // !!--弹窗相关
    // 添加
    handleOpenAdd() {

    },
    // 添加
    handleAdd() {

    }
  },
  mounted () {
    this.getClass();
  },
  computed: {
    // 学生的columns
    studentTitle () {
      if (this.studentTableData[0]) {
        const arr = [];
        const newArr = arr.concat(setColumns(this.studentTableData[0]));
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
          if (elem.title === 'name') {
            elem.title = '课程名称';
          } else if (elem.title === 'lab_id') {
            elem.title = '实验室';
          } else if (elem.title === 'date') {
            elem.title = '上课日期';
          } else if (elem.title === 'start_time') {
            elem.title = '开始时间（小时';
          } else if (elem.title === 'end_time') {
            elem.title = '结束时间（小时';
          } else if (elem.title === 'week') {
            elem.title = '上课周数（周';
          }
        });

        return newArr;
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
