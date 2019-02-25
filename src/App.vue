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
import Torrents from './components/torrents.vue'
import Controls from './components/controls.vue'
import Error from './components/error.vue'
import Speechbubble from './components/speechBubble.vue'

const dataObj = {
  api: {
    limit: 0,
    page: 0,
    torrents: [],
    torrent_count: 0
  },
  state: {
    page: 1,
    limit: 40,
    baseUrl: 'https://eztv.io/api/get-torrents',
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
    Speechbubble
  },
  created: function() {
    this.fetchAndUpdate(this.api)
  },
  methods: {
    fetchAndUpdate: async function(dataObj) {
      this.setLoading(true);
      const fullUrl = `${this.state.baseUrl}?limit=${this.state.limit}&page=${this.state.page}`;
      try {
        const response = await fetch(fullUrl);
        const json = await response.json();
        Object.assign(dataObj, json);
        }
      catch(e) {
        // console.error(e);
        this.setError("Eztv appears to be down. Try again later.");
        return;
      }
      if (this.state.error.length > 1) {
        this.setError('');//clear error if successful
      }
      this.setLoading(false);
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
