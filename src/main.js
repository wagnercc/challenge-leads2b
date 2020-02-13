import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import login from './components/login/login.vue';
import cadastro from './components/cadastro/cadastro.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/login', login, component: login},
    { path: '/cadastro', login, name: 'Cadastro', component: cadastro, beforeEnter: (to, from, next) => {
      let auth = localStorage.getItem("authLogin");
      if(!auth) next('login')
      else next();
    }},
    { path: '/', redirect: '/login'}
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
