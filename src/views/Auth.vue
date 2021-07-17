<template lang="html">
  <v-row justify="center">
      <SignUp v-if="isSignUp" /> 
      <Login v-else />
  </v-row>
</template>
<script>
import SignUp from "../components/SignUp"
import Login from "../components/Login.vue"

export default {
  name: "auth",
  components: { SignUp, Login },

  data: () => ({
    credentials:{
      email: "",
      password: ""
    },
    isSignUp: ""
  }),
  created(){
    this.$route.query.component === "signup" ? this.isSignUp = true : this.isSignUp = false
  },
  updated(){
    this.$store.getters.isAuthenticated && this.$router.push({name: "home"})
  },
  methods: {
    signUp(credentials){
    this.$store.dispatch("signUp", credentials)
    this.$router.push({name: "home"})
    }
  }
}
</script>
<style lang="css" scoped>
  
</style>