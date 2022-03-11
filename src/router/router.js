// 路由文件
export default [
    {   
        // 我的订单
        name:'center',
        path:'/center',
        redirect:'/center/myorder',
        component: ()=> import('../pages/Center'),
        children:[
            {
                path:'myorder',
                component:()=> import('../pages/Center/MyOrder')
            },
            {
                path:'bulkorder',
                component:()=> import('../pages/Center/BulkOrder')
            }
        ],
        meta:{
            show: true,
            see:true
        },
    },
    {   
        // 支付成功页面
        name:'paysuccess',
        path:'/paysuccess',
        component:()=> import('../pages/PaySuccess'),
        meta:{
            show: true
        },
    },
    {   
        // 支付页面
        name:'pay',
        path:'/pay',
        component: ()=> import('../pages/Pay'),
        meta:{
            show: true
        },
    },
    {   
        // 交易页面
        name:'trade',
        path:'/trade',
        component: ()=> import('../pages/Trade'),
        meta:{
            show: true
        },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            }else{
                // 从哪来，回哪去
                next(false)
            }
        }
    },
    {   
        // 购物车页面
        name:'shopcart',
        path:'/shopcart',
        component: ()=> import('../pages/ShopCart'),
        meta:{
            show: true,
            see:true
        },
    },
    {   
        // 添加至购物车
        name:'addcart',
        path:'/addcart',
        component: ()=> import('../pages/AddCartSuccess'),
        meta:{
            show: true,
            see:true
        },
    },
    {   
        // 详情
        name:'detail',
        path:'/detail/:skuId?',
        component: ()=> import('../pages/Detail'),
        meta:{
            show: true,
            see:true
        },
    },
    {   
        // 搜索
        name:'search',
        path:'/search/:keyword?',
        component: ()=> import('../pages/Search'),
        meta:{
            show: true,
            see:true
        },
        props:({query})=>{
            return {k: query.k}
        }
    },
    {
        // 登录
        name:'login',
        path:'/login',
        component: ()=> import('../pages/Login'),
        meta:{
            show: false
        }
    },
    {   
        // 首页
        name:'home',
        path:'/home',
        component: ()=> import('../pages/Home'),
        meta:{
            show: true,
            see:true
        }
    },
    {
        // 注册
        name:'register',
        path:'/register',
        component: ()=> import('../pages/Register'),
        meta:{
            show: false
        }
    },
    // 重定向
    {
        path:'/',
        redirect: '/home'
    }
]