<template>
  <v-app>
    <v-card>
    <v-list
      subheader
      two-line
    >
  <v-list-item>
      <v-list-item-title style="width: 70%;flex: none;">文件</v-list-item-title>
      <v-list-item-action class="d-flex flex-row" style="width: 100%">
        <v-list-item-title>时间</v-list-item-title>
        <v-list-item-title>大小</v-list-item-title>
      </v-list-item-action>
    </v-list-item>

    <v-divider></v-divider>

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
        <v-list-item-title v-text="item.name" class="d-flex align-start" style="width: 60%;flex: none;">
        </v-list-item-title>
        <v-list-item-action class="d-flex flex-row" style="width: 100%">
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
          width="600"
        >
          <v-card
          >
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
          <v-spacer></v-spacer>
          <v-btn text>
              <span>Exit</span>
              <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-card-title>
<!--            <v-toolbar
              dark
              color="primary"
              max-height=60
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
            </v-toolbar> -->
            <!-- <v-card-text> -->

 <v-row justify="center" v-if="type==='image'">
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

<div id="app" v-else-if="type==='video'">
  <div class="player-container" style="height: 100%; width: auto;">
          <video-player class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions">
      </video-player>
  </div>
</div>

<div v-else-if="type==='editor'">
    <div class="container">
      <code-editor
        :options="options"
        :value="content"
        style="height: 500px; width: 100%;"
        class="editor"
      ></code-editor>
    </div>
</div>

            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    </v-card>
 </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import CodeEditor  from '@/components/editor.vue'
const request = require('../utils/request.js')
export default {
  components:{
    CodeEditor
  },
  data () {
    return {
      list: [],
      hide: true,
      dialog: false,
      link: '',
      width: 1000,
      type: false,
      content: "safdssssde1",
      drawer: false,
      group: null,
      options: {
        language: "html",
        theme: 'vs',
        readOnly: false
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: '' // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  mounted() {
    console.log(this.$route.params)
    const id = this.$store.state.id || localStorage.getItem('id');
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
      if(item.file === undefined){
        this.$store.commit('setid',item.id)
        this.$router.push(`/detail/${item.name}`)
        return
      }
      if(/image\/\w+/.test(item.file.mimeType)){
        this.link = item['@microsoft.graph.downloadUrl']
        this.dialog = true
        this.type = 'image'
      }
      if(/video\/\w+/.test(item.file.mimeType)){
        this.playerOptions.sources[0].src = item['@microsoft.graph.downloadUrl']
        this.link = item['@microsoft.graph.downloadUrl']
        this.dialog = true
        this.type = 'video'
      }
      if(/\.(json|js|html|css)$/.test(item.name)){
        this.dialog = true
        this.type = 'text'
        axios(item['@microsoft.graph.downloadUrl']).then(res=>{
          this.type = 'editor'
          this.content = res.data
          })
      }
    },
    resetData() {
        // if(this.$route.fullPath=='/strategy'){
            //在这里获取并处理该路由下所需要的数据。
    // }
    console.log(1)
    this.$router.go(0)
    }
  },
    watch: {
          $route:{
              handler:'resetData',
          },
                group () {
        this.drawer = false
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
.container {
  text-align: left;
  padding: 10px;
}
</style>
