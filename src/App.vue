<template>
  <div id="app">
    <div id="header-image">
        <img alt="Meowcats logo" src="./assets/logo.png">
        <Speechbubble
          :msg="this.state.speech"
        />
    </div>
    <Error
      v-if="this.state.error.length > 1"
      :msg="this.state.error"
    />
    <Searchbox 
      @searchByImdb="searchByImdb"
      @error="setError($event)"
      @clearError="setError('')"
    />
    <Torrents
      :torrents="this.api.torrents"
      :loading="this.state.loading"
      :limit="this.state.limit"
    />
    <Controls
      :page="this.state.page"
      @input="setPage($event)"
    />
  </div>
</template>

<script>
import Searchbox from "./components/search.vue";
import Torrents from './components/torrents.vue'
import Controls from './components/controls.vue'
import Error from './components/error.vue'
import Speechbubble from './components/speechBubble.vue'

const dataObj = {
  baseUrl: 'https://eztv.io/api/get-torrents',
  api: {
    limit: 0,
    page: 0,
    torrents: [],
    torrent_count: 0
  },
  state: {
    page: 1,
    limit: 40,
    error: '',
    speech: 'Meowcats slays the ads!',
    loading: false
  },
  setPage: function(pageNumber) {
    this.state.page = pageNumber
  },
  setLimit: function(limitNumber) {
    this.state.limit = limitNumber
  },
  setError: function(msg) {
    this.state.error = msg
  },
  setLoading: function(bool) {
    this.state.loading = bool
  }
};

export default {
  name: 'app',
  data: function() {
    return dataObj
  },
  components: {
    Torrents,
    Controls,
    Error,
    Speechbubble,
    Searchbox
  },
  created: function() {
    this.fetchAndUpdate(this.api)
  },
  mounted: function() {
    // handle edge case where window is reloaded while scrolled down
    this.ensureWindowIsNearTop()
  },
  methods: {
    ensureWindowIsNearTop: function() {
      // if the user is scrolled past the first li element, scroll to top
      if (window.pageYOffset > 211) {
        window.scroll(0,0);
      }
    },
    encodeParams: (obj) => (!obj) ? '' :
    // if no obj is passed in, return an empty string.
    // else return url encoded params
      ( 
        "?" + 
        Object.keys(obj).map( k => 
          `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
          )
          .join('&') 
      ),
    fetchJSON: async function(params) {
      const url = this.baseUrl + this.encodeParams(params);
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
      catch (e) {
        this.setError("The service is currently unreachable");
        return;
      }
    },
    
    fetchAndUpdate: async function(dataObj = this.api, params) {
      this.setLoading(true);
      this.ensureWindowIsNearTop();
      const json = await this.fetchJSON(params);
      if (json) {
        if (json.torrents_count > 0) {
          Object.assign(dataObj, json);
          this.setError('');
        } else {
          this.setError('Sorry, no torrents found :(');
        }
      }
      this.setLoading(false);
    },
    searchByImdb: function(payload) {
      this.fetchAndUpdate(this.api, payload);
    }
  },
  watch: {
    'state.page': function() {
      this.fetchAndUpdate(this.api)
    }

  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dddddd;
}
#header-image {
  display: flex;
  justify-content: center;
}
</style>
