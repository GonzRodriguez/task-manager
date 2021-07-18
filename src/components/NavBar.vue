<template>
  <div id="navbar">
    <v-navigation-drawer 
    v-model="drawer" 
    app 
    clipped
    >
      <NewNoteDialog :dialog="dialog" @handle-note-dialog="handleNewNoteDialog"></NewNoteDialog>
      <!-- TODO basicly all the views for every route -->
        <v-list dense v-for="route in routes" :key="route.title">
          <v-list-item link @click="navigateTo(route.path)">
            <v-list-item-action>
              <v-icon>{{route.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{route.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="ma-6">
        <v-btn
        rounded
        elevation="10"        
        block
        color="teal accent-3"
        @click="handleNewNoteDialog"
        >
        New Note</v-btn>
        </div>
        <v-card class="ma-2 pb-4" elevation="12" color="blue-grey darken-4"> 
        <v-card-text class="pb-0">TO-DO'S</v-card-text>
          <div class="pb-2 " v-for="(task, index) in tasks" :key="index">
            <v-card-text class="ma-0 py-0 px-3">{{task.value}}</v-card-text>
            </div>
        </v-card>
        <template v-slot:append>
        <div class="mb-6">
        <v-btn
        text
        block
        @click="logout"
        >
        Logout</v-btn>
        </div>
        </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left >
      <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title link @click="goHome()" class="row-pointer">Task Manager</v-toolbar-title>
    </v-app-bar>
      
      <!-- TODO some colors aren't set up in light mode -->
      <!-- <v-icon aria-label="dark mode" role="img" aria-hidden="false" class="mx-6" :style="{color: darkModeIcon.color}" @click="toggleDarkMode"> {{darkModeIcon.icon}} </v-icon> -->
  </div>
</template>

<script>
import { supabase } from '../supabase'
import {mapState} from 'vuex'
import NewNoteDialog from "./NewNoteDialog.vue"

export default {
  name: "navbar",
  components: { NewNoteDialog },
  props: {
    routes: Array,
    darkMode: Boolean,
    isAuthenticated: Boolean,
  },
  data: () => ({
    darkModeIcon: {icon: "mdi-theme-light-dark", color: "white"},
    dialog: false,
    drawer: true,

  }),
  computed: mapState(["tasks", "user"]),
  created(){
  if (!this.user) this.drawer = false 
  },
  updated(){
    this.$store.dispatch("getTasks", this.user?.id)
    if (!this.user) this.drawer = false 
  },

  methods: {
    navigateTo(route){
      this.$router.push(route)
    },
    toggleDarkMode(){
      this.darkModeIcon.color === "white" ? this.darkModeIcon.color = "grey" : this.darkModeIcon.color = "white";
      this.$emit("change-dark-mode")
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      this.drawer = false
      this.$store.commit("setUser")
      error && this.$store.dispatch("alert", error.message)
      !error && this.$router.push(`/signin`);
    },
    handleNewNoteDialog(){
      this.dialog = !this.dialog;
      this.$store.dispatch("getNotebooks", this.user?.id)
    },
    goHome(){
          this.$router.push({ name: "home" }).catch((error) => {
          console.log(error)
      });
    },


  }
}
</script>