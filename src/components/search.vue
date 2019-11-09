<template>
  <section class="search">
    <form
      @submit.prevent="()=>{}"
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
import { mapState } from 'vuex'

export default {
  name: "Searchbox",
  props: {
    hasLocalStorage: Boolean
  },
  data: function() {
    return {
      searchValue: '',
      omdb: {
        baseUrl: 'https://www.omdbapi.com/',
        type: 'series',
        api: 4053666222 // base 10 representation of a base 16 api key
      },
      results: [],
      error: ''
    };
  },
  computed: {
    ...mapState([
      'resultsPerPage'
    ]),
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
                const ongoing = json.Search.filter(x => x.Year.endsWith('–')).sort((a,b) => parseInt(b.Year.replace('–', '')) - parseInt(a.Year.replace('–', '')))
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
    addToMyShows(imdbId) {
      if (!localStorage.hasOwnProperty('myShows')) {
        localStorage.setItem('myShows', JSON.stringify([ imdbId ]))
      } else {
        const myShows = JSON.parse(localStorage.getItem('myShows'));
        if (!myShows.includes(imdbId)) {
          myShows.push(imdbId)
          localStorage.setItem('myShows', JSON.stringify(myShows))
        }
      }
    },
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 4px;
}
form {
  
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 0.2);
  color: black;
  border-radius: 3px;
  padding: 4px 2px;
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
button[type="submit"] {
    border-radius: 3px;
    box-shadow: 0;
    margin: 2px;
    border: 1px solid rgba(255, 255, 255, 1);
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
