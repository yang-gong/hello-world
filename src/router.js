import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello.vue' 
import World from '@/views/World.vue' 
import Login from '@/views/Login.vue' 
import Index from '@/views/Index.vue' 

import User from '@/views/sys/User.vue'
import Home from '@/views/sys/Home.vue'
import Role from '@/views/sys/Role.vue'
import Permission from '@/views/sys/Permission.vue'
Vue.use(Router)
export default new Router({
 routes:[
    {
        path:'/',
        name:'login',
        component: Login

    },
    {
        path:'/index',
        name:'index',
        component: Index,
        children:[
            {
                path:'/',
        name:'home',
        component: Home
            },
            {
                path:'/user',
        name:'user',
        component: User
            },
            {
                path:'/role',
        name:'role',
        component: Role
            },
            {
                path:'/permission',
        name:'permission',
        component: Permission
            }
        ]

    },
     {
         path:'/hello',
         name:'hello',
         component: Hello

     },
     {
        path:'/world',
        name:'world',
        component: World

    }
   
 ]
})