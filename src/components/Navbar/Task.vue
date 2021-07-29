<template lang="">
  <div class="mx-4 py-0 d-flex justify-space-between">
    <v-card-text v-if="!task.completed" :class="lineThrough || 'ma-0 pa-0 text-left'">
      {{task.value}}
      </v-card-text>
      <v-checkbox class="ma-0 py-0 " color="tile" v-if="!task.completed" dense hide-details v-model="completed"></v-checkbox>
  </div>
</template>
<script>
import { supabase } from '../../supabase'

export default {
  name: "Task",
  props: {
    task: Object
  },
  data: () => ({
  lineThrough: false,
  completed: false
  }),
  watch: {
    async completed(){
      this.lineThrough = this.completed 
      ?
      'ma-0 pa-0 text-left text--disabled text-decoration-line-through' 
      :
      false
      const { error } = await supabase
        .from('tasks')
        .update({ completed: this.completed })
        .match({ id: this.task.id })
        error && console.log(error);
    }
  }
}
</script>
<style lang="">
  
</style>