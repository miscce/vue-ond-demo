import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import vuetify from './plugins/vuetify'
import loading from '@/components/loading'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import 'videojs-flash'
Vue.use(VideoPlayer)
Vue.use(loading)
Vue.use(VueCookies)

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  let flag = localStorage.getItem('isLogin')
  if (to.meta.requireAuth) {         //如果需要跳转 ，往下走（1）
    if (flag) {            //判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
      if (to.path === '/login') {    //判断下一个路由是否为要验证的路由（3）
        next('/detail');         // 如果是直接跳到首页，
      } else {             //如果该路由不需要验证，那么直接往后走
        next();
      }
    } else {
      console.log('没有');      //如果没有登陆过，或者token 过期， 那么跳转到登录页
      next('/login');
    }
  } else {                           //不需要跳转，直接往下走
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
