<template>
  <div id="note">
    <v-container fluid >
      <v-row justify="space-between">
        <v-col sm="2">
          <div class="text-caption text--disabled">{{saving}}</div>
        </v-col>
        <v-col sm="3" class="d-flex justify-end">
          <div class="text-caption text--disabled"><router-link :to="{name: 'notebooks', query: {notebook: notebook}}">{{notebook}}</router-link></div>
          <div>&nbsp;·&nbsp;</div>
          <div class="text-caption text--disabled">{{title}}</div>
        </v-col>
      </v-row>
    <v-container fluid class="textureBg grey darken-4 rounded">
    <v-row >
      <v-col >
        <v-card color="transparent" flat>
          <v-textarea solo flat class="text-caption text-md-body-1 journalFont" placeholder="Journal" background-color="transparent" auto-grow color="grey" name="Text1" cols="40" rows="8" v-model="value.journal" @keyup="autoUpload({journal: value.journal})"></v-textarea>
        </v-card>
      </v-col>
    </v-row>
    <v-sheet
      elevation="24"
      dark
    >
      <TasksCard :inputs="inputs" @add-task="addTask" @save-task="saveTask" @delete-task="deleteTask" @complete-task="completeTask"></TasksCard>
        <v-row>
          <v-col cols="12"  md="6" sm="12" fluid>
          <v-card color="grey darken-4" class="lightTexture" flat>
            <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Q&A</v-card-subtitle>
            <v-card-text>
            <v-textarea solo flat class="text-caption text-md-body-1"  background-color="transparent" auto-grow color="grey" name="Text1" cols="40" rows="4" v-model="value.qa" @keyup="autoUpload({qa: value.qa})"></v-textarea>
            </v-card-text>
          </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12">
          <v-card color="transparent" class="lightTexture" flat>
            <v-card-subtitle class="text-lg-h6 mb-0 pb-0">Final Thoughts</v-card-subtitle>
            <v-card-text>
            <v-textarea solo flat class="text-caption text-md-body-1"  background-color="transparent" auto-grow color="grey" name="Text1" cols="40" rows="4" v-model="value.thoughts" @keyup="autoUpload({thoughts:value.thoughts})"></v-textarea>
            </v-card-text>
          </v-card>
          </v-col>
        </v-row>
    </v-sheet>
          <v-col cols="12" sm="12"  >
          <v-card color="transparent"  flat>
            <v-card-subtitle class="text-lg-h6 mb-0 pb-0">6 Things to do Tomorrow</v-card-subtitle>
            <v-card-text>
            <ul>
              <div v-for="(must, index) in value.musts" :key="index">
                <li> <v-text-field type="text" max-height="15px" v-model="value.musts[index]" hide-details solo flat dense class="text-caption text-md-body-1 " background-color="transparent" color="grey" @keyup="autoUpload({musts: value.musts})"/></li>
              </div>
            </ul>
            </v-card-text>
          </v-card>
          </v-col>
     </v-container>
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
    note: "",
    notebook: "",
    title: "",
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
      },
    timer: ""
  }),
    computed: {
    ...mapState(["notes", "user", "tasks"]),
    },
  created(){
    this.tasks.forEach(task => {
      if(task.note_id === this.$route.params.id) this.inputs[task.action].push(task)
    })
  },
  watch: {
    notes(){
    this.note = this.notes.filter(n => n.id === this.$route.params.id)
    this.value = {
      journal: this.note[0].journal || this.value.journal,
      qa: this.note[0].qa || this.value.qa,
      thoughts: this.note[0].thoughts || this.value.thoughts,
    },
    this.note[0].musts.length == 6 ? this.value.musts = this.note[0].musts : this.value.musts = Array(6),
    this.notebook = this.note[0].notebook,
    this.title = this.note[0].title
    }
  },
  updated(){
    this.$store.dispatch("getTasks", this.user.id)
  },
  methods: {
     autoUpload(toUpdate){
      this.saving = "Saving..."
      const waitTime = 3000;
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        let { data, error } = await supabase
          .from('notes')
          .update(toUpdate)
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
      if (error) this.saving = "Something went wrong, your note isn't saved"
      this.inputs[list].push({value: "", id: data[0].id});
    },
    saveTask(params){
      const {list, id, value} = params
      this.saving = "Saving..."
      var timer;
      const waitTime = 3000;
      clearTimeout(timer);
      timer = setTimeout(async () => {
      const { data, error } = await supabase
      .from('tasks')
      .update({ value: value,  action: list })
      .eq("id", id)
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
    },
    async completeTask(arg){
    const { data, error } = await supabase
      .from('tasks')
      .update()
      .match({note_id: this.$route.params.id, completed: arg })
      console.log(error, data);
      return
    }
  }
}
</script>

<style lang="css" >
  .textureBg{
    background-repeat: repeat;
    background-image: url("https://www.transparenttextures.com/patterns/dark-circles.png");
  }
  .lightTexture{
    background-repeat: repeat;
    background-image: url("https://www.transparenttextures.com/patterns/dark-denim.png");
  }
  .botomInsetShadow{
    box-shadow: inset 0px -37px 20px -10px #1a1a1a;
  }
  textarea{
    font-family: 'Bree Serif', serif;
  }

</style>