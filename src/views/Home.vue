<template>
  <v-container fluid>
  <div v-if="!notes"  full-width class="d-flex flex-column" >
  <div class="text-h2 text-center display-4" v-text="'No notes yet'"></div> 
    <v-img
        lazy-src="https://i.imgur.com/U3vTGjX.png"
        max-height="400"
        max-width="400"
        src="https://i.imgur.com/U3vTGjX.png"
        class="mx-auto"
      ></v-img>
  </div>
  <div v-else >
    <v-row dense>
      <v-col
        v-for="note in notes"
        :key="note.id"
        lg="4"
        md="6" 
        sm="12"
      >
      <v-card
      min-height="300"
      @click="goToNote(note)"
      >
        <v-card-title v-text="note.title"></v-card-title>
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
          <div class="grey--text ms-4">
            {{note.journal}}
          </div>
        </v-row>
        </v-card-text>
      </v-card>
        </v-col>
      </v-row>
  </div>
  </v-container>
</template>

<script>
import { mapState, } from 'vuex'

export default {
  name: "Home",
  data: () => ({
  }),
  computed: {
    ...mapState(["notes", "user"]),
    },
      created() {
  },
  methods: {
    goToNote(note){
      console.log(note);
      this.$router.push(`/notes/${note.id}`)
    }
  }
}
</script>
