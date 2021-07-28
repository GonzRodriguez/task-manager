<template>
  <div>
    <v-row v-for="(note, i) in notes" :key="i" no-gutters > 
      <v-col cols="12">
        <v-list >
        <v-sheet
            :color="i % 2 == 0 ? 'grey darken-4' : 'grey darken-3'"
            elevation="1"
            outlined
            >
          <v-list-item 
          dense
          link 
          @click="navigateTo(note.id)"
          >
            <v-col class="d-flex flex-row pa-0 ma-0" >
              <v-col cols="2" class="pa-0 ma-0">
              <div class="text-truncate"> {{note.title}} </div>
              </v-col>
              <v-col cols="1" class="pa-0 ma-0">
              <v-list-item-subtitle class="text-truncate"> in: {{note.notebook}} </v-list-item-subtitle>
              </v-col>
              <v-col cols="6" class="pa-0 ma-0">
              <v-list-item-subtitle class="text-truncate"> {{note.journal}} </v-list-item-subtitle>
              </v-col>
              <v-col cols="2" class="pa-0 ma-0">
              <v-list-item-subtitle class="text-truncate"> {{note.qa}} </v-list-item-subtitle>
              </v-col>
              <v-col cols="1" class="pa-0 ma-0">
              <v-list-item-subtitle class="text-truncate"> {{handleNoteTimestamp(note.inserted_at)}} </v-list-item-subtitle>
              </v-col>
            </v-col>
          </v-list-item>
        </v-sheet>
        </v-list>
      </v-col>
    </v-row>
    </div>
</template>
<script>
import { mapState, } from 'vuex'
import moment from "moment"

export default {

    computed: mapState(["notes"]),
    methods: {
    handleNoteTimestamp(time){
      return moment(time).format("L")
    },
    navigateTo(id){
      if (this.$route.path !== `/notes/${id}`) {
        this.$router.push({path: `/notes/${id}`}).catch((error) => {
          console.log(error)
        });
      }
    },
  }
}
</script>
<style lang="">
  
</style>