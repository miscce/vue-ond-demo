// const axios = require('./axios.js')
import request from './axios'
// console.log(axios)
// exprot default axios.get('/me/drive')
export function get () {
  return request.get('/me/drive/root/children')
}

export function getDetail (id) {
  return request.get(`/me/drive/items/${id}/children`)
}
