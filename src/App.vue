<template>
  <div id="app">
    <div id="header-image">
        <a href="/" title="home">
          <img alt="Meowcats logo" src="./assets/logo.png">
        </a>
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
      :hasLocalStorage="hasLocalStorage"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import Searchbox from "./components/search.vue";
import Error from './components/error.vue'
import Speechbubble from './components/speechBubble.vue'

export default {
  name: 'app',
  data: function() {
    return {
      state: {
        error: '',
        speech: 'Meowcats slays the ads!',
        loading: false
      }
    }
  },
  components: {
    Error,
    Speechbubble,
    Searchbox
  },
  computed: {
    hasLocalStorage() {
      var mod = 'localStorageTest5421524587';
      try {
          localStorage.setItem(mod, mod);
          localStorage.removeItem(mod);
          return true;
      } catch(e) {
          return false;
      }
    },
  },
  methods: {
    setError: function(msg) {
      this.state.error = msg
    },
    setLoading: function(bool) {
      this.state.loading = bool
    },
    searchByImdb: function(payload) {
      // this.fetchAndUpdate(this.api, payload);
      this.$router.push('/search/' + payload.imdb_id + '/1')
    }
  },
  watch: {
    // 'state.page': function(val) {
    //   this.fetchAndUpdate(this.api, {page: val});
    // }

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
