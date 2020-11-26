<template>
  <v-app>
    <v-toolbar
      color="light-blue"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-view-module</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list
      subheader
      two-line
    >
<v-list-item-group v-model="model">
      <v-list-item
        v-for="folder in folders"
        :key="folder.id"
        @click='getDetail(folder.id)'
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-text="folder.name" class="d-flex flex-row mb-6"></v-list-item-title>
        <v-list-item-action class="d-flex flex-row mb-6">
            <v-list-item-title v-text="folder.lastModifiedDateTime"></v-list-item-title>
            <v-list-item-title v-text="folder.size"></v-list-item-title>
        </v-list-item-action>
      </v-list-item>
     </v-list-item-group>
    </v-list>
 </v-app>
</template>
<script>
  const request = require('../utils/request.js')
  export default {
    data: () => ({
      folders: [],
      model: 1
    }),
    methods:{
      // getDetail(id){
      //   request.getDetail(id)
      //   .then(res=>{console.log(res)})
      //   .catch(err=>{console.log(err)})
      // }
      getDetail(id){
       // this.$router.push({
       //   path: `/detail/${id}`,
       // })       
       this.$router.push('/detail')
       this.$store.commit('setid',id)
      }
    },
    mounted() {
      console.log(this.$store.state)
      request.get()
        .then(res => {
          this.folders = res.data.value
          console.log(res.data)
        })
        .catch(err => { console.log(err) })
    }
  }
</script>
<style>
.v-list-item__title{
  justify-content: flex-start !important;
  flex: 1 0 0
}
</style>
