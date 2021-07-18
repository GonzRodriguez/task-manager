<template>
  <div class="notebooks">
  <div v-if="!notebooks"  full-width class="d-flex flex-column" >
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
  <v-container v-else>
    <v-row v-for="(notebook, index) in notebooks" :key="index">
      <v-col cols="12">
        <v-col
        sm="2"
        >
          <v-sheet
            class="pa-2"
            color="grey darken-2"
            elevation="1"
            min-height="100"
            min-width="100"
            outlined
            rounded
            >
            {{notebook}}
          </v-sheet>
        </v-col>
        <v-col>

        </v-col>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import { mapState, } from 'vuex'

export default {
  name: "notebooks",
  notebooks: null,
  data: () => ({
  }),
  computed: mapState(["notebooks"]),
  created() {

  },
  methods: {
    createNotebook(){

    }
  }
}
</script>