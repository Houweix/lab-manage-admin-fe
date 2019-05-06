<template>
  <Card :bordered="false" shadow>
    <div style="margin: 10px 0;font-size: 18px;">基本课程管理</div>
    <div class="course-container">
      <Button type="primary" icon="md-add" @click="addModal = true">点击添加课程</Button>

      <!-- 主体显示表格 -->
      <Table :columns="courseTitle" :data="transCourseData" style="margin-top: 10px;">
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

      <!-- 编辑modal -->
      <Modal v-model="editModal" title="编辑课程信息" @on-ok="handleEdit">
         <Form :model="editForm" :label-width="120" ref="addForm">
          <FormItem label="课程名称" prop="name">
            <i-input v-model="editForm.name" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="实验室名称" prop="lab_id">
            <Select filterable v-model="editForm.lab_id" style="width: 150px;">
              <Option
                :value="item.value"
                :label="item.label"
                v-for="(item,idx) in transLabData"
                :key="idx"
              ></Option>
            </Select>
          </FormItem>

          <FormItem label="上课日期" prop="date">
            <i-input v-model="editForm.date" placeholder="课程星期" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="开始时间" prop="start_time">
            <i-input v-model="editForm.start_time" placeholder="x时" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="结束时间" prop="end_time">
            <i-input v-model="editForm.end_time" placeholder="x时" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="周数" prop="week">
            <i-input v-model="editForm.week" placeholder="xx-xx" style="width: 150px;"></i-input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 添加modal -->
      <Modal
        v-model="addModal"
        title="添加课程信息"
        @on-visible-change="handleOpenAdd"
        @on-ok="handleAdd"
      >
        <Form :model="addForm" :label-width="120" ref="addForm">
          <FormItem label="课程名称" prop="name">
            <i-input v-model="addForm.name" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="实验室名称" prop="lab_id">
            <Select filterable v-model="addForm.lab_id" style="width: 150px;">
              <Option
                :value="item.value"
                :label="item.label"
                v-for="(item,idx) in transLabData"
                :key="idx"
              ></Option>
            </Select>
          </FormItem>

          <FormItem label="上课日期" prop="date">
            <i-input v-model="addForm.date" placeholder="课程星期" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="开始时间" prop="start_time">
            <i-input v-model="addForm.start_time" placeholder="x时" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="结束时间" prop="end_time">
            <i-input v-model="addForm.end_time" placeholder="x时" style="width: 150px;"></i-input>
          </FormItem>

          <FormItem label="周数" prop="week">
            <i-input v-model="addForm.week" placeholder="xx-xx" style="width: 150px;"></i-input>
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
  name: 'course',
  data () {
    return {
      columns: [],
      // 添加的弹窗开关
      addModal: false,
      editModal: false,
      courseData: [],
      addForm: {
        name: '',
        lab_id: '',
        date: '',
        start_time: '',
        end_time: '',
        week: ''
      },
      editForm: {
        id: '',
        name: '',
        lab_id: '',
        date: '',
        start_time: '',
        end_time: '',
        week: ''
      },
      //  实验室信息`
      labData: []
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
    // 获取课程信息
    getCourse () {
      adminModel.getCourseData().then((res) => {
        if (res.retcode === 0) {
          // console.log(res);
          this.courseData = res.data;
        }
      });
    },
    //  添加
    handleAdd () {
      const pForm = deepClone(this.addForm);

      adminModel.addCourse({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('添加成功!');
          this.addModal = false;

          this.getCourse();
        } else {
          this.$Message.error({ content: '添加失败，请稍后重试', duration: 4 });
        }
      });
    },
    handleEdit () {
      const pForm = deepClone(this.editForm);

      adminModel.editCourse({ pdata: pForm }).then((res) => {
        if (res.retcode === 0) {
          console.log(res);

          this.$Message.success('编辑成功!');
          this.editModal = false;

          this.getCourse();
        } else {
          this.$Message.error({ content: '编辑失败，请稍后重试', duration: 4 });
        }
      });
    },
    //  点开添加的初始化
    handleOpenAdd (state) {
      if (state) {
        this.addForm.name = '';
        this.addForm.lab_id = '';
        this.addForm.date = '';
        this.addForm.start_time = '';
        this.addForm.end_time = '';
        this.addForm.week = '';
      }
    },
    //  编辑
    courseEdit (row) {
      // 初始化数据
      this.editForm.name = row.name;
      this.editForm.id = row.id;
      this.editForm.lab_id = this.courseData.find(elem => elem.id === row.id).lab_id;
      this.editForm.date = row.date;
      this.editForm.start_time = row.start_time;
      this.editForm.end_time = row.end_time;
      this.editForm.week = row.week;

      // 打开弹窗
      setTimeout(() => {
        this.editModal = true;
      });
    },
    // 删除
    courseDelete (row) {
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确认要删除该课程的信息吗？</p>',
        onOk: () => {
          adminModel.deleteCourse({ id: row.id }).then((res) => {
            if (res.retcode === 0) {
              console.log(res);

              this.$Message.success('删除成功!');

              // 刷新数据
              this.getCourse();
            } else {
              // 刷新数据
              this.getCourse();
              this.$Message.error({ content: '删除失败，请稍后重试', duration: 4 });
            }
          });
        }
      });
    },
    //  根据id获取中文名
    getNameById (id) {
      return this.transLabData.find(item => Number(item.value) === Number(id)) ? this.transLabData.find(item => Number(item.value) === Number(id)).label : '';
    }
  },
  computed: {
    // 班级的columns
    courseTitle () {
      if (this.courseData[0]) {
        const arr = [];
        const newArr = arr.concat(setColumns(this.courseData[0]));
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
            elem.title = '课程id';
          } else if (elem.title === 'name') {
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
    },
    transLabData () {
      const arr = [];
      if (Array.isArray(this.labData) && this.labData.length) {
        this.labData.forEach((elem) => {
          const obj = {};
          obj.value = elem.id;
          obj.label = elem.name;
          arr.push(obj);
        });
      }

      return arr;
    },
    transCourseData () {
      const data = [];
      if (this.courseData[0]) {
        this.courseData.forEach((elem, idx) => {
          data.push(deepClone(elem));
          data[idx].lab_id = this.getNameById(data[idx].lab_id) ? this.getNameById(data[idx].lab_id) : data[idx].lab_id;
        });
      }
      return data;
    }
  },
  mounted () {
    //  实验室
    this.getLab();
    this.getCourse();
  }
}
</script>

<style scoped lang="less">
</style>
