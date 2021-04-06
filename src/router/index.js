import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { apiHost } from '@/plugins/path'
import axios from '@/plugins/axios'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(Vuex)

const routes = [
  {
    //首页
    path: '/',
    name: 'index2',

    // meta: { wxt: true },
    meta: { requiresAuth: true, wxt: true },
    component: () => import('../views/index2.vue')
  },
  {
    // 发起拼团
    path: '/makegroup/:team_id',
    name: 'makegroup',

    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "makegroup" */ '../views/makegroup.vue')
  },
  {
    // 拼团列表
    path: '/makelist',
    name: 'makelist',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "makelist" */ '../views/makelist.vue')
  },
  { // 拼团订单确认页
    path: '/makeOrder',
    name: 'makeOrder',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "makeOrder" */ '../views/makeOrder.vue')
  },
  {
    // 分类列表
    path: '/classification/:type',
    name: 'classification',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "classification" */ '../views/classification.vue')
  },
  {
    // 购物车
    path: '/shopcat',
    name: 'shopcat',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "shopcat" */ '../views/shopCat.vue')
  },
  // commodity_id
  { // 订单确认页
    path: '/shopOrder/:shopping_id?/:ref_page?/:address_id?/:type?',
    /**
     * /:num?/:commodity_id?/:specification
     * 新增的【复消商品】
     * :type?/:num?/:commodity_id?/:specification?
     * 类型/数量/商品ID/规格
     */
    name: 'shopOrder',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "shopOrder" */ '../views/shopOrder.vue')
  },

  {
    // 商品详情
    path: '/goods/:id/:type',
    name: 'goods',
    // meta: { requiresAuth: true },


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "goods" */ '../views/goods.vue')
  },
  { // 订单列表
    path: '/orders/:type',
    name: 'orders',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "orders" */ '../views/orders.vue')
  },
  { // 订单列表
    path: '/order/:order_id',
    name: 'order',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "order" */ '../views/order.vue')
  },
  { // 订单列表
    path: '/search_result/:opt_name?/:keyword?/:type/:class_id',
    name: 'search_result',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "search_result" */ '../views/search_result.vue')
  },
  { // 拼团订单列表
    path: '/search_result_make/:opt_name?/:keyword?/:type/:class_id',
    name: 'search_result_make',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "search_result_make" */ '../views/search_result_make.vue')
  },
  { // 个人中心
    path: '/personal',
    name: 'personal',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "personal" */ '../views/personal.vue')
  },
  { // 评论
    path: '/comments/:shopping_id',
    name: 'comments',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "comments" */ '../views/comments.vue')
  },
  { // 评论
    path: '/cachecomments',
    name: 'cachecomments',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "cachecomments" */ '../views/cachecomments.vue')
  },
  {
    // 评伦列表
    path: '/evaluate/:commodity_id',
    name: 'evaluate',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "evaluate" */ '../views/evaluate.vue')
  },
  {
    // 代金券
    //一直转圈圈
    path: '/coupon',
    name: 'coupon',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "coupon" */ '../views/coupon.vue')
  },
  {
    // 代金券
    path: '/demoxiong',
    name: 'demoxiong',


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "demoxiong" */ '../views/demoxiong.vue')
  },
  {
    // 地址列表
    path: '/addresses',
    name: 'addresses',



    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "addresses" */ '../views/addresses.vue')
  },
  {
    // 电销记录
    path: '/balancelog',
    name: 'balancelog',



    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "balancelog" */ '../views/balancelog.vue')
  },
  {
    //空白页————请点击右上角。。。
    path: '/wxtransfer',
    name: 'wxtransfer', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "wxtransfer" */ '../views/wxtransfer.vue')
  },
  // {
  //   // 转盘--首页————轮盘详情
  //   path: '/turntablebeifen',
  //   name: 'turntablebeifen', // 1

  // //   
  // meta: { requiresAuth: true, wxt: true },// 
  // component: () => import(/* webpackChunkName: "turntablebeifen" */ '../views/turntablebeifen.vue')
  // },
  {
    // 转盘--首页————轮盘详情
    path: '/turntable',
    name: 'turntable', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "turntable" */ '../views/turntable.vue')
  },
  {
    // 转盘--中奖记录
    path: '/recocrd',
    name: 'recocrd', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "turntable" */ '../views/recocrd.vue')
  },
  {
    // 转盘--获奖感言
    path: '/turnspeech/:draw_id',
    name: 'turnspeech', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "turnspeech" */ '../views/turnspeech.vue')
  },
  {
    // XXX的获奖感言
    path: '/speech',
    name: 'speech', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "speech" */ '../views/speech.vue')
  },
  {
    // 转盘--奖品详情
    path: '/turnprize/:id',
    name: 'turnprize', // 1


    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "turnprize" */ '../views/turnprize.vue')
  },
  {
    // 转盘--列表
    path: '/turnlist',
    name: 'turnlist', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "turnlist" */ '../views/turnlist.vue')
  },
  {
    // 奖品列表
    path: '/prizelists',
    name: 'prizelists', // 1 
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "prizelists" */ '../views/prizelists.vue')
  },
  {
    // 天天幸运
    path: '/everyday',
    name: 'everyday',
    meta: { requiresAuth: true, wxt: true },
    component: () => import('../views/everyday.vue')
  },
  {
    // 幸运转吧
    path: '/lucky',
    name: 'lucky',
    meta: { requiresAuth: true, wxt: true },
    component: () => import('../views/lucky.vue')
  },
  {
    // 兑换奖品
    path: '/duihuan/:draw_id?/:address_id',
    name: 'duihuan',
    meta: { requiresAuth: true, wxt: true },
    component: () => import('../views/duihuan.vue')
  }
];
const router = new VueRouter({
  routes
})


function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/weibo/i) == "weibo") {
    return true;
  } else {
    return false;
  }
};







router.beforeEach((to, from, next) => {
  to.matched.some(record => console.log(record,'电销——'))
  if (to.matched.some(record => record.meta.wxt) && is_weixn()) {
    //判断是否为微信小程序或者微博小程序
    next(
      {
        path: '/wxtransfer',
        query: { redirect2: to.fullPath, f: 'pps' }
      }
    );
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('电销——2');
    //判断meta.requiresAuth
    // console.log('requiresAuth存在');
    axios.get(`${apiHost}/islogin`)
      .then((res) => {
        let { data } = res
        console.log(res, '电销——islogin接口返回的值');
        if (data.status === 1) {
          // sessionStorage.setItem("name", data.info.name || '我的好友');
          // sessionStorage.setItem("mobile", data.info.mobile);
          // sessionStorage.setItem("is_certification", data.info.is_certification);
          // sessionStorage.setItem("card_id", data.info.card_id);
          // sessionStorage.setItem("available_amount", data.info.available_amount);
          // sessionStorage.setItem("id", data.info.id);
          // sessionStorage.setItem('icon_url', data.info.icon_url);
          sessionStorage.setItem("recommender_name", data.info.parent.username);//紧急帮——推荐人——姓名
          sessionStorage.setItem("recommender_phone", data.info.parent.mobile);//紧急帮——推荐人——电话
          sessionStorage.setItem("name", data.info.name || '我的好友');
          sessionStorage.setItem("mobile", data.info.mobile);
          sessionStorage.setItem("title", data.info.title);
          sessionStorage.setItem("is_certification", data.info.is_certification);
          sessionStorage.setItem("card_id", data.info.card_id);
          sessionStorage.setItem("available_amount", data.info.available_amount);
          sessionStorage.setItem("id", data.info.id);
          sessionStorage.setItem('icon_url', data.info.icon_url);
          next()
        } else {
          // sessionStorage.setItem("name", '');
          // sessionStorage.setItem("mobile", '');
          // sessionStorage.setItem("is_certification", '');
          console.log('电销——else 1的');
          sessionStorage.setItem("name", '');
          sessionStorage.setItem("title", '');
          sessionStorage.setItem("mobile", '');
          sessionStorage.setItem("is_certification", '');
          console.log('电销——调用了1',to.fullPath);
          next({
            // path: '/login',
            query:location.href = `/#/login?redirect=/dx${to.fullPath}`
            // query: { redirect: to.fullPath }
            // query:window.location.href='/login'
          })
        }
      })
      .catch(() => {
        console.log('电销——登陆异常的');
        // sessionStorage.setItem("name", '');
        // sessionStorage.setItem("mobile", '');
        // sessionStorage.setItem("is_certification", '');
        // location.href = `/#/login?redirect=/dx${to.fullPath}`
        sessionStorage.setItem("name", '');
        sessionStorage.setItem("title", '');
        sessionStorage.setItem("mobile", '');
        sessionStorage.setItem("is_certification", '');
        console.log('电销——调用了2');
        next(
          {
            // path: 'login',
            // query: { redirect: to.fullPath }
            query:location.href = `/#/login?redirect=/dx${to.fullPath}`
          }
        )
      })

  } else if (!is_weixn() && to.query.f === 'pps') {
    // console.log('to.query.f === pps的路由跳转');
    next(to.query.redirect2)
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
