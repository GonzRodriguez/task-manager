<template>
  <div class="tasks">
    
  </div>
</template>

<script>
  import { mapState, } from 'vuex'

export default {
  name: "tasks",
  data: () => ({
    cards: [],
  }),
  computed: mapState(["tasks"]),
  
  created() {
  },
  methods: {

  }
}
</script>