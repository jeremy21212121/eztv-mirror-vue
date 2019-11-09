import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultsPerPage: 40,
    myShows: []
  },
  actions: {
  },
  mutations: {
    initializeStore(state) {
      // values being persisted to localStorage
      const toInitialize = [
        {
          name: 'rpp',
          stateName: 'resultsPerPage',
          type: 'number',
          validation: (n) => n > 19 && n < 51
        },
        {
          name: 'myShows',
          stateName: 'myShows',
          type: 'json',
          validation: () => true
        }
      ]
      toInitialize.forEach(init => {
        // get correct parser for type. If type is not recognized, it will return input type
        const parser = init.type === 'number' ? parseInt : init.type === 'json' ? JSON.parse : (x) => x
        try {
          const item = parser(localStorage.getItem(init.name));
          if (init.validation(item)) {
            state[init.stateName] = item
          }
        } catch (error) {
          // swallow error cuz localStorage is optional
        }
      })
      // try {
      //   const rpp = parseInt(localStorage.getItem('rpp'))
      //   if (rpp > 19 && rpp < 51) {
      //     state.resultsPerPage = rpp
      //   }
      // } catch (error) {
      //   // swallow error
      // }
    },
    setResultsPerPage(state, number) {
      state.resultsPerPage = number
      if (localStorage) {
        localStorage.setItem('rpp', number)
      }
    }
  }
})
