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
      <v-list-item
        v-for="item in list"
        :key="item.id"
        @click='getDetail(item)'
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            {{item.icon}}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-text="item.name" class="d-flex flex-row mb-6"></v-list-item-title>
        <v-list-item-action class="d-flex flex-row mb-6">
            <v-list-item-title v-text="item.lastModifiedDateTime"></v-list-item-title>
            <v-list-item-title v-text="item.size"></v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <div>
      <v-row
        justify="center"
      >
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
        >
          <v-card tile>
            <v-toolbar
              flat
              dark
              color="primary"
            >
              <v-btn
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="dialog = false"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>

 <v-row justify="center" v-if=type>
    <v-img
      :src=link
      lazy-src="https://picsum.photos/id/11/100/60"
      max-width="100%"
      max-height="100%"
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
  </v-row>

<div id="app" v-else>
  <div class="player-container">
    <vue-core-video-player :src=link></vue-core-video-player>
  </div>
</div>

            </v-card-text>
            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

 </v-app>
</template>

<script>
import Vue from 'vue'
const request = require('../utils/request.js')
export default {
  data () {
    return {
      list: [],
      hide: true,
      dialog: false,
      link: '',
      width: 1000,
      type: false,
    }
  },
  mounted() {
    const id = this.$route.params.id
    request.getDetail(id)
    .then(res=>{
      // console.log(res.data.value[0].['@microsoft.graph.downloadUrl'])
      console.log(res)
      this.list = res.data.value
      this.list.forEach(item=>{
        switch (true) {
          case /\.(jpg|png)$/.test(item.name):
            item.icon = 'mdi-image'
            break;
          case /\.(avi|mp4)$/.test(item.name):
            item.icon = 'movie'
            break;
          case /\.(js|html|css|txt|md)$/.test(item.name):
            item.icon = 'note'
            break;
          case /\.(exe)$/.test(item.name):
            item.icon = 'next_week'
            break;
          default:
            item.icon = 'folder_open'
            break;
        }
      })
      })
    .catch(err=>{console.log(err)})
  },
  methods:{
    getDetail(item){
      if(/\.(jpg|png)$/.test(item.name)){
        this.link = item['@microsoft.graph.downloadUrl']
        this.dialog = true
        this.type = true
      }
      if(/\.(mp4|avi)$/.test(item.name)){
        this.link = item['@microsoft.graph.downloadUrl']
        this.dialog = true
        this.type = false
      }
      console.log(item)
    },
    onPlay() {
      this.dp.play()
      }
  }
}
</script>

<style scoped="scoped">
  .play-root {
    width: 770px;
    height: 420px;
    background-color: coral;
    margin: 0 auto;
  }
</style>
