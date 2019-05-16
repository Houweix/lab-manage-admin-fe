<template>
  <div>
    <Card :bordered="false" shadow style="height:550px">
      <p slot="title" style="font-size: 20px">班级课程关联</p>
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
          选择课程（点击添加）
          <Select
            v-model="courseSelect"
            @on-change="getSelectCourse"
            placeholder="请选择课程"
            filterable
          >
            <Option
              v-for="(item,idx) in transCourseData"
              :disabled="item.disable"
              :key="idx"
              :value="item.name"
              :label="item.name"
            ></Option>
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
                <Cell :title="item.course" v-for="(item, idx) in nowClassCourse" :key="idx">
                  <Button slot="extra" type="error" size="default" @click="courseDelete(item.course)">删除</Button>
                </Cell>
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
    //  删除已经关联的课程
    courseDelete(val) {
      console.log('-----------');
      console.log({classN: this.classSelect, courseN: val});
      adminModel.deleteCourseByClass({classN: this.classSelect, courseN: val}).then((res) => {
        if (res.retcode === 0) {
          this.$Notice.success({
            title: "删除成功"
          });
          //  更新数据
          this.getCourseByClass(this.classSelect);
        } else {
          this.$Notice.error({
            title: "删除失败，稍后重试"
          });
        }
      });
    },
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
    //  获取指定班级的已选课程
    getCourseByClass (val) {
      adminModel.getCourseByClass({ name: val }).then((res) => {
        if (res.retcode === 0) {
          this.nowClassCourse = res.data;
          console.log(res);
        }
      });
    },
    //  为指定的班级添加课程
    addCourseByClass (val) {
      adminModel.addCourseByClass({ classN: this.classSelect, courseN: val }).then((res) => {
        if (res.retcode === 0) {
          this.$Notice.success({
            title: "添加成功"
          });

          this.getCourseByClass(this.classSelect);
        }
      });
    },
    // 班级
    getSelectClass (val) {
      this.getCourseByClass(val);
      // console.log(val);
    },
    // 课程
    getSelectCourse (val) {
      if (this.classSelect) {
        this.addCourseByClass(val);
      } else {
        this.$Notice.error({
          title: "请先选择班级"
        });
      }
      // console.log(val);
    },
    //  根据课程名字判断当前班级是否存在
    hasCourse (name) {
      return this.nowClassCourse.find((elem) => elem.course === name);
    }

  },
  mounted () {
    this.getClass();
    this.getCourse();
  },
  computed: {
    //  处理课程数据，增加已选择的过滤
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
