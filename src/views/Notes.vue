<template>
  <div class="notes">
      <v-card
        class="ma-5"
      >
        <v-list dense>
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
                <v-list-item-title v-text="journal"></v-list-item-title>
                {{note.journal}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="thougths"></v-list-item-title>
                {{note.thougths}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="Q&A"></v-list-item-title>
                {{note.qa}}
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title v-text="musts"></v-list-item-title>
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
    cards: [],
  }),
  computed: mapState(["notes"]),
  
  created() {
  },
  methods: {

  }
}
</script>