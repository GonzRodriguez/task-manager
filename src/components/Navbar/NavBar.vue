<template>
  <div id="navbar">
    <v-navigation-drawer 
    v-model="drawer" 
    app 
    width="350"
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
        color="teal accent-4"
        @click="handleNewNoteDialog"
        aria-label="new note"
        >
        New Note</v-btn>
        </div>
        <v-card class="ma-2 pb-4" elevation="12" color="blue-grey darken-4"> 
        <v-card-text class="pb-0">TO-DO'S</v-card-text>
          <div v-for="(task, index) in tasks" :key="index">
            <Task :task="task" ></Task>
          </div>
        </v-card>
        <template v-slot:append>
          <div class="mb-6">
          <v-btn
          text
          block
          @click="logout"
          aria-label="log out"
          >
          Logout
          </v-btn>
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
import { supabase } from '../../supabase'
import {mapState} from 'vuex'
import NewNoteDialog from "../NewNoteDialog.vue"
import Task from './Task.vue'

export default {
  name: "navbar",
  components: { NewNoteDialog, Task },
  props: {
    routes: Array,
    darkMode: Boolean,
    isAuthenticated: Boolean,
  },
  data: () => ({
    darkModeIcon: {icon: "mdi-theme-light-dark", color: "white"},
    dialog: false,
    drawer: true,
    lineThrough: false,
    completed: []

  }),
  computed: mapState(["tasks", "user"]),
  created(){
  if (!this.user) this.drawer = false 
  },
  updated(){
    if (!this.user) this.drawer = false 
  },
  methods: {
    navigateTo(route){
        if (this.$route.path !== route) {
        this.$router.push({ path: route }).catch((error) => {
          console.log(error)
        });
      }
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
      !error && this.$router.push({name: "auth"});
    },
    handleNewNoteDialog(){
      this.dialog = !this.dialog;
      this.$store.dispatch("getNotebooks", this.user?.id)
    },
    goHome(){
      if (this.$route.name !== "home" && this.$route.path !== "/") {
        this.$router.push('/').catch((error) => {
          console.log(error)
        });
      }
    },


  }
}
</script>