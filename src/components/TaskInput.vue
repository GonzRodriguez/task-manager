<template>
  <div>
    <li v-for="(task, index) in tasks[tab.list]" :key="index">
      <div class="d-flex d-column">
        <input 
        type="text " 
        v-model="task.value"
        class="task-input" 
        @keyup="$emit('update-task', {list: tab.list, value: task.value, id: task.id, urgency: tab.urgency})"
        @keyup.enter="$emit('add-task', {list: tab.list, urgency: tab.urgency})"/>
        <v-btn
        id="closeButton"
        icon 
        @click="$emit('delete-task', {id: task.id, list: tab.list})"
        ><v-icon dark small>mdi-close</v-icon></v-btn>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  name: "TaskInput",
  props: {
    tasks: Object,
    tabs: Object
  },
}
</script>
<style lang="css" scoped>
    .task-input{
    width: 100% ;
    border: 0 none white;
    color: white;
    outline: none;
  }
</style>