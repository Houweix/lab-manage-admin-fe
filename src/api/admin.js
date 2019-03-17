import axios from '@/libs/api.request';

/**
 * 这里是后台的接口管理
 */

export default {
  // 用户管理--------------------
  //  登录
  login: ({
    username,
    password,
    identity
  }) => {
    const data = {
      username,
      password,
      identity
    }
    return axios.request({
      url: '/admin/login',
      data,
      method: 'post'
    })
  },

  //  添加用户
  tmpAdd: ({
    username,
    password,
    identity
  }) => {
    const data = {

      username,
      password,
      identity
    }
    return axios.request({
      url: '/admin/tmpAdd',
      data,
      method: 'post'
    })
  },

  //  上传用户信息表格文件
  uploadResult: ({
    title,
    table,
    uploadRole
  }) => {
    const data = {
      tableTitle: title,
      tableResults: table,
      role: uploadRole
    }
    return axios.request({
      url: '/admin/uploadResult',
      data,
      method: 'post'
    })
  },

  //  获取各种用户的信息
  getAllData: ({
    role
  }) => {
    const params = {
      role: role
    }
    return axios.request({
      url: '/admin/getAllData',
      params,
      method: 'get'
    })
  },
  /**
   * 编辑用户信息（学生，教师，管理员）
   * @param role: 当前编辑的角色
   * @param editForm：编辑的内容
   */
  editInfo: ({
    role,
    editForm
  }) => {
    console.log(role);
    console.log(editForm);
    const data = {
      role: role,
      editData: editForm
    };

    return axios.request({
      url: '/admin/editUser',
      data,
      method: 'post'
    })
  },
  // 搜索用户信息
  searchUser: ({
    role,
    name
  }) => {
    const data = {
      role: role,
      name: name
    };

    return axios.request({
      url: '/admin/searchUser',
      data,
      method: 'post'
    })
  },
  // 添加用户信息
  /**
   * todo 可以通用
   */
  addUser: ({
    role,
    postData
  }) => {
    const data = {
      role: role,
      userData: postData
    };

    return axios.request({
      url: '/admin/addUser',
      data,
      method: 'post'
    })
  },
  //  删除用户数据
  deleteUser: ({
    role,
    id
  }) => {
    const data = {
      role: role,
      userData: {
        id
      }
    };

    return axios.request({
      url: '/admin/deleteUser',
      data,
      method: 'post'
    })
  },

  // 基本信息管理---------------------

  // 课程
  getCourseData: () => {
    const data = {};

    return axios.request({
      url: '/course/getAllData',
      data,
      method: 'get'
    })
  }
}
