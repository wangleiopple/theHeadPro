// 前端路由，我们需要配置的路由路径写在index.js里面
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login';
import store from '../services/store';
import HelloWorld from "@/components/HelloWorld";
Vue.use(Router)

const router = new Router({
  routes: [    {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    acl: true
  },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!to.acl) {
    next();
  }
  const token = store.get('token');
  if (!token) {
    next({ path: '/login' });
  } else {
    next();
  }
});
export default router;