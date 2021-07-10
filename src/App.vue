<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped>
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
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title link @click="navigateTo(notes)" class="row-pointer">Task Manager</v-toolbar-title>
      <v-icon aria-label="dark mode" role="img" aria-hidden="false" :style="{color: darkModeIcon.color}" @click="toggleDarkMode"> {{darkModeIcon.icon}} </v-icon>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view :key="$route.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<style lang="css" scoped>
.row-pointer:hover {
  cursor: pointer;
}
</style>
<script>
export default {
  name: "App",
  data: () => ({
    drawer: null,
    routes: [
      { path: "notes", title: "Notes", icon: "mdi-view-dashboard" },
      { path: "lists", title: "Lists", icon: "mdi-cog" }
    ],
    darkMode: true,
    darkModeIcon: {icon: "mdi-theme-light-dark", color: "white"}
    
  }),
  computed: {
    cachedDarkMode(){
     return !this.darkMode;
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
    toggleDarkMode(){
      this.darkMode = this.cachedDarkMode;
      this.$vuetify.theme.dark = this.darkMode;
      this.darkModeIcon.color === "white" ? this.darkModeIcon.color = "grey" : this.darkModeIcon.color = "white";
    }
},
}
</script>
