<template>
  <div class="home">
    axiso请求
    <button @click='get'>get请求</button>
  </div>
</template>

<script>
// import { get } from '@/utils/axios.js'
import cookies from 'vue-cookies'
import axios from 'axios'
const request = require('../utils/request.js')
export default {
  data () {
    return {
      folder: []
    }
  },
  methods: {
    get () {
      // console.log(cookies)
      request.get()
        .then(res => {
          this.folder = res.data.value
          this.folder.forEach(item => {
            console.log(item)
          })
        })
        .catch(err => { console.log(err) })
      // axios.get('/api').then(res=>{console.log(res)})
    }
  },
  updated () {
    // console.log(request)
    this.folder.forEach(item => {
      console.log(item)
    })
  }
}
</script>
