<template lang="">
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card class="pa-10">
        <v-card-title class="text-h5">
          Create new note  
        </v-card-title>
        <div class="ma-2 d-flex justify-center flex-column">
        <v-subheader>Select or create a Notebook</v-subheader>
        <v-card class="grey darken-3 pa-2 d-grid gutters">
        <v-list>
          <v-list-item-group
            v-model="selectedNotebookIndex"
            color="primary"
          >
            <v-list-item
              v-for="(notebook, i) in items"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="notebook"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
          <v-text-field
            v-if="newNotebookInput.active"
            v-model="newNotebookInput.value"
            label="Add a title"
            solo
            clearable
          >
          <template v-slot:append>
          <v-btn 
            elevation="8"
            @click="addNewNotebook"
            >
            Create
          </v-btn>
          </template>
          </v-text-field>
          <v-btn 
            block
            small
            elevation="8"
            @click="handleNewNotebookInput"
            >
            <v-icon small dark>
              mdi-plus
            </v-icon>
          </v-btn>
          </v-card>
        <v-subheader>Add a title</v-subheader>
        <v-text-field
          type="text"
          rounded
          placeholder="Title"
          outlined
          v-model="title"
        ></v-text-field>
          <v-btn 
          rounded
          x-large
          secondary
          color="teal"
          elevation="8"
          @click="createNewNote"
          >
          CREATE NEW NOTE
          </v-btn>
        <v-btn
          class="mt-2"
          rounded
          large
          elevation="10"        
          block
          @click="$emit('handle-note-dialog')"
        >
        DISMISS</v-btn>
        </div>
        <v-card-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script>
import { mapState, } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "newNoteDialoge",
  props: {
    dialog: Boolean,
  },
  data: () => ({
    title: "",
    selectedNotebook: {},
    selectedNotebookIndex: 0,
    items:[],
    newNotebookInput:{
      active: false,
      value: ""
    },


  }),
  computed: {
    ...mapState(["notebooks", "user"]),
    },
  created() {
      this.notebooks.notebook ? this.items.push(this.notebooks.notebook) : this.items.push("Notes")
      this.selectedNotebook = this.items[this.selectedNotebookIndex]
    },
  watch:{
    selectedNotebookIndex(){
      this.selectedNotebook = this.items[this.selectedNotebookIndex]
    }
  },

  methods: {
    handleNewNotebookInput(){
      this.newNotebookInput.active = true
    },
    addNewNotebook(){
      this.items.push(this.newNotebookInput.value)
      this.newNotebookInput.active = false
    },
    createNewNote(){
      let id = uuidv4();
      this.$store.dispatch("createNewNote", {id: id, user_id: this.user.id, title: this.title, notebook: this.selectedNotebook });
      this.$emit("handle-note-dialog")
      return this.$router.push(`/notes/${id}`)
    },
  }
}
</script>
<style lang="">
  
</style>