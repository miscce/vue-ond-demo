<template>
  <v-app>
  <v-row>
    <v-col
      v-for="(item,idx) in list"
      :key="item.id"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="item['@microsoft.graph.downloadUrl']"
        :lazy-src="`https://picsum.photos/10/6?image=${idx * 5 + 10}`"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </v-app>
</template>

<script>
import Vue from 'vue'
 const request = require('../utils/request.js')
export default {
  data () {
    return {
      list: [],
      hide: true
    }
  },
  mounted() {
    const id = this.$route.params.id
    request.getDetail(id)
    .then(res=>{
      // console.log(res.data.value[0].['@microsoft.graph.downloadUrl'])
      // console.log(res)
      this.list = res.data.value
      })
    .catch(err=>{console.log(err)})
  }
}
</script>

<style>
</style>
