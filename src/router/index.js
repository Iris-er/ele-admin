import Vue from 'vue'
import VueRouter from 'vue-router'
import TopLeftFrame from '../components/topLeftFrame'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TopLeftFrame,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: {
          title: 'home'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: 'about'
        }
      }
    ]
  }
]

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   },
//   {
//     path: '/menu',
//     name: 'Menu',
//     component: () => import(/* webpackChunkName: "menu" */ '../views/menu/NavMenu.vue'),
//     children: [
//       {
//         path: '',
//         name: 'overview',
//         component: () => import(/* webpackChunkName: "menu" */ '../views/Overview.vue'),
//         meta: {
//           title: '概览'
//         }
//       },
//       {
//         path: '/menu/product',
//         name: 'Product',
//         component: () => import(/* webpackChunkName: "menu" */ '../views/Product.vue')
//       },
//       {
//         path: '/menu/post',
//         name: 'Post',
//         component: () => import(/* webpackChunkName: "menu" */ '../views/Post.vue')
//       }
//     ]
//   }
// ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
