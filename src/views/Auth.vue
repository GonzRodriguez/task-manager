<template lang="html">
  <v-row justify="center">
      <SignUp v-if="isSignUp" /> 
      <Login v-else />
  </v-row>
</template>
<script>
import SignUp from "../components/SignUp"
import Login from "../components/Login.vue"
import { mapState, } from 'vuex'

export default {
  name: "auth",
  components: { SignUp, Login },
    computed: {
    ...mapState(["notes", "user"]),
    isAuthenticated: function(){ return this.$store.getters.isAuthenticated},
    },

  data: () => ({
    credentials:{
      email: "",
      password: ""
    },
    isSignUp: ""
  }),
  watch: {
    isAuthenticated(){
      console.log(this.isAuthenticated);
      this.isAuthenticated && window.location.reload()
    }
  },
  methods: {
    signUp(credentials){
    this.$store.dispatch("signUp", credentials)
    this.$router.push({name: "home"})
    },

  }
}
</script>
<style lang="css" scoped>
  
</style>