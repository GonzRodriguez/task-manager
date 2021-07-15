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
      <textarea name="Text1" cols="40" class="journal-textarea" rows="8" v-model="value.journal" @keyup="autoUpload({journal: value.journal})"></textarea>
      </v-card>
      </v-col>
    </v-row>
    <div class="moveUpwardsAddShadow dark">
   <TasksCard :inputs="inputs" @add-task="addTask" @update-task="updateTask" @delete-task="deleteTask"></TasksCard>
    <v-row>
      <v-col lg="6" md="6" sm="12" fluid>
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Q&A</v-card-subtitle>
        <textarea name="Text1" cols="40" class="journal-textarea" rows="4" v-model="value.qa" @keyup="autoUpload({qa: value.qa})"></textarea>
      </v-card>
      </v-col>
      <v-col lg="6" md="6" sm="12">
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Final Thoughts</v-card-subtitle>
        <textarea name="Text1" cols="40" class="journal-textarea" rows="4" v-model="value.thoughts" @keyup="autoUpload({thoughts:value.thoughts})"></textarea>
      </v-card>
      </v-col>
      <v-col sm="12">
      <v-card>
        <v-card-subtitle class="text-lg-h6 mb-0 pb-0">6 TODO'S for Tomorrow</v-card-subtitle>
        <v-card-text>
        <ul>
          <div v-for="(must, index) in value.musts" :key="index">
            <li> <input type="text" v-model="value.musts[index]" class="musts-input" @keyup="autoUpload({musts: value.musts})"/></li>
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
import { mapState, } from 'vuex'

export default {
  components: { TasksCard },
  name: "notes",
  data: () => ({
    value: {
      journal: "",
      qa: "",
      thoughts: "",
      musts: Array(6),
      },
      saving: "Saved",
      inputs:{
        urgent: [],
        important: [],
        delegate: [],
        delete: []
      }
  }),
    computed: {
    ...mapState(["notes", "user", "tasks"]),
    },
  created(){
    this.tasks.forEach(task => {
      this.inputs[task.action].push(task)
    })
  },
  updated(){
    this.$store.dispatch("getTasks", this.user.id)
  },
  methods: {
     autoUpload(toUpdate){
      this.saving = "Saving..."
      let timer;
      const waitTime = 3000;
      console.log(toUpdate);
      clearTimeout(timer);
      timer = setTimeout(async () => {
        let { data, error } = await supabase
          .from('notes')
          .update(toUpdate)
          .match({id: this.$route.params.id})
          if (data) this.saving = "Saved" 
          if (error) this.saving = "Something went wrong, your note isn't saved"
          console.log(data);
        }, waitTime);
    },
    async addTask(params){
      const {list, urgency} = params
      const { data, error } = await supabase
      .from('tasks')
      .insert({user_id: this.user.id, value: "", note_id: this.$route.params.id, action: list, urgency: urgency})
      console.log(error, data);
      if (error) this.saving = "Something went wrong, your note isn't saved"
      this.inputs[list].push({value: "", id: data[0].id});
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
      const {value, list, urgency} = params
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({note_id: this.$route.params.id, value: value, urgency: urgency })
      console.log(error, data);
      this.inputs[list] = this.inputs[list].filter(t => t.value !== value)
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