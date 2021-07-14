import Vue from 'vue';
import Vuex from 'vuex';
import { supabase } from './supabase';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    user: supabase.auth.user(),
    alert: {message: "", type: "info", color: "blue", isActive: false},
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
      state.tasks = notebooks
      console.log(state.notebooks)
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
      }, 3000)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
  },
  actions: {
    async getTasks(context, id){
      let { data } = await supabase
        .from('tasks')
        .select("*")
        .eq("user_id", id)
      context.commit("setTasks", data)
    },
    async getNotes(context, id) {
      let { data } = await supabase
        .from('notes')
        .select("*")
        .eq("user_id", id)
      context.commit("setNotes", data)
    },
    async getNotebooks(context, id) {
      let { data } = await supabase
        .from('notebooks')
        .select("*")
        .eq("user_id", id)
      context.commit("setNotebooks", data)
    },
    async signUp(context, credentials) {
      const { user, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      })
      if (error) context.commit("setAlert", { message: error.message })
      context.commit("setUser", user)
      console.log(user);
    },
    async logIn(context, credentials) {
      console.log(credentials);
      const { user, error } = await supabase.auth.signIn({
        email: credentials.email,
        password: credentials.password
      })
      if (error) context.commit("setAlert", { message: error.message })
      context.commit("setUser", user)
      console.log(user);
    }
  },

  plugins: [createPersistedState()]
});