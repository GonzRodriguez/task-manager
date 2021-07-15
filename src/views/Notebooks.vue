<template>
  <div class="notebooks">
  <div v-if="!notes"  full-width class="d-flex flex-column" >
    <div class="text-h2 text-center display-4" v-text="'No notebooks yet'"></div> 
    <v-img
        lazy-src="https://i.imgur.com/U3vTGjX.png"
        max-height="400"
        max-width="400"
        src="https://i.imgur.com/U3vTGjX.png"
        class="mx-auto"
      ></v-img>
    <v-btn 
      rounded
      x-large
      secondary
      color="teal accent-3"
      elevation="8"
      max-width="500"
      class="mx-auto"
      @click="createNotebook"
      >
      CREATE NEW NOTEBOOK
      </v-btn>
  </div>
  </div>
</template>

<script>
import { mapState, } from 'vuex'

export default {
  name: "notebooks",
  data: () => ({
  }),
  created() {
    console.log(this.$store);
  },
  computed: mapState(["notebooks"]),

  methods: {
    createNotebook(){

    }
  }
}
</script>