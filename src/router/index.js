import { createRouter, createWebHistory } from 'vue-router'
//--------------------------------------我是分隔線----------------------------------------//
import home from '../views/home.vue'
//--------------------------------------我是分隔線----------------------------------------//
import console_login_page from '../views/console_login_page.vue'
//--------------------------------------我是分隔線----------------------------------------//
import order_page from '../views/order_page.vue'
import order_page_all from '../views/order_page_all.vue'
import order_page_canceled from '../views/order_page_canceled.vue'
import order_page_checking from '../views/order_page_checking.vue'
import order_page_preparing from '../views/order_page_preparing.vue'
import order_page_shipped from '../views/order_page_shipped.vue'
//--------------------------------------我是分隔線----------------------------------------//
import account_page from '../views/account_page.vue'
//--------------------------------------我是分隔線----------------------------------------//
import products_page from '../views/products_page.vue'
//--------------------------------------我是分隔線----------------------------------------//
import upload_page from '../views/upload_page.vue'
//--------------------------------------我是分隔線----------------------------------------//
import all_purchase_history_page from '../views/all_purchase_history_page.vue'
//--------------------------------------我是分隔線----------------------------------------//
import robot_page from '../views/robot_page.vue'
//--------------------------------------我是分隔線----------------------------------------//

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', //!首頁
            name: 'home',
            redirect: '/console_login_page',
            component: home,
        },

        //--------------------------------------我是分隔線----------------------------------------//
        {
            path: '/console_login_page', //!登入頁面
            name: 'console_login_page',
            component: console_login_page,
        },
        //--------------------------------------我是分隔線----------------------------------------//
        {
            path: '/order_page', //!訂單頁面
            name: 'order_page',
            redirect: '/order_page_all',
            component: order_page,
            children: [
                {
                    path: '/order_page_all',
                    name: 'order_page_all',
                    component: order_page_all,
                    meta: { active: 'order_page' }, // 設定共用的屬性
                },
                {
                    path: '/order_page_checking',
                    name: 'order_page_checking',
                    component: order_page_checking,
                    meta: { active: 'order_page' }, // 同樣設定共用的屬性
                },
                {
                    path: '/order_page_preparing', //!準備中
                    name: 'order_page_preparing',
                    component: order_page_preparing,
                    meta: { active: 'order_page' }, // 同樣設定共用的屬性
                },
                {
                    path: '/order_page_canceled', //!已取消
                    name: 'order_page_canceled',
                    component: order_page_canceled,
                    meta: { active: 'order_page' }, // 同樣設定共用的屬性
                },
                {
                    path: '/order_page_shipped', //!已出貨
                    name: 'order_page_shipped',
                    component: order_page_shipped,
                    meta: { active: 'order_page' }, // 同樣設定共用的屬性
                },
            ],
        },
        //--------------------------------------我是分隔線----------------------------------------//
        {
            path: '/account_page', //!帳號管理
            name: 'account_page',
            component: account_page,
        },
        {
            path: '/products_page', //!產品管理
            name: 'products_page',
            component: products_page,
        },
        {
            path: '/upload_page', //!產品管理
            name: 'upload_page',
            component: upload_page,
        },
        {
            path: '/all_purchase_history_page', //!交易紀錄
            name: 'all_purchase_history_page',
            component: all_purchase_history_page,
        },
        {
            path: '/robot_page', //!客服
            name: 'robot_page',
            component: robot_page,
        },
    ],
})

export default router
