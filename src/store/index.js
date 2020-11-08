import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    resultsPerPage: 40,
    myShows: [],
  },
  mutations: {
    initializeStore(state) {
      // values being persisted to localStorage
      const toInitialize = [
        {
          name: "rpp",
          stateName: "resultsPerPage",
          type: "number",
          validation: (n) => n > 19 && n < 51,
        },
        {
          name: "myShows",
          stateName: "myShows",
          type: "json",
          validation: (val) => Array.isArray(val) && val.every(str => typeof str === 'string'),
        },
      ];
      toInitialize.forEach((init) => {
        // get correct parser for type. If type is not recognized, it will return input unchanged
        const parser =
          init.type === "number"
            ? parseInt
            : init.type === "json"
            ? JSON.parse
            : (x) => x;
        try {
          const item = parser(localStorage.getItem(init.name));
          if (init.validation(item)) {
            state[init.stateName] = item;
          } else {
            // is null or invalid state. remove from localStorage to be sure.
            localStorage.removeItem(init.name)
          }
        } catch (error) {
          // swallow error cuz localStorage is optional
          localStorage.removeItem(init.name)
        }
      });
    },
    setResultsPerPage(state, number) {
      state.resultsPerPage = number;
      try {
        localStorage.setItem("rpp", number);
      } catch (error) {
        console.log("localStorage not supported");
      }
    },
    addToMyShows(state, imdbId) {
      // check to see if it already exists in myShows
      if (!state.myShows.includes(imdbId)) {
        state.myShows.push(imdbId);
        try {
          localStorage.setItem("myShows", JSON.stringify(state.myShows));
        } catch (error) {
          console.log("localStorage not supported");
        }
      }
    },
  },
  actions: {},
});
