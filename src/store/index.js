import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsPerPage: 40
  },
  actions: {
    setResultsPerPage({ commit }, number) {
      commit('setResultsPerPage', number)
    }
  },
  mutations: {
    setResultsPerPage(state, number) {
      state.resultsPerPage = number
    }
  }
})
