<template>
    <div class="notes" >
      <v-card
        class="ma-5"
      >
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
            @click="createNote"
            >
            CREATE NEW NOTE
            </v-btn>
        </div>
        <v-list dense v-else>
          <v-subheader>NOTES</v-subheader>
          <v-list-item-group
            v-model="notes"
            color="primary"
          >
            <v-list-item
              v-for="(note, i) in notes"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="'journal'"></v-list-item-title>
                {{note.journal}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'thougths'"></v-list-item-title>
                {{note.thougths}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'Q&A'"></v-list-item-title>
                {{note.qa}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="'musts'"></v-list-item-title>
                {{note.musts}}
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
</template>

<script>
  import { mapState, } from 'vuex'

export default {
  name: "notes",
  data: () => ({
  }),
  computed: mapState(["notes"]),
  
  created() {
  },
  methods: {

  }
}
</script>