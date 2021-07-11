<template>
  <div id="note">
    <v-container fluid >
    <div class="d-flex justyfy-end mx-2">
      <div class="text-caption text--disabled">{{saving}}</div>
    </div>
    <v-row >
      <v-col  >
      <v-card class="journal">
      <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Journal</v-card-subtitle>
      <textarea name="Text1" cols="40" class="journal-textarea" rows="8" v-model="value.journal" @keyup="handleUpload"></textarea>
      </v-card>
      </v-col>
    </v-row>
    <div class="moveUpwardsAddShadow dark">
   <TasksCard :tasks="tasks" @add-task="addTask" @update-task="updateTask" @delete-task="deleteTask"></TasksCard>
    <v-row>
      <v-col lg="6" md="6" sm="12" fluid>
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Q&A</v-card-subtitle>
        <textarea name="Text1" cols="40" class="journal-textarea" rows="4" @keyup="handleUpload"></textarea>
      </v-card>
      </v-col>
      <v-col lg="6" md="6" sm="12">
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Final Thoughts</v-card-subtitle>
        <textarea name="Text1" cols="40" class="journal-textarea" rows="4" @keyup="handleUpload"></textarea>
      </v-card>
      </v-col>
      <v-col sm="12">
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">6 Musts for Tomorrow</v-card-subtitle>
        <v-card-text>
        <ul>
          <div v-for="(must, index) in value.musts" :key="index">
            <li> <input type="text" v-model="value.musts[index]" class="musts-input" @keyup="handleUpload"/></li>
          </div>
        </ul>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
    </div>
     </v-container>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import TasksCard from '../components/TasksCards.vue'

export default {
  components: { TasksCard },
  name: "notes",
  data: () => ({
    user: null,
    value: {
      journal: "",
      qa: "",
      thoughts: "",
      musts:[
        "", "", "", "", "", "" 
      ]
      },
      tasks: {
        urgent: [],
        important: [],
        delegate: [],
        delete: [],
      },
      saving: "Saved"
  }),
  async beforeCreate(){
      let { data, error } = await supabase
       .from('tasks')
       .select("*")
       .eq("note_id", this.$route.params.id)
       const [...tasks] = data
       tasks.map(task => {
         this.tasks[task.action].push(task)
       })
      console.log(error, data);
  },
  async created(){
      this.user = this.$store.state.user;
     let { data, error } = await supabase
       .from('notes')
       .select("*")
       .eq("id", this.$route.params.id)
       console.log(error);
       const {...note} = data[0]
      this.value.journal = note.journal
      this.value.qa = note.qa
      this.value.thoughts = note.thoughts
      this.value.musts = note.musts
  },
  methods: {
     handleUpload(){
      this.saving = "Saving..."
      let timer;
      const waitTime = 3000;
      clearTimeout(timer);
      timer = setTimeout(async () => {
        let { data, error } = await supabase
          .from('notes')
          .update({ journal: this.value.journal, qa: this.value.qa, thoughts: this.value.thoughts, musts: this.value.musts})
          .match({id: this.$route.params.id})
          if (data) this.saving = "Saved" 
          if (error) this.saving = "Something went wrong, your note isn't saved"
        }, waitTime);
    },
    async addTask(params){
      const {list, urgency} = params
      const { data, error } = await supabase
      .from('tasks')
      .insert({user_id: this.user.id, value: "", note_id: this.$route.params.id, action: list, urgency: urgency})
      console.log(error, data);
      this.tasks[list].push({value: "", id: data[0].id});
    },
    updateTask(params){
      const {list, id, value} = params
      this.saving = "Saving..."
      let timer;
      const waitTime = 3000;
      clearTimeout(timer);
      timer = setTimeout(async () => {
      const { data, error } = await supabase
      .from('tasks')
      .update({ value: value,  action: list })
      .eq("id", id)
      console.log(error, data);
        if (data) this.saving = "Saved" 
        if (error) this.saving = "Something went wrong, your note isn't saved"
      }, waitTime);
    },
    async deleteTask(params){
      const {list, id} = params
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({id: id})
      console.log(error, data);
      this.tasks[list] = this.tasks[list].filter(t => t.id !== id)
      return
    }
  }
}
</script>

<style lang="css" >

  .journal{
    padding-bottom: 3rem;
    background-repeat: repeat;
    background-image: url("https://www.transparenttextures.com/patterns/dark-circles.png");
}
  .journal-textarea{
    width: 100% ;
    border: 0 none white;
    color: white;
    padding-inline: 1.2rem;
    outline: none;
    resize: none;
  }
  .journal-textarea:focus-visible {
    outline: none;
}
  .musts-input{
    width: 100% ;
    border: 0 none white;
    color: white;
    outline: none;
  }
  .journal-textarea::placeholder {
    color: rgb(209, 209, 209);
  }
  .moveUpwardsAddShadow{
    transform: translate(0, -3rem);
    box-shadow: 10px -5px 30px 30px #121212;
    background-color:#121212;
  }
</style>