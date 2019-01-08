<style lang="less">
@import "./common.less";
</style>
<template>
  <div>批量上传：
    <Upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
      <Button
        icon="ios-cloud-upload-outline"
        :loading="uploadLoading"
        @click="handleUploadFile"
      >上传文件</Button>
    </Upload>请选择上传用户类型：
    <Select
      :label-in-value="true"
      v-model="uploadRole"
      style="width:200px"
      @on-change="handleSelectRole"
    >
      <Option value="student" label="学生"></Option>
      <Option value="teacher" label="教师"></Option>
    </Select>
    <div class="ivu-upload-list-file" v-if="file !== null">
      <Icon type="ios-stats"></Icon>
      {{ file.name }}
      <Icon
        v-show="showRemoveFile"
        type="ios-close"
        class="ivu-upload-list-remove"
        @click.native="handleRemove()"
      ></Icon>
    </div>
    <!-- <transition name="fade">
      <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
        <div v-if="progressPercent == 100">
          <Icon type="ios-checkmark-circle"></Icon>
          <span>成功</span>
        </div>
      </Progress>
    </transition>-->
    <!-- <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    </Row> -->
  </div>
</template>
<script>
import excel from "@/libs/excel";
import adminModel from "@/api/admin.js";

export default {
  name: "upload-excel",
  data () {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false,

      // 上传文件用户选择的角色
      uploadRole: 'student'
    };
  },
  methods: {
    //  获取下拉框的值
    handleSelectRole (item) {
      // console.log(`我选择了${item}`);
      this.$Message.success(`您选择了：${item.label}`);
      this.$emit('receiveSelect', item.value);
    },
    initUpload () {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile () {
      this.initUpload();
    },
    handleRemove () {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
    handleBeforeUpload (file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("文件读取成功");
        const data = e.target.result;
        const { header, results } = excel.read(data, "array");
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.tableData = results;
        console.log(results);
        this.tableTitle = tableTitle;
        console.log(tableTitle);

        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;

        this.postUploadFile(tableTitle, results, this.uploadRole);
      };
    },
    postUploadFile (title, table, uploadRole) {
      adminModel
        .uploadResult({ title, table, uploadRole })
        .then(res => {
          console.log(res);

          if (res.retcode === 0) {
            this.$Notice.success({
              title: "成功",
              desc: false
            });
          } else {
            // debugger
            this.$Notice.error({
              title: "失败",
              desc: res.msg
            });
          }
        })
        .catch(() => {

        });
    }
  },
  created () { },
  mounted () { }
};
</script>
