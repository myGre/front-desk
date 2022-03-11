// 当前模块进行api的管理
import request from './request'
import moockRequest from './mockAxios'

// 三级联动的api
// 请求地址：/api/product/getBaseCategoryList GIt 无参数
export const reqListContainer = ()=>{
    return request({url:'/product/getBaseCategoryList', method:'get'})
}

// mockbanner数据的请求,home页面的banner图片
export const reqBanner = ()=>{
    return moockRequest({url:'/banner', method:'get'})
}

// 请求home页面中的floor数据，mockfloor
export const reqFloor = ()=>{
    return moockRequest({url:'/floor', method:'get'})
}
// 请求search数据
export const reqGetSearchList = (parme) => {
    // console.log(parme);
    return request({url:'/list', method:'post', data: parme})
}
// 请求获取详情的数据 /api/item/{ skuId }
export const reqGetGoodsInfo = (skuId) => {
    return request({url:`/item/${ skuId }`, method:'get'})
}
// 加入购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddShopGood = (skuId, skuNum)=>{
    return request({url:`/cart/addToCart/${ skuId }/${ skuNum }`, method:'post'})
}
// 获取购物车列表 /api/cart/cartList
export const reqCartList = ()=>{
    return request({url:'/cart/cartList', method:'get'})
}
// 切换用户选中状态 URL：/api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpcheckCartList = (skuId, isChecked)=>{
    return request({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})
}
// 删除某一个商品 url:/api/cart/deleteCart/{skuId} 请求方式:DELETE
export const reqDeleteCartList = (skuId)=>{
    return request({url:`/cart/deleteCart/${skuId}`, method:'delete'})
}
// 提交手机号，获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetPhoneCode = (phone)=>{
    return request({url:`/user/passport/sendCode/${phone}`, method:'get'})
}
// 完成注册 /api/user/passport/register post
export const reqRegister = (data) =>{
    return request({url:'/user/passport/register', method:'post', data})
}
// 登录 /api/user/passport/login
export const reqUserLogin = (data)=>{
    return request({url:'/user/passport/login', method:'post', data})
}
// 用户信息显示 URL：/api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>request({url:'/user/passport/auth/getUserInfo', method:'get'})

// 退出登录 /api/user/passport/logout
export const reqLogout = ()=> request({url:'/user/passport/logout', method:'get'})

// 获取用户地址 url:/api/user/userAddress/auth/findUserAddressList
export const reqUserAddress = ()=> request({url:'/user/userAddress/auth/findUserAddressList', method:'get'})

// 获取购物清单 url:/api/order/auth/trade
export const reqTrade = ()=> request({url:'/order/auth/trade', method:'get'})

// 提交订单 URL：/api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data)=> request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

// 支付订单 /api/payment/weixin/createNative/{orderId}
export const reqPayment = (orderId)=> request({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

// 查询支付状态 URL：/api/payment/weixin/queryPayStatus/{orderId}
export const reqPaymentStatus = (orderId)=> request({url:`/payment/weixin/queryPayStatus/${orderId}`, method:'get'})

// 获取我的订单列表 URL：/api/order/auth/{page}/{limit}
export const reqOrderList =(page, limit)=>request({url:`/order/auth/${page}/${limit}`, method:'get'})
