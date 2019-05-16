import Main from '@/components/main';

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 管理员的管理相关
  {
    path: '/user',
    name: 'user',
    meta: {
      hideInBread: true,
      identity: 'admin'
    },
    component: Main,
    children: [
      {
        path: 'user_page',
        name: 'user_page',
        meta: {
          title: '用户管理',
          icon: 'ios-person'
        },
        component: () => import('@/view/user/user.vue')
      }
    ]
  },
  {
    path: '/management',
    name: 'management',
    meta: {
      title: '基本信息管理',
      icon: 'ios-cog',
      identity: 'admin',
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'lab',
        name: 'lab',
        meta: {
          title: '实验室管理',
          icon: 'ios-flask',
          identity: 'admin'
        },
        component: () => import('@/view/management/lab.vue')
      }
    ]
  },
  {
    path: '/course',
    name: 'course',
    meta: {
      title: '课程管理',
      icon: 'ios-school',
      identity: 'teacher'
    },
    component: Main,
    children: [
      {
        path: 'course_page',
        name: 'course_page',
        meta: {
          title: '基本课程管理',
          icon: 'ios-planet'
        },
        component: () => import('@/view/course/course_page.vue')
      }
    ]
  },
  {
    path: '/grade',
    name: 'grade',
    meta: {
      title: '课程管理',
      icon: 'ios-school',
      identity: 'teacher'
    },
    component: Main,
    children: [
      {
        path: 'grade_page',
        name: 'grade_page',
        meta: {
          title: '实验课成绩管理',
          icon: 'ios-podium'
        },
        component: () => import('@/view/course/grade.vue')
      }
    ]
  },
  {
    path: '/public',
    name: 'public',
    component: Main,
    meta: {
      title: '公告管理',
      identity: 'admin',
      hideInBread: true
    },
    children: [
      {
        path: 'post',
        name: 'post',
        meta: {
          title: '公告管理',
          icon: 'ios-megaphone'
        },
        component: () => import('@/view/public/post.vue')
      }
    ]
  },
  {
    path: '/class',
    name: 'class',
    component: Main,
    meta: {
      title: '课程班级分配',
      identity: 'admin',
      hideInBread: true
    },
    children: [
      {
        path: 'class_page',
        name: 'class_page',
        meta: {
          title: '课程班级分配',
          icon: 'ios-book'
        },
        component: () => import('@/view/course/class.vue')
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    meta: {
      hideInMenu: true,
      title: '个人中心'
    },
    component: Main,
    children: [
      {
        path: 'personal',
        name: 'personal',
        meta: {
          title: '个人中心',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/personal/personal.vue')
      }
    ]
  }
];
