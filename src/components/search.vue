<template>
  <section class="search">
    <button title="Settings" @click="() => settings.active = !settings.active">
      <img
        class="settings"
        src="data:image/png;base64,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"
        alt="settings icon"
        :class="{ active: settings.active }"
      >
    </button>
    <form
      @submit.prevent="()=>{}"
      class="search-form"
    >
      <input type="search" placeholder="search" aria-label="search by name" v-model="searchValue" required>
      <button type="submit" @click.prevent="fetchOmdb(searchValue, results)" aria-label="submit search">
        <img
          aria-hidden="true"
          class="searchIcon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAABlBMVEUAAAABAQHKudIvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwUHAyQ+G+j5AAAAVElEQVQI12NgAAH7AwwM/z8wMD74wcB4yIKBuXkOAzPjHQZmhjMM7Aw5QMwDZIOwDANzgwwD4wGgmgcVDOxAPfz7DzDIszEw2AGNqQHiCiAuYIADANUEEYboY+TMAAAAAElFTkSuQmCC"
        >
      </button>
    </form>
    <form
      @submit.prevent="()=>{}"
      class="settings-form"
      :class="{ active: settings.active }"
    >
      <label for="rpp" id="rpp-label">Results per page:</label>
      <div class="setting">
        
        <datalist :id="settings.datalist.id">
          <option
            v-for="option in settings.datalist.options"
            :key="'option'+option"
            :value="option"
            :label="option"
          ></option>
        </datalist>
        <input
          v-model.number="resultsPerPage"
          :min="settings.min"
          :max="settings.max"
          :step="settings.step"
          :list="settings.datalist.id"
          type="range"
          name="rpp"
          id="rpp"
        >
      </div>
    </form>
    <ol
      v-if="results.length > 0"
      class="active-list"
    >
        <li
          v-for="(item, index) in results"
          :key="'omdb-item' + index"
          @click="imdbSearchHandler({ imdb_id: trimImdbId(item.imdbID) })"
        >
        <!-- begin v-if -->
            <img
              v-if="item.Poster !== 'N/A'"
              :src="item.Poster"
              @error="item.Poster = 'N/A'"
              alt="Poster"
            /> <!-- @error handler handles images that don't load (403/404 etc) by setting item.Poster to 'N/A', causing placeholder to be shown instead -->

          <!-- v-else: show placeholder icon-->
            <i
              v-else
            >
              <span>
                {{item.Title.substring(0,1)}}
              </span>
            </i>
            <!-- end of v-else -->
            <div class="info-wrapper">
              <span>
              {{item.Title}}
              </span>
              <span
                v-if="item.Year"
              >
              {{item.Year}}
              </span>
            </div>
          <button
            class="add"
            v-if="hasLocalStorage"
            type="submit"
            title="add to my shows"
            @click.stop="addToMyShows(trimImdbId(item.imdbID))"
          >
            +
          </button>
        </li>
    </ol>
    <ol
      v-else
      class="inactive-list"
    >
    </ol>
  </section>
</template>

<script>
// import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: "Searchbox",
  props: {
    hasLocalStorage: Boolean
  },
  data: function() {
    return {
      settings: {
        active: false,
        min: 20,
        max: 50,
        step: 10,
        datalist: {
          id: 'tickmarks',
          options: [
            20,30,40,50
          ]
        }
      },
      searchValue: '',
      omdb: {
        baseUrl: 'https://www.omdbapi.com/',
        type: 'series',
        api: 4053666222 // base 10 representation of a base 16 api key
      },
      results: [],
      error: ''
    }
  },
  computed: {
    resultsPerPage: {
      get () {
        return this.$store.state.resultsPerPage
      },
      set (value) {
        this.$store.commit('setResultsPerPage', value)
      }
    }
  },
  watch: {
    error(val) {
      if (val != '') {
        this.$emit('error', val);
        this.results.length = 0;
      } else {
        this.$emit('clearError');
      }
    },
    searchValue(val) {
      if (val === '') {
        // if the searchValue becomes an empty string, clear the search results and any exisiting error messages
        this.results.length = 0;
        this.clearError();
      }
    }
  },
  methods: {
    ...mapMutations([
        'addToMyShows'
    ]),
    setError: function(errorStr) {
        this.error = errorStr
    },
    clearError: function() {
        this.error = ""
    },
    buildOmdbUrl: function(searchStr) {
      return (
        this.omdb.baseUrl +
        "?s=" + encodeURIComponent(searchStr) +
        "&type=" + encodeURIComponent(this.omdb.type) +
        "&apikey=" + this.omdb.api.toString(16)
      );
    },
    fetchOmdb: async function(searchStr, resultArr) {
        if (searchStr === '') { return }
        try {
            const result = await fetch( this.buildOmdbUrl(searchStr) );
            const json = await result.json();
            if (
                json.Response === "True" && 
                parseInt(json.totalResults) > 0 
            ) {
                resultArr.length = 0;// clear existing resultArr to accomodate the new results
                const ongoing = json.Search.filter(x => x.Year.endsWith('–')).sort((a,b) => parseInt(a.Year.replace('–', '')) - parseInt(b.Year.replace('–', '')))
                // ordering ongoing shows by earliest first-air date
                const ended = json.Search.filter(x => !x.Year.endsWith('–')).sort((a,b) => parseInt(b.Year.substring(0,4)) - parseInt(a.Year.substring(0,4)))
                resultArr.push(...ongoing, ...ended)
                // you can tell its a .net api by the capitalized property names and using strings instead of booleans and numbers. WHY!?!
            }
            if (
                json.Response === "False" &&
                json.Error
            ) {
                this.setError(json.Error)
            }
        }
        catch (e) {
            this.setError(e.message)
        }
    },
    trimImdbId(imdbId) {
      return imdbId.replace(/tt/,'')
    },
    imdbSearchHandler(paramObj) {
      this.$emit( 'searchByImdb', paramObj )
      this.searchValue = ''
    },
    // addToMyShows(imdbId) {
    //   if (!localStorage.hasOwnProperty('myShows')) {
    //     localStorage.setItem('myShows', JSON.stringify([ imdbId ]))
    //   } else {
    //     const myShows = JSON.parse(localStorage.getItem('myShows'));
    //     if (!myShows.includes(imdbId)) {
    //       myShows.push(imdbId)
    //       localStorage.setItem('myShows', JSON.stringify(myShows))
    //     }
    //   }
    // },
  }
};
</script>

<style scoped>
section {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* padding: 4px; */
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 4px 2px;
}
img.settings {
  /* width: 32px;
  height: 32px; */
  width: 24px;
  height: 24px;
  transform: rotate(0deg);
  transition: transform 300ms ease;
}
img.settings.active {
  transform: rotate(360deg);
}
form.search-form {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  color: black;
}
form.settings-form {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-around;
  max-height: 0px;
  overflow: hidden;
  /* visibility: hidden; */
  opacity: 0;
  width: 100%;
  transition: max-height 500ms ease,opacity 200ms ease;
}
form.settings-form.active {
  margin-top: 4px;
  max-height: 64px;
  /* visibility: visible; */
  opacity: 1;
  /* transition: all 300ms ease; */
}
#rpp-label {
  border-radius: 3px;
  background-color: rgba(255,255,255,0.1);
  color: #fff;
  padding: 8px 10px;
  /* margin-right: space-around; */
  /* margin-bottom: 4px; */
}
datalist {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
}
div.setting {
  margin-top: 8px;
  padding: 4px;
}
form.settings-form label {
  display: block;
}
input[type="search"] {
  border-radius: 3px;
  margin: 4px;
  align-self: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 1.4rem;
}
img.searchIcon {
  width: 18px;
  padding: 2px 4px;
}
button {
  border-radius: 3px;
  box-shadow: none;
  margin: 2px;
  border: 1px solid rgba(255, 255, 255, 1);
  height: 32px;
}
button.add {
  color: rgba(255,255,255,0.4);
  font-weight: bold;
  font-size: 1.5em;
  background-color: #42ae81;
  align-self: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  margin: 4px 8px 4px 4px;
  width: 40px;
  height: 32px;
}
ol::before {
  position: relative;
  bottom: 57px;
  left: 38%;
  content: '';
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 40px solid rgba(255,255,255,0.2);
}
ol {
  transition: all 300ms ease;
  align-self: flex-end;
  width: 95%;
  max-width: 640px;
  margin-top: 48px;
  margin-right: 4px;
  padding-left: 0;
  padding-bottom: 5px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
}
ol.inactive-list {
  max-height: 0px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: rgba(255,255,255,0);
}
ol.active-list {
  max-height: 100vh;
}
li {
  display: flex;
  justify-items: flex-start;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 4px 6px;
}
li:first-of-type {
  margin-top: 0;
}
li img, li i {
  margin: auto;
  margin-left: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}
li span {
  align-self: center;
  line-height: 2;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;

}
li:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
li:hover .infowrapper span {
  color: #eee;
}
li i {
  background-color: rgba(255, 255, 255, 0.5);
  vertical-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
li i span {
  font-weight: bold;
  font-size: 1.3em;
  font-style: normal;
  
}
div.info-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 420px) {
  ol {
    width: 85%;
  }
}
@media screen and (min-width: 550px) {
  ol {
    width: 75%;
  }
}
</style>
