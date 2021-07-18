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
  <v-container v-else-if="!query">
    <v-row v-for="(notebook, index) in notebooks" :key="index" no-gutters class="ma-1">
      <!-- <v-col cols="12" class="d-flex flex-row"> -->
        <v-col
        cols="2"
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
            {{notebook.toUpperCase()}}
          </v-sheet>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(note, i) in notes" :key="i" no-gutters > 
            <v-col cols="12" v-if="note.notebook === notebook">
              <v-list >
                  <v-sheet
                      :color="i % 2 == 0 ? 'grey darken-4' : 'grey darken-3'"
                      elevation="1"
                      outlined
                      >
                    <v-list-item dense link>
                      <v-col class="d-flex flex-row">
                        <v-col cols="3">
                        <div class="text-truncate"> {{note.title}} </div>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle class="text-truncate"> {{note.journal}} </v-list-item-subtitle>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle class="text-truncate"> {{note.qa}} </v-list-item-subtitle>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle class="text-truncate"> {{handleNoteTimestamp(note.inserted_at)}} </v-list-item-subtitle>
                        </v-col>
                      </v-col>
                    </v-list-item>
                  </v-sheet>
                </v-list>
              </v-col>
          </v-row>
        </v-col>
      <!-- </v-col> -->
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row no-gutters>
        <v-col
        cols="2"
        >
          <v-sheet
            class="pa-2"
            color="grey darken-2"
            elevation="1"
            min-height="100"
            min-width="100"
            outlined
            >
            {{notebook.toUpperCase()}}
          </v-sheet>
        </v-col>
        <v-col cols="10">
          <v-row v-for="(note, i) in notes" :key="i" no-gutters > 
            <v-col cols="12">
              <v-list >
                  <v-sheet
                      :color="i % 2 == 0 ? 'grey darken-4' : 'grey darken-3'"
                      elevation="1"
                      outlined
                      >
                    <v-list-item dense link>
                      <v-col class="d-flex flex-row">
                        <v-col cols="3">
                        <div class="text-truncate"> {{note.title}} </div>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle class="text-truncate"> {{note.journal}} </v-list-item-subtitle>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle ist-item-subtitleclass="text-truncate"> {{note.qa}} </v-list-item-subtitle>
                        </v-col>
                        <v-col cols="3">
                        <v-list-item-subtitle class="text-truncate"> {{note.inserted_at}} </v-list-item-subtitle>
                        </v-col>
                      </v-col>
                    </v-list-item>
                  </v-sheet>
                </v-list>
              </v-col>
          </v-row>
        </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import { mapState, } from 'vuex'
import moment from "moment"

export default {
  name: "notebooks",
  data: () => ({
    query: false,
    notebook: "",
    filteredNotes: [],
  }),
  computed: mapState(["notebooks", "notes"]),
  created() {
    if(this.$route.query.notebook){
      return this.query = true
    }
    console.log(this.query);
    return this.query = false
  },
  watch: {
    notebooks(){
      if(this.query){
        this.filteredNotes = this.notes.filter((n) => n.notebook === this.$route.query.notebook)
        if (this.filteredNotes.length) this.notebook = this.$route.query.notebook
        console.log(this.filteredNotes);
        console.log(this.notebooks);
        // const [...ntbs] = this.notebooks
        // this.filteredNotebook = ntbs.filter(nb => nb === this.$route.query.notebook)
      }
    }
    },
  methods: {
    handleNoteTimestamp(time){
      return moment(time).format("L")
    }
  }
}
</script>