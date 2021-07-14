<template>
  <div class="tasks">
  <div  full-width class="d-flex flex-column" >
    <div class="text-h2 text-center display-4" v-text="'Nothing to see here!'"></div> 
    <v-img
        lazy-src="https://i.imgur.com/Q2BAOd2.png"
        max-height="400"
        max-width="400"
        src="https://i.imgur.com/Q2BAOd2.png"
        class="mx-auto"
      ></v-img>
      <v-btn 
      rounded
      x-large
      secondary
      color="teal accent-3"
      elevation="8"
      width="500"
      class="mx-auto my-3"
      @click="goBack"
      >
      GO BACK
      </v-btn>
  </div>
  </div>
</template>

<script>

export default {
  name: "component404",
  data: () => ({
    cards: [],
  }),
  
  created() {
  },
  methods: {
    goBack() {this.$router.go(-1)}
  }
}
</script>