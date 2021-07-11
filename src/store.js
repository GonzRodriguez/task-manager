import Vue from 'vue';
import Vuex from 'vuex';
import { supabase } from './supabase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    tasks: {
      urgent: [],
      important: [],
      delegate: [],
      delete: [],
    },
    notes: []
  },
  mutations: {
    setUser(state, user){
      console.log(user);
      state.user = user
    },
    setTasks(state, data){
      const [...tasks] = data
      console.log(tasks);
      tasks.map(task => {
        state.tasks[task.action].push(task)
      })
    },
    setNotes(state, notes){
      state.notes = notes
    }
  },
  actions: {
    getUser(context){
      const user = supabase.auth.user()
      context.commit("setUser", user)
    },
    async getTasks(context){
      let { data } = await supabase
        .from('tasks')
        .select("*")
      context.commit("setTasks", data)
    },
    async getNotes(context) {
      let { data } = await supabase
        .from('notes')
        .select("*")
      context.commit("setNotes", data)
    }
  },
  getters: {},
});