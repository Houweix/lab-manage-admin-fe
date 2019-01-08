<template>
  <div class="admin-container">
    <!-- 主体显示表格 -->
    <Table :columns="columns" :data="tableData">
      <!-- 插槽，显示每行的编辑功能 -->
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="studentEdit(row)">编辑</Button>
        <Button type="error" size="small" @click="studentDelete(row)">删除</Button>
      </template>
    </Table>

    <!-- 编辑modal -->
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>

    <!-- 添加modal -->
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    //  点击删除一条学生信息
    studentDelete (row) {
      console.log(row);
    },
    // 点击编辑一条学生信息
    studentEdit (row) {
      this.$Modal.info({
        title: `编辑学生 ${row.name} 信息`,
        content: `
        姓名：${row.name}<br>
        密码：${row.password}`
      })
      console.log(row);
    }
  }
}
</script>

<style scoped>
</style>
