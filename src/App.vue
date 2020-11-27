<template>
  <v-app>
    <Navbar v-if="NavbarShow"></Navbar>
    <v-main class="ma-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  data(){
    return{
      NavbarShow: true
    }
  },
  components: {
    Navbar
  },
  watch: {
    $route(to, from) {
      if (this.$route.path == "/login" || this.$route.path ==  "/register") {
        this.NavbarShow = false;
      } else {
        this.NavbarShow = true;
      }
    }
  }
}
</script>

<style lang="scss">
</style>
