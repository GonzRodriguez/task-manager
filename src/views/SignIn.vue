<template lang="html">
  <v-container class="fill-height">
    <v-card class="ma-auto">
      <v-card-title class="text-h5">
        Sing Up  
      </v-card-title>
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
        <v-divider
        ></v-divider>
        <v-btn 
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
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
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
  }),
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
  }
}
</script>
<style lang="css" scoped>
  
</style>