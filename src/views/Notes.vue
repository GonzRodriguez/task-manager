<template>
  <div class="notes" >
  <v-container fluid>
    <v-row  class="ma-1">
      <v-col>
        <notebooks-list/>

      </v-col>
    </v-row>

  </v-container>
    </div>
</template>

<script>
import NotebooksList from "../components/NotebooksList"
export default {
  name: "notes",
  components: {NotebooksList},
  data: () => ({
  }),

  
  created() {
  },
}
</script>