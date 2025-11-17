import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../layout/Home.vue')
    },

    {
        path: '/MainLayout',
        component: () => import('../layout/MainLayout.vue')
    },

    {
        path: '/overview',
        component: () => import('../pages/Overview.vue')
    },

    // 基础组件
    {
        path: '/button',
        component: () => import('../pages/Button.vue')
    },
    {
        path: '/input',
        component: () => import('../pages/Input.vue')
    },
    {
        path: '/switch',
        component: () => import('../pages/Switch.vue')
    },
    {
        path: '/tab',
        component: () => import('../pages/Tab.vue')
    },

    // 反馈组件
    {
        path: '/dialog',
        component: () => import('../pages/Dialog.vue')
    },
    {
        path: '/message',
        component: () => import('../pages/Message.vue')
    },
    {
        path: '/Window',
        component: () => import('../pages/Window.vue')
    },

    // 数据展示
    {
        path: '/tree',
        component: () => import('../pages/Tree.vue')
    },
    {
        path: '/carousel',
        component: () => import('../pages/Carousel.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
