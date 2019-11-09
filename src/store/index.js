import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsPerPage: 40
  },
  actions: {
  },
  mutations: {
    initializeStore(state) {
      try {
        const rpp = parseInt(localStorage.getItem('rpp'))
        if (rpp > 19 && rpp < 51) {
          state.resultsPerPage = rpp
        }
      } catch (error) {
        // swallow error
      }
    },
    setResultsPerPage(state, number) {
      state.resultsPerPage = number
      if (localStorage) {
        localStorage.setItem('rpp', number)
      }
    }
  }
})
