<template>
  <div id="navbar">
    <v-navigation-drawer v-model="drawer" app clipped class="d-flex justify-space-between">
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
        <div class="mx-4">
        <v-btn
        rounded
        elevation="10"        
        block
        color="teal accent-3"
        @click="goToNewNote"
        >
        New Note</v-btn>
        </div>
        <v-card class="ma-2" elevation="12"> 
        <v-card-text class="pb-0">TO-DO'S</v-card-text>
          <div class="pb-2 " v-for="(list, index) in tasks" :key="index">
            <div class="d-flex flex-row ma-0 pb-0 " v-for="task in list" :key="task.value">
            <v-card-text class="ma-0 py-0 px-3">{{task.value}}</v-card-text>
            </div>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title link @click="navigateTo(notes)" class="row-pointer">Task Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-icon aria-label="dark mode" role="img" aria-hidden="false" class="mx-6" :style="{color: darkModeIcon.color}" @click="toggleDarkMode"> {{darkModeIcon.icon}} </v-icon> -->
    </v-app-bar>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import { v4 as uuidv4 } from 'uuid';
import {mapState} from 'vuex'

export default {
  name: "navbar",
  props: {
    routes: Array,
    darkMode: Boolean,
    // user: Object
  },
  data: () => ({
    drawer: null,
    darkModeIcon: {icon: "mdi-theme-light-dark", color: "white"},
  }),
  computed: mapState(["tasks", "user"]),
  methods: {
    navigateTo(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route }).catch((error) => {
          console.log(error);
        })
      }
    },
    toggleDarkMode(){
      this.darkModeIcon.color === "white" ? this.darkModeIcon.color = "grey" : this.darkModeIcon.color = "white";
      this.$emit("change-dark-mode")
    },
    logout() {
      const { data, error } = supabase.auth.signOut()
      this.drawer = null
      error && console.log(error);
      data && console.log(data);
    },
    async goToNewNote(){
      console.log(this.$store.state.user.id);
      const newId = uuidv4();
      const { data, error } = await supabase
        .from('notes')
        .insert([
          { id: newId, user_id: this.$store.state.user.id, },
      ])
      error && console.log(error);
      data && console.log(data);
      return this.$router.push(`/notes/${newId}`)
    }
  }
}
</script>