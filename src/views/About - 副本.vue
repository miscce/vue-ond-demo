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
      <v-subheader inset>Folders</v-subheader>

      <v-list-item
        v-for="folder in folders"
        :key="folder.id"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="folder.name"></v-list-item-title>

          <v-list-item-subtitle v-text="folder.lastModifiedDateTime"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>
    </v-list>
 </v-app>
</template>
<script>
  const request = require('../utils/request.js')
  export default {
    data: () => ({
      folders: [],
    }),
    mounted() {
      request.get()
        .then(res => {
          this.folders = res.data.value
        })
        .catch(err => { console.log(err) })
    }
  }
</script>
<style>
.v-list-item{
  justify-content: flex-start !important;
}
</style>
