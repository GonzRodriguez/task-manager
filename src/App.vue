<template>
  <v-app id="app">
    <NavBar :routes="routes" :darkMode="darkMode" @change-dark-mode="cachedDarkMode" :user="user"></NavBar>
    <v-main>
      <v-container class="fill-height" v-if="signedIn" >
        <v-row align="center" justify="center">
          <v-col>
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="fill-height" v-else >
        <sing-up-dialog :dialog="dialog" @sign-up-github="signUpGithub" @sign-up="signUp"></sing-up-dialog>
      </v-container>
    </v-main>
    <v-footer class="d-flex flex-row-reverse" app>
      <span >&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SingUpDialog from './components/SingUpDialog.vue'
import { supabase } from './supabase'
import {mapState} from 'vuex'

export default {

  components: { NavBar, SingUpDialog },
  name: "App",
  data: () => ({
    dialog: false,
    routes: [
      { path: "tasks", title: "Tasks", icon: "mdi-view-dashboard" },
      { path: "notebooks", title: "Notebooks", icon: "mdi-notebook-edit-outline" },
      { path: "notes", title: "Notes", icon: "mdi-note-multiple-outline" },

    ],
    darkMode: true,
    // user: null,
    signedIn: false
  }),
  created(){
    
    supabase.auth.onAuthStateChange((event) => {
      event === "SIGNED_IN" ? this.signedIn = true : this.signedIn = false;
      event === "SIGNED_IN" ? this.dialog = false : this.dialog = true;
    })
      this.$store.state.user;
      this.$store.dispatch("getUser")
      this.$store.dispatch("getTasks")
      this.$store.dispatch("getNotes")
  },
  mounted(){

  },
  
  computed: mapState(["user"]),
  watch: {
    darkMode(newVal){
    this.$vuetify.theme.dark = newVal;
  }
  },
  methods: {
    navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route }).catch((error) => {
          console.log(error)
        });
      }
    },
    goHome(){
          this.$router.push({ name: "notes" }).catch((error) => {
          console.log(error)
        });
    },
    signUpGithub(){
      const { user, error } = supabase.auth.signIn({
        provider: 'github'
      }).catch(err => console.log(error, err))
      user?.aud ? this.signedIn = true : this.signedIn = false
    },
    signUp(credentials){
      const { user, error } = supabase.auth.signUp({
        credentials
      }).catch(err => console.log(error, err))
      user?.aud ? this.signedIn = true : this.signedIn = false
    },
    cachedDarkMode(){
     this.darkMode = !this.darkMode;
    }
},
}
</script>

<style lang="css" >
.row-pointer:hover {
  cursor: pointer;
}
* {
  scrollbar-width: thin;
}
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: rgb(63, 63, 63);
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(31, 31, 31);
  border-radius: 20px;
}
</style>