<template>
  <v-app id="app">
    <NavBar :isAuthenticated="isAuthenticated" :routes="routes" :darkMode="darkMode" @change-dark-mode="handleDarkMode"></NavBar>
    <v-main>
      <v-alert :color="alert.color" :type="alert.type" v-if="alert.isActive" width="60%" id="alert">{{alert.message}}</v-alert>
      <v-container class="fill-height" v-if="!loading" >
        <v-row align="center" justify="center" class="fill-height" no-gutters> 
          <v-col >
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
      <v-progress-linear indeterminate color="teal accent-3" v-else ></v-progress-linear>
    </v-main>
    <v-footer class="d-flex flex-row-reverse" app>
      <span >&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { supabase } from './supabase'
import {mapState} from 'vuex'

export default {

  components: { NavBar },
  name: "App",
  data: () => ({
    routes: [
      { path: "/tasks", title: "Tasks", icon: "mdi-view-dashboard" },
      { path: "/notebooks", title: "Notebooks", icon: "mdi-notebook-edit-outline" },
      { path: "/notes", title: "Notes", icon: "mdi-note-multiple-outline" },

    ],
    darkMode: true,
    sideMenuActive: true
  }),
  computed: {
    isAuthenticated: function(){ return this.$store.getters.isAuthenticated},
    StateUser : function(){ return this.$store.getters.StateUser},
    ...mapState([ "alert", "user", "loading", "drawer"])
    },

  updated(){
    this.$store.commit("setUser")
    this.isAuthenticated && this.$store.dispatch("getTasks", this.user.id)
    this.isAuthenticated && this.$store.dispatch("getNotes", this.user.id)
    this.isAuthenticated && this.$store.dispatch("getNotebooks", this.user.id)
    
  },
    mounted(){
    this.$store.commit("setUser", supabase.auth.user())
    },
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
    handleDarkMode(){
    // TODO
     this.darkMode = !this.darkMode;
    },

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
#alert {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000
}
</style>