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

        <Button type="primary" icon="md-add" @click="openAddModal">点击添加学生成绩</Button>
      </Row>
      <!-- 表格区域 -->
      <Table
        border
        stripe
        :columns="studentTitle"
        :data="studentTableData"
        style="margin-top: 30px;"
      >
        <!-- 插槽，显示每行的编辑功能 -->
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="gradeEdit(row)">编辑</Button>
        </template>
      </Table>
    </Card>

    <!-- 添加 -->
    <Modal v-model="addModal" title="添加成绩信息" @on-visible-change="handleOpenAdd" @on-ok="handleAdd">
      <Form :model="addForm" :label-width="80" ref="addForm">
        <FormItem label="学生姓名" prop="name">
          <Select v-model="addForm.student" placeholder="请选择学生" filterable style="width: 150px;">
            <Option
              v-for="(item,idx) in studentData"
              :key="idx"
              :value="item.name"
              :label="item.name"
            ></Option>
          </Select>
        </FormItem>

        <FormItem label="当前课程">{{courseSelect}}</FormItem>

        <FormItem label="成绩">
          <i-input v-model="addForm.grade_val" placeholder="填写成绩" style="width: 150px;"></i-input>
        </FormItem>
      </Form>
    </Modal>

    <!-- 编辑 -->
    <Modal v-model="editModal" title="添加成绩信息" @on-ok="handleEdit">
      <Form :model="editForm" :label-width="80" ref="addForm">
        <FormItem label="学生姓名" prop="name">
          {{ editStudent }}
        </FormItem>

        <FormItem label="当前课程">{{courseSelect}}</FormItem>

        <FormItem label="成绩">
          <i-input v-model="editForm.grade_val" placeholder="填写成绩" style="width: 150px;"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import adminModel from "@/api/admin.js";
import { setColumns } from '@/libs/util';
import { deepClone } from '@/libs/tools.js';

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
      editForm: {
        id: '',
        grade_val: ''
      },
      //  当前班级的学生信息(select)
      studentData: [],
      //  table的学生信息
      studentTableData: [],
      //  编辑时显示的学生姓名
      editStudent: ''
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
    getFilterStudentData (val) {
      adminModel.getFilterStudentData({ classN: this.classSelect, courseN: val }).then((res) => {
        if (res.retcode === 0) {
          this.studentTableData = res.data;
        }
      });
    },
    // 根据班级列出学生list
    getClassStudent (val) {
      adminModel.getClassStudent({ classN: val }).then((res) => {
        if (res.retcode === 0) {
          this.studentData = res.data;
        }
      });
    },
    // 班级
    getSelectClass (val) {
      this.courseSelect = '';
      this.getCourseByClass(val);
      this.getClassStudent(val);
    },
    // 课程
    getSelectCourse (val) {
      this.getFilterStudentData(val);
    },
    // !!--弹窗相关
    openAddModal () {
      if (this.classSelect && this.courseSelect) {
        this.addModal = true;
      } else {
        this.$Message.error({ content: '请先选择班级和课程', duration: 2 });
      }
    },

    // 添加
    handleOpenAdd (status) {
      if (status) {
        this.addForm.grade_val = '';
      }
    },
    // 添加
    handleAdd () {
      this.addForm.class = this.classSelect;
      this.addForm.course = this.courseSelect;
      const pForm = deepClone(this.addForm);

      adminModel.addGrade({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('添加成功!');
          this.getFilterStudentData(this.courseSelect);
          this.addModal = false;
        } else {
          this.$Message.error({ content: '添加失败，请稍后重试', duration: 4 });
        }
      });
    },
    //  编辑
    gradeEdit (row) {
      this.editForm.id = row.id;
      this.editForm.grade_val = row.grade_val;
      this.editStudent = row.student;

      this.editModal = true;
    },
    //  确定编辑
    handleEdit() {
      const pForm = deepClone(this.editForm);

      adminModel.editGrade({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('编辑成功!');
          this.editModal = false;

          this.getFilterStudentData(this.courseSelect);
        } else {
          this.$Message.error({ content: '编辑失败，请稍后重试', duration: 4 });
        }
      });
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
          width: 100,
          align: 'center',
          fixed: 'right'
        });
        newArr.forEach((elem) => {
          //  超出...
          elem.ellipsis = true;
          if (elem.title === 'id') {
            elem.title = '序号';
          } else if (elem.title === 'student') {
            elem.title = '学生名称';
          } else if (elem.title === 'grade_val') {
            elem.title = '成绩';
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
