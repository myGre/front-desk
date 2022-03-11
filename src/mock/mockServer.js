/* 
    此文件配置模拟数据
*/
// 引入模拟数据
import banner from './banner.json'
import floor from './floor.json'

// 导入mock模块
import Mock from 'mockjs'
// mock方法有两个参数。①请求地址, ②数据
Mock.mock('/mock/banner', {code: 200, data: banner} )
Mock.mock('/mock/floor', {code: 200, data: floor} )