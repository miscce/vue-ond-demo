//index.js
import myLoading from './loading.vue';
export default {
    /*
    * Vue:Vue 构造器
    * options:可选插件参数
    */
    install(Vue) {
      const Loading = Vue.extend(myLoading);
      const Profile = new Loading({
          el: document.createElement('div')
      });
      Vue.prototype.$loading = {
        show(){
          document.body.appendChild(Profile.$el);
        },
        hide(){
          document.body.removeChild(Profile.$el);
        }
      }
    }
}
