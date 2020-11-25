import axios from 'axios'
import store from '@/store'
import Vue from 'vue'

const instance = axios.create({
  baseURL: 'https://graph.microsoft.com/v1.0/',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 20000
})

// 路由请求拦截
// http request 拦截器
instance.interceptors.request.use(
  config => {
    Vue.prototype.$loading.show()
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
  },
  err => {
    return Promise.reject(err)
  })

// 路由响应拦截
// http response 拦截器
instance.interceptors.response.use(response => {
  Vue.prototype.$loading.hide()
  return response
  }, error => {
  const status = error.response ? error.response.status : null
  if (status === 401) {
    return axios.get('/api')
      .then(response => {
        error.config.headers.Authorization = 'Bearer ' + response.data.access_token
        error.config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        error.config.baseURL = 'https://graph.microsoft.com/v1.0/'
        localStorage.setItem('accessToken', response.data.access_token)
        return instance(error.response.config)
        	}).catch(error => {
        		return Promise.reject(error)
        	})
  }
})

export default instance
