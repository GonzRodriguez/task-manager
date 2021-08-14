<template lang="html">
    <v-row justify="center">
    <v-col lg="6" md="8" sm="10" xs="12" >
      <v-slide-x-transition>
      <v-card class="py-5 px-2" >
        <v-row justify="center">
          <v-col md="8" sm="10" >
            <v-card-text class="text-h5 text-center">
              Login
            </v-card-text>
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
              block
              secondary
              color="teal"
              elevation="8"
              justify="center"
              @click="logIn(credentials)"
              aria-label="login"
              >
              Login
              </v-btn>
              <v-btn 
                class="my-3"
                rounded
                x-large
                block
                elevation="8"
                justify="center"
                @click="signUpWhitGithub"
                aria-label="sign up with github"

                >
                Sign Up with GitHub
                <v-icon>mdi-github</v-icon>
                </v-btn>
              <v-card-text class="text-body-2">
              Don't have an account? <router-link :to="{name: 'auth', query: {c: 'signup'}}">Sing up</router-link>
              </v-card-text>
            <!-- </div> -->
          </v-col>
        </v-row>
      </v-card>
      </v-slide-x-transition>
    </v-col>
    </v-row>
</template>
<script>

export default {
    name: "signup",
  data: () => ({
    credentials:{
      email: "",
      password: ""
    },
  }),
  updated(){
    this.$store.getters.isAuthenticated && this.$router.push({name: "home"})
  },
  methods: {
    logIn(credentials){
    this.$store.dispatch("logIn", credentials)
    this.$router.push({path: "/"})
    },
    signUpWhitGithub(){
      this.$store.dispatch("signUpWhitGithub")
    }
  }
}
</script>
<style lang="css" scoped>
  
</style>