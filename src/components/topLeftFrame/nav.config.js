// 用于与服务端返回的权限数据相匹配动态生成导航

export default [
  // {
  //   level: 1,
  //   // any: 1, // 表示无需权限随意访问
  //   power: 'dashboard_read',
  //   path: '/',
  //   name: '系统首页',
  //   icon: 'mico-export'
  // },
  {
    level: 1,
    any: 1, // 表示无需权限随意访问
    // power: 'account_read',
    name: '账户管理',
    icon: 'mico-export',
    child: [
      {
        level: 2,
        any: 1, // 表示无需权限随意访问
        // power: 'custom_read',
        name: '客户管理',
        path: '/home'
      },
      {
        level: 2,
        any: 1, // 表示无需权限随意访问
        // power: 'feedback_read',
        name: '意见反馈',
        path: '/about'
      }
    ]
  }
]
