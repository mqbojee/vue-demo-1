import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import index from 'components/index'
import list from 'components/list'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: list
    },{
      path: '/',
      name: 'index',
      component: index
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
