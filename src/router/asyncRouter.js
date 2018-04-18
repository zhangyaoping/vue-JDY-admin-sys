// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储
//首页
const defaultLayout = resolve => require(['@/components/home/layout'], resolve)
//商户管理
const merchantList = resolve => require(['@/components/merchantManagement/merchantList'], resolve)
const financialDetails = resolve => require(['@/components/merchantManagement/financialDetails'], resolve)
const parameterList = resolve => require(['@/components/merchantManagement/parameterList'], resolve)

//审核管理
const userAudit = resolve => require(['@/components/clientManagement/userAudit'], resolve)
const usersList = resolve => require(['@/components/clientManagement/usersList'], resolve)

//报表统计
const statement = resolve => require(['@/components/reportStatistics/statement'], resolve)
//系统管理
const listAccounts = resolve => require(['@/components/settingsAmend/listAccounts'], resolve)
//用户管理
const useraudits = resolve => require(['@/components/clientmanage/useraudits'], resolve)
const finalauditlist = resolve => require(['@/components/clientmanage/finalauditlist'], resolve)

//
const asyncRouter = [
  {
    path: '/asyncRouter',
    component: defaultLayout,
    children: []
  },
  {
    path: '/merchantList',
    meta: {
      permission: []
    },
    component: merchantList,
  },
  {
    path: '/financialDetails',
    meta: {
      permission: []
    },
    component: financialDetails,
  },
  {
    path: '/parameterList',
    meta: {
      permission: []
    },
    component: parameterList
  }, {
    path: '/useraudit',
    meta: {
      permission: []
    },
    component: userAudit
  }, {
    path: '/userslist',
    meta: {
      permission: []
    },
    component: usersList
  }, {
    path: '/statement',
    meta: {
      permission: []
    },
    component: statement
  }, {
    path: '/listAccounts',
    meta: {
      permission: []
    },
    component: listAccounts
  }, {
    path: '/useraudits',
    meta: {
      permission: []
    },
    component: useraudits
  }, {
    path: '/finalauditlist',
    meta: {
      permission: []
    },
    component: finalauditlist
  }
]

export default asyncRouter
