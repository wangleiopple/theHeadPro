// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口js文件
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from "./services/api";
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI,{size:"mini"});
Vue.prototype.$api = api;

var app =null;

axios.interceptors.response.use(function (response) { 
    return Promise.resolve(response); 
}, function (error) { 
	// Do something with response error 
	// 用户信息是否超时，重定向到登录页面 
	if(error.response.status==401){
		localStorage.clear();
		app.$router.push({path:"/login"});
	}
    return Promise.reject(error);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
