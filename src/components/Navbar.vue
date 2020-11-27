<template>
    <nav>
        <v-app-bar color="red" dark app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon >
            <v-toolbar-title>
                <span class="font-weight-light"></span>
                <span>OneDrive</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <span>Exit</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
            <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
          <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-item avatar>
            <v-list-item-avatar>
              <!-- <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"> -->
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>KAKAROTS</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-divider/>
        <v-list>
            <v-list-item v-for="item in link" :key="item.title" :to="item.route" active-class="border">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            drawer: false,
            link: [
                {icon: 'folder_open', title: '文件管理', route: '/detail'},
                {icon: 'next_week', title: 'Aria2', route:'/aria2'}
            ]
        }
    }
}
</script>

<style>
.border{
    border-left: 5px solid red;
}
</style>
