<template>
  <v-app>
  <div>
    <v-row
      justify="center"
    >
      <v-btn
        color="primary"
        class="ma-2"
        dark
        @click="dialog = true"
      >
        Open Dialog 1
      </v-btn>

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
  <div class="d-flex flex-column justify-space-between align-center">
    <v-slider
      v-model="width"
      class="align-self-stretch"
      min="200"
      max="500"
      step="1"
    ></v-slider>

    <v-img
      :aspect-ratio="16/9"
      :width="width"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    ></v-img>
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
  export default {
    data () {
      return {
        dialog: false,
        width: 300,
      }
    },
  }
</script>

<style>
</style>
