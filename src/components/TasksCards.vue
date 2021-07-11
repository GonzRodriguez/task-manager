<template >
  <div id="tasksCards">
     <v-row>
      <v-col 
      v-for="tab in tabs"
      :key="tab.title"
      md="6" 
      sm="12"
      >
        <v-card class="tasks" :id="tab.list" >
          <v-card-title class="mb-0 pb-0">{{tab.title}}</v-card-title>
          <v-card-text class="text--secondary text-caption font-italic pb-1">
            {{tab.subtitle}}
          </v-card-text>
            <ul>
              <v-card-text>
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
              </v-card-text>
            </ul>
            <v-btn block @click="$emit('add-task', {list:tab.list, urgency: tab.urgency})"><v-icon small dark> mdi-plus-thick </v-icon> </v-btn>         
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "tasksCards",
  props: {
    tasks: Object  
  },
  data: () => ({
    tabs: [
      {title: "Urgent & Important", subtitle: "Do Immidiately", list: "urgent", urgency: 3},
      {title: "Important. Not urgent", subtitle: "To Do As Soon As Possible", list: "important", urgency: 2 },
      {title: "Urgent but Not Important", subtitle: "Delegate", list: "delegate" , urgency: 1 },
      {title: "Not Urgent & Not Important", subtitle: "Delete", list: "delete", urgency: 0} 
      ]
  }),
  created() {
  }
}
</script>
<style lang="css" scoped>
  #urgent {
  border: solid rgb(204, 57, 57) ;
  }
  #important {
  border: solid rgb(204, 187, 57) ;
    
  }
  #delegate {
  border: solid rgb(94, 204, 57) ;
    
  }
  #delete {
  border: solid rgb(57, 204, 148) ;
  }
  .task-input{
    width: 100% ;
    border: 0 none white;
    color: white;
    outline: none;
  }
</style>