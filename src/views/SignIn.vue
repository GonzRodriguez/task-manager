<template lang="html">
  <v-container class="fill-height">
    <v-card class="ma-auto pa-5" width="800">
      <div class="text-h5 text-center">
        {{isSigning ? "Sign in" : "Login"}}
      </div>
      <div class="my-10 mx-15 d-flex justify-center flex-column">
      <v-text-field
      type="email"
      autocomplete="email"
      rounded
      placeholder="Email"
      outlined
      v-model="credentials.email"
      ></v-text-field>
      <v-text-field
      type="password"
      autocomplete="password"
      rounded
      placeholder="Password"
      outlined
      v-model="credentials.password"
      ></v-text-field>
        <v-btn 
        v-if="isSigning"
        class="my-3"
        rounded
        x-large
        secondary
        color="teal accent-3"
        elevation="8"
        justify="center"
        @click="signUp(credentials)"
        >
        Sign Up
        </v-btn>
        <v-btn 
        v-if="!isSigning"
        class="my-3"
        rounded
        x-large
        secondary
        color="teal "
        elevation="8"
        justify="center"
        @click="logIn(credentials)"
        >
        Login
        </v-btn>
          <v-banner
          single-line
          >
            {{!isSigning ? "Don't have an account?" : "Do you have an account?"}}
            <template v-slot:actions>
              <v-btn
                text
                color="teal accent-3"
                @click="handleLoginButtons"
              >
            {{!isSigning ? "Sing up" : "Login"}}
              </v-btn>
            </template>
          </v-banner>
      </div>
    </v-card>
  </v-container>
</template>
<script>

export default {
    name: "signin",
  data: () => ({
    credentials:{
      email: "",
      password: ""
    },
    isSigning: false,
    hover: false
  }),
  updated(){
    this.$store.getters.isAuthenticated && this.$router.push({name: "home"})
  },
  watch: {
    credentials(){
      console.log(this.credentials);
    }
  },
  methods: {
    signUp(credentials){
    this.$store.dispatch("signUp", credentials)
    this.$router.push({name: "home"})
    },
    logIn(credentials){
    this.$store.dispatch("logIn", credentials)
    this.$router.push({name: "home"})
    },
    handleLoginButtons(){
      this.isSigning = !this.isSigning
    }
  }
}
</script>
<style lang="css" scoped>
  
</style>