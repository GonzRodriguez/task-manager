<template>
  <div class="tasks">
  <div v-if="!tasks"  full-width class="d-flex flex-column" >
    <div class="text-h2 text-center display-4" v-text="'No notebooks yet'"></div> 
    <v-img
        lazy-src="https://i.imgur.com/U3vTGjX.png"
        max-height="400"
        max-width="400"
        src="https://i.imgur.com/U3vTGjX.png"
        class="mx-auto"
      ></v-img>
  </div>
  </div>
</template>

<script>
import { mapState, } from 'vuex'

export default {
  name: "tasks",
  data: () => ({
  }),
  computed: mapState(["tasks"]),
  
  created() {
  },
  methods: {

  }
}
</script>