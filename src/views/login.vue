<template>
    <v-container>
          <v-text-field
            label="登录"
            outlined
            v-model="userName"
            @keyup.enter="submit"
          ></v-text-field>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      userName: "",
      pass: "admin"
    }
  },
  methods:{
    submit(){
      if(this.userName === this.pass){
        localStorage.setItem('isLogin','Yes')
        this.$router.push({path:'/About'})
      }
    }
  }
}
</script>
