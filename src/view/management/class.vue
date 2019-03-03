<template>
  <Card :bordered="false" shadow>
    <div class="class-container">
      <Button type="primary" icon="md-add" @click="addModal = true">点击添加班级</Button>
      <Input
        v-model="searchInput"
        prefix="ios-people"
        placeholder="请输入班级"
        style="width: auto; margin-left: 20px"
      />
      <Button type="primary" icon="ios-search" style="margin-left: 10px;" @click="handleSearch">搜索</Button>
      <Button type="warning" icon="md-refresh" style="margin-left: 10px;" @click="handleReset">重置</Button>

      <!-- 主体显示表格 -->
      <Table :columns="columns" :data="classData" style="margin-top: 10px;">
        <!-- 插槽，显示每行的编辑功能 -->
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="default" style="margin-right: 5px" @click="classEdit(row)">编辑</Button>
          <Button type="error" size="default" @click="classDelete(row)">删除</Button>
        </template>
      </Table>

      <!-- 编辑modal -->
      <Modal
        v-model="editModal"
        title="编辑班级信息"
        @on-visible-change="handleOpenEdit"
        @on-ok="handleEdit"
      >
        <Form :model="editForm" :label-width="80" :rules="editRule" ref="editForm">
          <FormItem label="姓名" prop="name">
            <i-input v-model="editForm.name" style="width: 150px;"></i-input>
            <span style="margin-left: 10px;">长度2~10位</span>
          </FormItem>

          <FormItem label="Select">
            <Select v-model="editForm.sex" style="width: 150px;">
              <Option value="m">男</Option>
              <Option value="f">女</Option>
            </Select>
          </FormItem>

          <FormItem label="新密码">
            <i-input v-model="editForm.password" style="width: 150px;" placeholder="如不修改不填写即可"></i-input>
          </FormItem>
        </Form>
      </Modal>

      <!-- 添加modal -->
      <Modal
        v-model="addModal"
        title="添加学生信息"
        @on-visible-change="handleOpenAdd"
        @on-ok="handleAdd"
      >
        <Form :model="addForm" :label-width="80" :rules="addRule" ref="addForm">
          <FormItem label="姓名" prop="name">
            <i-input v-model="addForm.name" style="width: 150px;"></i-input>
            <span style="margin-left: 10px;">长度2~10位</span>
          </FormItem>

          <FormItem label="性别" prop="sex">
            <Select v-model="addForm.sex" style="width: 150px;">
              <Option value="m">男</Option>
              <Option value="f">女</Option>
            </Select>
          </FormItem>

          <FormItem label="密码" prop="password">
            <i-input v-model="addForm.password" style="width: 150px;"></i-input>
            <span style="margin-left: 10px;">长度5~10位</span>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'class',
  data () {
    return {
    }
  },
  methods: {
    name() {

    }
  },
  computed: {
    // 班级的columns
    classTitle () {
      return this.data;
    }
    // classData () {
    // }
  }
}
</script>

<style scoped lang="less">
</style>
