<template>
  <v-app>
  <div>
    <v-card
      class="d-flex mb-6"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 3"
        :key="n"
        :class="n === 1 && 'mr-auto'"
        class="pa-2"
        outlined
        tile
      >
        Flex item
      </v-card>
    </v-card>
  </div>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
