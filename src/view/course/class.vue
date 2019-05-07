<template>
  <div>
    <Card :bordered="false" shadow style="height:550px">
      <div style="margin: 10px 0;font-size: 18px;">班级课程关联</div>
      <Row :gutter="16">
        <i-col span="6">
          选择班级
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
          选择课程
          <Select
            v-model="courseSelect"
            @on-change="getSelectCourse"
            placeholder="请选择课程"
            filterable
          >
            <Option v-for="(item,idx) in transCourseData" :disabled="item.disable" :key="idx" :value="item.name" :label="item.name"></Option>
          </Select>
        </i-col>
      </Row>

      <Row :gutter="16" style="margin-top:20px;">
        <i-col span="6">
          <Card
            title="当前班级已选课程"
            :bordered="false"
            shadow
            style="border: 1px solid #dcdee2;border-radius: 5px"
          >
            <CellGroup>
              <template v-if="nowClassCourse[0]">
                <Cell :title="item.course" v-for="(item, idx) in nowClassCourse" :key="idx"/>
              </template>
              <Cell title="空" v-else/>
            </CellGroup>
          </Card>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import adminModel from "@/api/admin.js";
import { deepClone } from '@/libs/tools.js';

export default {
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
      nowClassCourse: []
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
    // 获取课程信息
    getCourse () {
      adminModel.getCourseData().then((res) => {
        if (res.retcode === 0) {
          // console.log(res);
          this.courseData = res.data;
        }
      });
    },
    getCourseByClass (val) {
      adminModel.getCourseByClass({ name: val }).then((res) => {
        if (res.retcode === 0) {
          this.nowClassCourse = res.data;
          console.log(res);
        }
      });
    },
    // 选择班级后
    getSelectClass (val) {
      this.getCourseByClass(val);
      // console.log(val);
    },
    getSelectCourse (val) {
      console.log(val);
    },
    //  根据课程名字判断当前班级是否存在
    hasCourse(name) {
      return this.nowClassCourse.find((elem) => elem.course === name);
    }

  },
  mounted () {
    this.getClass();
    this.getCourse();
  },
  computed: {
    transCourseData () {
      const arr = [];
      if (this.courseData[0]) {
        this.courseData.forEach((elem) => {
          const obj = {};
          obj.name = elem.name;

          //  存在
          if (this.hasCourse(elem.name)) {
            obj.disable = true;
          }

          arr.push(obj);
        })
      }
      return arr;
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
