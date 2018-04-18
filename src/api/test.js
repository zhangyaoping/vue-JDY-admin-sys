import {axiosGet, axiosPost} from './baseApi'

// export const getTestList = (params,config)=>axiosGet('/getTestList',params,config);
// export const postTestList = (params,config)=>axiosPost('/sgw_system_web/sys/shop/getBaseInfo',params,config);


//mock接口
// export const postLoginSignIn = (params, config) => axiosPost('/login', params, config);
// export const getMenuList = (params, config) => axiosPost('/user/navlist', params, config);
// export const getbaseInfo = (params, config) => axiosPost('/user/baseInfo', params, config);
// export const getOcr = (params, config) => axiosPost('/user/ocrInfo', params, config);

//111111111
//获取验证码
export const postSendMessage = (params, config) => axiosPost('/login/sendMessage', params, config);
//登录接口
export const postLoginSignIn = (params, config) => axiosPost('/login/signIn', params, config);
export const signInfo = (params, config) => axiosPost('/login/signInfo', params, config);
//目录菜单
export const getMenuList = (params, config) => axiosGet('/common/menu', params, config);
//222222222
//获取商户列表
export const queryShopList = (params, config) => axiosPost('/sys/shop/queryShopList', params, config);
//修改短信通道
export const changeSmsSendPlatform = (params, config) => axiosPost('/sys/shop/changeSmsSendPlatform', params, config);
//开启关闭运营
export const shopService = (params, config) => axiosPost('/sys/shop/shopService', params, config);
// 上传商户logo上传还款支付方式，支付宝，微信，银行卡:
export const uploadImg = (params, config) => axiosPost('/sys/shop/uploadImgs', params, config);
//添加商户提交基础信息
export const baseInfo = (params, config) => axiosPost('/sys/shop/baseInfo', params, config);
//编辑商户提交基础信息
export const changeBaseInfo = (params, config) => axiosPost('/sys/shop/changeBaseInfo', params, config);
// 查询商户模块信息:
export const getModulesInfo = (params, config) => axiosPost('/sys/shop/getModulesInfo', params, config);
//更改收费配制
export const chargeInfo= (params, config) => axiosPost('/sys/shop/chargeInfo', params, config);
// 提交/修改cpa收费方式:
export const cpaInfo = (params, config) => axiosPost('/sys/shop/cpaInfo', params, config);
// 提交/修改还款配置:
export const repayInfo = (params, config) => axiosPost('/sys/shop/repayInfo', params, config);
//提交/修改收款配置:sys/shop/productInfo
export const productInfo = (params, config) => axiosPost('sys/shop/productInfo', params, config);
//提交额度区间
export const amountInfo = (params, config) => axiosPost('sys/shop/amountInfo', params, config);

// 获取风控模块接口:
export const getRiskModules = (params, config) => axiosPost('/sys/risk/getRiskModules', params, config);
//保存风控模块接口:
export const primaryRiskModules = (params, config) => axiosPost('/sys/risk/primaryRiskModules', params, config);
// 获取指定风控模块接口:
export const getDetailModule = (params, config) => axiosPost('/sys/risk/getDetailModule', params, config);
// 修改/添加指定风控模块接口:
export const changeDetailModule = (params, config) => axiosPost('/sys/risk/changeDetailModule', params, config);
//3333333333
//商户资金明细接口
export const queryCostDetail = (params, config) => axiosPost('/sys/shop/queryCostDetail', params, config);
//4444444444
//产品查询接口:
export const queryProductList = (params, config) => axiosPost('/sys/shop/queryProductList', params, config);
//5555555555
// 商户提现列表:
export const queryCashOutList = (params, config) => axiosPost('/sys/audit/queryCashOutList', params, config);
//商户充值列表
export const queryRechargeList = (params, config) => axiosPost('/sys/audit/queryRechargeList', params, config);
//审核充值/提现订单
export const changeAuditInfo = (params, config) => axiosPost('/sys/audit/changeAuditInfo', params, config);
//用户列表
export const userList = (params, config) => axiosPost('/sys/user/userList', params, config);
//获取所有角色
export const getAllRoles = (params, config) => axiosPost('/sys/user/getAllRoles', params, config);
// 添加用户:
export const addUser = (params, config) => axiosPost('/sys/user/addUser', params, config);
//修改用户:
export const changeUser = (params, config) => axiosPost('/sys/user/changeUser', params, config);
//.删除用户:
export const delateUser = (params, config) => axiosPost('/sys/user/delateUser', params, config);

//修改密码
export const changePwd = (params, config) => axiosPost('/sys/user/changePwd', params, config);
// 重置密码
export const resetPwd = (params, config) => axiosPost('/sys/user/resetPwd', params, config);
//用户管理
export const getReviewCusCustomer = (params, config) => axiosPost('/system/cus/getReviewCusCustomer', params, config);
export const getFinalCusCustomer = (params, config) => axiosPost('/system/cus/getFinalCusCustomer', params, config);
export const convertCustomer = (params, config) => axiosPost('/system/cus/convertCustomer', params, config);
