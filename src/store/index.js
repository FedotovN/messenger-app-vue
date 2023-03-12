import { createStore } from 'vuex'
import { authModule } from './auth'
import { contacts } from './contacts'
import { chat } from './chat'
export default createStore({
  state: {
    adaptiveView: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule, contacts, chat
  }
})
