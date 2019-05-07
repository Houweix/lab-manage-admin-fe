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
    console.log(`add------------------`);
    console.log(role);
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
  //  获取管理员列表
  getAdmin: () => {
    return axios.request({
      url: '/admin/getAdmin',
      method: 'get'
    })
  },
  // 修改个人密码-------------
  editPass: ({
    editForm
  }) => {
    const data = {
      editData: editForm
    };

    return axios.request({
      url: '/admin/editPass',
      data,
      method: 'post'
    })
  },
  // 基本信息管理---------------------
  //  !!  实验室
  // 获取全部实验室
  getLab: () => {
    return axios.request({
      url: '/lab/getLabData',
      method: 'get'
    })
  },
  //  添加实验室
  addLab: ({
    postData
  }) => {
    const data = {
      labData: postData
    };
    return axios.request({
      url: '/lab/addLab',
      data,
      method: 'post'
    })
  },

  //  编辑实验室
  editLab: ({
    postData
  }) => {
    const data = {
      labData: postData
    };
    return axios.request({
      url: '/lab/editLab',
      data,
      method: 'post'
    })
  },
  //  删除实验室
  deleteLab: ({
    id
  }) => {
    const data = {
      labId: id
    };

    return axios.request({
      url: '/lab/deleteLab',
      data,
      method: 'post'
    })
  },

  //  !! 公告------------------------
  getPost: () => {
    return axios.request({
      url: '/post/getData',
      method: 'get'
    })
  },
  //  添加公告
  addPost: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/post/addData',
      data,
      method: 'post'
    })
  },

  //  编辑公告
  editPost: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/post/editData',
      data,
      method: 'post'
    })
  },
  //  删除公告
  deletePost: ({
    id
  }) => {
    const data = {
      postId: id
    };

    return axios.request({
      url: '/post/deleteData',
      data,
      method: 'post'
    })
  },

  // !! 课程 -------------------------------
  getCourseData: () => {
    const data = {};

    return axios.request({
      url: '/course/getAllData',
      data,
      method: 'get'
    })
  },
  //  添加课程
  addCourse: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/course/addData',
      data,
      method: 'post'
    })
  },
  //  编辑课程
  editCourse: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/course/editData',
      data,
      method: 'post'
    })
  },
  //  删除课程
  deleteCourse: ({
    id
  }) => {
    const data = {
      courseId: id
    };

    return axios.request({
      url: '/course/deleteData',
      data,
      method: 'post'
    })
  },

  //  获取学生班级信息
  getClass: () => {
    const data = {};

    return axios.request({
      url: '/class/getClass',
      data,
      method: 'get'
    })
  },
  //  根据班级名称查询该班级的课程
  getCourseByClass: ({
    name
  }) => {
    const data = {
      className: name
    };

    return axios.request({
      url: '/class/getCourseByClass',
      data,
      method: 'post'
    })
  },
  //  为指定的班级添加课程
  addCourseByClass: ({
    classN,
    courseN
  }) => {
    const data = {
      className: classN,
      courseName: courseN
    };

    return axios.request({
      url: '/class/addCourseByClass',
      data,
      method: 'post'
    })
  },
  //  根据班级和课程列出学生
  getFilterStudentData: ({
    classN,
    courseN
  }) => {
    const data = {
      className: classN,
      courseName: courseN
    };

    return axios.request({
      url: '/grade/getFilterStudentData',
      data,
      method: 'post'
    })
  },

  //  根据班级和课程列出学生
  getClassStudent: ({
    classN
  }) => {
    const data = {
      className: classN
    };

    return axios.request({
      url: '/grade/getClassStudent',
      data,
      method: 'post'
    })
  },
  //  添加成绩
  addGrade: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/grade/addGrade',
      data,
      method: 'post'
    })
  },
  //  编辑成绩
  editGrade: ({
    pdata
  }) => {
    const data = {
      postData: pdata
    };
    return axios.request({
      url: '/grade/editGrade',
      data,
      method: 'post'
    })
  }

}
