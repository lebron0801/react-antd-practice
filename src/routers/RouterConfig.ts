const config = {
  id: 0,
  name: '根节点',
  code: '',
  nodeType: '',
  path: '',
  meta: { title: '根节点', auth: false, icon: '', keepAlive: false },
  childrens: [
    {
      id: 13,
      name: 'Dashboard',
      code: 'Dashboard',
      nodeType: 'folder',
      path: '',
      meta: { title: 'Dashboard', auth: false, icon: 'saas-dashboard', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '分析页',
          code: 'Analysis',
          nodeType: 'page',
          path: '/Dashboard/Analysis',
          meta: { title: '分析页', auth: true, icon: '', keepAlive: true }
        },
        {
          id: 10,
          name: '工作台',
          code: 'WorkStation',
          nodeType: 'page',
          path: '/Dashboard/WorkStation',
          meta: { title: '工作台', auth: true, icon: '', keepAlive: true }
        }
      ]
    },
    {
      id: 1,
      name: '排班模块',
      code: 'Scheduling',
      nodeType: 'folder',
      path: '',
      meta: { title: '排班模块', auth: true, icon: 'saas-scheduling', keepAlive: false },
      childrens: [
        {
          id: 2,
          name: '排班列表',
          code: 'SchedulingList',
          nodeType: 'page',
          path: '/Scheduling/SchedulingList',
          meta: { title: '排班列表', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 3,
          name: '排班管理',
          code: 'SchedulingManage',
          nodeType: 'page',
          path: '/Scheduling/SchedulingManage',
          meta: { title: '排班管理', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 4,
          name: '排班发布',
          code: 'SchedulingPublish',
          nodeType: 'page',
          path: '/Scheduling/SchedulingPublish',
          meta: { title: '排班发布', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 5,
      name: '用户模块',
      code: 'UserCenter',
      nodeType: 'folder',
      path: '',
      meta: { title: '用户中心', auth: false, icon: 'saas-user', keepAlive: false },
      childrens: [
        {
          id: 6,
          name: '用户列表',
          code: 'UserList',
          nodeType: 'page',
          path: '/UserCenter/UserList',
          meta: { title: '用户列表', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 7,
          name: '用户管理',
          code: 'UserManage',
          nodeType: 'page',
          path: '/UserCenter/UserManage',
          meta: { title: '用户管理', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 8,
      name: '考勤模块',
      code: 'Attendance',
      nodeType: 'folder',
      path: '',
      meta: { title: '考勤模块', auth: false, icon: 'saas-attendance', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '考勤列表',
          code: 'AttendanceList',
          nodeType: 'page',
          path: '/Attendance/AttendanceList',
          meta: { title: '考勤列表', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 10,
          name: '考勤管理',
          code: 'AttendanceManage',
          nodeType: 'page',
          path: '/Attendance/AttendanceManage',
          meta: { title: '考勤管理', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 11,
          name: '考勤期数',
          code: 'AttendancePeriod',
          nodeType: 'page',
          path: '/Attendance/AttendancePeriod',
          meta: { title: '考勤期数', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 12,
          name: '考勤记录',
          code: 'AttendanceRecord',
          nodeType: 'page',
          path: '/Attendance/AttendanceRecord',
          meta: { title: '考勤记录', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 13,
      name: '报表页',
      code: 'ReportPage',
      nodeType: 'folder',
      path: '',
      meta: { title: '报表页', auth: false, icon: 'saas-report', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '人员报表',
          code: 'UserReport',
          nodeType: 'folder',
          path: '',
          meta: { title: '人员报表', auth: true, icon: '', keepAlive: false },
          childrens: [
            {
              id: 10,
              name: '人员信息报表',
              code: 'UserInfoReport',
              nodeType: 'page',
              path: '/ReportPage/UserReport/UserInfoReport',
              meta: { title: '人员信息报表', auth: true, icon: '', keepAlive: false }
            },
            {
              id: 10,
              name: '人员出勤报表',
              code: 'UserAttendanceReport',
              nodeType: 'page',
              path: '/ReportPage/UserReport/UserAttendanceReport',
              meta: { title: '人员出勤报表', auth: true, icon: '', keepAlive: false }
            }
          ]
        },
        {
          id: 10,
          name: '其他报表',
          code: 'OtherReport',
          nodeType: 'page',
          path: '/ReportPage/OtherReport',
          meta: { title: '其他报表', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 13,
      name: '个人页',
      code: 'Account',
      nodeType: 'folder',
      path: '',
      meta: { title: '个人页', auth: false, icon: 'saas-user', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '个人中心',
          code: 'AccountCenter',
          nodeType: 'page',
          path: '/Account/AccountCenter',
          meta: { title: '个人中心', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 10,
          name: '个人设置',
          code: 'AccountSetting',
          nodeType: 'page',
          path: '/Account/AccountSetting',
          meta: { title: '个人设置', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 13,
      name: '表单页',
      code: 'FormPage',
      nodeType: 'folder',
      path: '',
      meta: { title: '表单页', auth: false, icon: 'saas-form', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '基础表单',
          code: 'BaseForm',
          nodeType: 'page',
          path: '/FormPage/BaseForm',
          meta: { title: '基础表单', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 10,
          name: '高级表单',
          code: 'SeniorForm',
          nodeType: 'page',
          path: '/FormPage/SeniorForm',
          meta: { title: '高级表单', auth: true, icon: '', keepAlive: false }
        }
      ]
    },
    {
      id: 13,
      name: '列表页',
      code: 'ListPage',
      nodeType: 'folder',
      path: '',
      meta: { title: '列表页', auth: false, icon: 'saas-list', keepAlive: false },
      childrens: [
        {
          id: 9,
          name: '查询列表',
          code: 'QueryList',
          nodeType: 'page',
          path: '/ListPage/QueryList',
          meta: { title: '查询列表', auth: true, icon: '', keepAlive: false }
        },
        {
          id: 10,
          name: '卡片列表',
          code: 'CardList',
          nodeType: 'page',
          path: '/ListPage/CardList',
          meta: { title: '卡片列表', auth: true, icon: '', keepAlive: false }
        }
      ]
    }
  ]
};

export default config;
