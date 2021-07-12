<template>
  <div>
    <v-row justify="center" > 
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <v-card >
            <v-card-title class="text-h5">
              Sing Up  
            </v-card-title>
            <div class="d-flex justify-center flex-row my-6">
              <v-btn 
              rounded
              x-large
              elevation="8"
              justify="center"
              @click="signUpGithub"
              >
              Sign Up with github
              <v-icon dark>
                mdi-github
              </v-icon>
              </v-btn>
            </div>
            <div class="ma-6 d-flex justify-center flex-column">
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
              rounded
              x-large
              secondary
              color="teal accent-3"
              elevation="8"
              justify="center"
              @click="signUp"
              >
              Sign Up
              </v-btn>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
  </div>
</template>
<script>
export default {
  name: "navbar",
  props: {
    dialog: Boolean,
  },
  data: () => ({
    credentials:{
      email: ""
    },

  }),
  methods: {
    signUpGithub(){
      this.$emit("sign-up-github")
    },
   signUp(){
      this.$emit("sign-up", this.credentials)
    } 
  }
}
</script>
<style>
  
</style>