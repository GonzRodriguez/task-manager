<template>
  <v-container fluid>
  <div v-if="!notes"  full-width class="d-flex flex-column" >
  <div class="text-h2 text-center display-4" v-text="'No notes yet'"></div> 
  <div class="text-h2 text-center display-4" v-text="'vale estamos aqui'"></div> 
    <v-img
        lazy-src="https://i.imgur.com/U3vTGjX.png"
        max-height="400"
        max-width="400"
        src="https://i.imgur.com/U3vTGjX.png"
        class="mx-auto"
      ></v-img>
  </div>
  <div v-else >
    <div class="list">
    <v-row dense class="d-flex d-row overflow-x-auto">
      <v-col
        class="d-flex overflow-x-scroll my-5"
      >
        <v-card
        v-for="note in notes"
        :key="note.id"
        min-width="300"
        max-width="300"
        class="note"
        outlined
        @click="goToNote(note)"
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
        </v-card>
      </v-col>
    </v-row>
    </div>
  </div>
  </v-container>
</template>

<script>
import { mapState, } from 'vuex'
import moment from "moment"

export default {
  name: "Home",

  computed: {
    ...mapState(["notes", "user"]),
    },
  methods: {
    goToNote(note){
      console.log(note);
      this.$router.push(`/notes/${note.id}`)
    },
    handleNoteTimestamp(time){
      return moment(time).fromNow()
    },
    // is24h(note){
    //   const d = new Date(note.inserted_at);
    //   const newDate = new Date()
    //   const noteDate = d.getTime()
    //   const is24 = newDate.setTime(newDate.getTime() - (1000 * 60 * 24))
    //   if ( noteDate < is24 ) return true
    //   return false
    // }
  }
}
</script>
<style lang="css" scoped>
  .note{
    background-repeat: repeat;
    background-image: url("https://www.transparenttextures.com/patterns/dark-circles.png");
    box-shadow: -1rem 0 3rem #000;
    transition: .2s;
  }
  .note:hover{
    transform: translateY(-1rem);
  }
  .note:hover~.note{
    transform: translateX(1.5rem);
  }
  .note:not(:first-child){
    margin-left: -1.5rem;
  }
  .list{
    background-color: #000;
    border-radius: 5px;
    padding: .5rem
  }
</style>