import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/new',
        name: 'Создать задачу',
        component: () =>
            import ('../views/New.vue')
    },
    {
        path: '/',
        name: 'Список Задач',
        component: () =>
            import ('../views/List.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router