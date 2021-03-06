import Vue from 'vue';
import Vuex from 'vuex';
import { supabase } from './supabase';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    user: supabase.auth.user(),
    alert: {message: "", type: "info", color: "blue", isActive: false},
    loading: false,
    tasks: [],
    notes: [],
    notebooks: [],
  },
  mutations: {
    setUser(state){
      state.user = supabase.auth.user()
    },
    setTasks(state, data){
      const [...tasks] = data
      state.tasks = tasks
    },
    setNotebooks(state, data){  
      const [...notebooks] = data
    const filterNotebooks = [];
    notebooks.forEach(note => {
      filterNotebooks.push(note.notebook)
      state.notebooks = new Set(filterNotebooks)
    })
    
    },
    setNotes(state, data){
      const [...notes] = data
      state.notes = notes
    },
    setAlert(state, custom){
      state.alert = {
        message: custom.message, 
        type: custom.type || state.alert.type,
        color: custom.color || state.alert.color,
        isActive: true
      }
      setTimeout(() => {
        state.alert.isActive = false
      }, 3200)
    },
    loading(state, data){
      state.loading = data
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
  },
  actions: {
    async getTasks(context, id){
      if (id){let { data, error } = await supabase
        .from('tasks')
        .select("*")
        .eq("user_id", id)
      error && console.log(error);
      error && context.commit("setAlert", {message: error.message, color: "red", type: "error" })
      data && context.commit("setTasks", data)}
    },
    async getNotes(context, id) {
      let { data, error } = await supabase
        .from('notes')
        .select("*")
        .eq("user_id", id)
      error && console.log(error);
      error && context.commit("setAlert", {message: error.message, color: "red", type: "error" })
      data && context.commit("setNotes", data)
    },
    async getNotebooks(context, id) {
      let { data, error } = await supabase
        .from('notes')
        .select("notebook")
        .eq("user_id", id)
      data && context.commit("setNotebooks", data)
      error && console.log(error);
      error && context.commit("setAlert", {message: error.message, color: "red", type: "error" })

    },
    async createNewNote(context, note){
      const { data, error } = await supabase
        .from('notes')
        .insert([
          { id: note.id, user_id: this.state.user?.id, title: note.title, notebook: note.notebook},
      ])
      error && context.commit("setAlert", {message: error.message, color: "red", type: "error" })
      data && context.commit("setAlert", {message: `New note ${data.title || ""} has been created`, color: "green", type: "success"})

      console.log(data,error);
    },
      async signUpWhitGithub(context) {
        context.commit("loading", true)
        const { user, error } = await supabase.auth.signIn({
          provider: "github"
        })
        console.log(user);
        if (error) context.commit("setAlert", { message: error.message, type: "error", color: "red" })
        if (user){
          context.commit("setUser", user)
        }
    },
    async signUp(context, credentials) {
      const { user, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      })
      if (error) context.commit("setAlert", { message: error.message, type: "error", color: "red" })
      console.log(error);
      if (!error){
        return context.commit("setUser", user)
      }
    },
    async logIn(context, credentials) {
      const { user, error } = await supabase.auth.signIn({
        email: credentials.email,
        password: credentials.password
      })
      if (error) return context.commit("setAlert", { message: error.message, type: "error", color: "red" })
      console.log(error);
      if (!error){
        return context.commit("setUser", user)
      }
    }
  },

  plugins: [createPersistedState()]
});