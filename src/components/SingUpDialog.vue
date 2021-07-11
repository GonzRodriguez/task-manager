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
            <div class="d-flex justify-center my-6">
              <v-btn 
              rounded
              x-large
              elevation="8"
              justify="center"
              @click="signUp"
              >
              Sign Up with github
              <v-icon dark>
                mdi-github
              </v-icon>
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

  }),
  methods: {
    signUp(){
      this.$emit("sign-up")
    }  
  }
}
</script>
<style>
  
</style>