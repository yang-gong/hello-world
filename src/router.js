import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello.vue' 
import World from '@/views/World.vue' 
import Login from '@/views/Login.vue' 
import Index from '@/views/Index.vue' 
import Item from '@/views/Item.vue'
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
        component: Index

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

    },
    {
        path:'/item',
        name:'item',
        component: Item

    }
 ]
})