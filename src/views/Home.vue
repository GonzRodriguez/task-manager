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
        cols="12"
        lg="3"
        md="4"
        sm="12"
      >
      <v-card
      class="note"
      outlined
      @click="goToNote(note)"
      >
      <v-row dense>
        <v-col
          cols="12"
          sm="12"
        >
          <v-card-title v-text="note.title"></v-card-title>
          <v-card-text>
            <div class=" text--secondary text-truncate">
              {{note.journal}}
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text--disabled">
              Created: {{handleNoteTimestamp(note.inserted_at)}}
            </div>
          </v-card-text>
        </v-col>
        </v-row>
      </v-card>
      </v-col>
    </v-row>
  </div>
  </v-container>
</template>

<script>
import { mapState, } from 'vuex'
import moment from "moment"

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
    },
    handleNoteTimestamp(time){
      return moment(time).fromNow()
    },
    is24h(note){
      const d = new Date(note.inserted_at);
      const newDate = new Date()
      const noteDate = d.getTime()
      const is24 = newDate.setTime(newDate.getTime() - (1000 * 60 * 24))
      if ( noteDate < is24 ) return true
      return false
    }
  }
}
</script>
<style lang="css" scoped>
  .note{
    background-repeat: repeat;
    background-image: url("https://www.transparenttextures.com/patterns/dark-circles.png");
  }
</style>