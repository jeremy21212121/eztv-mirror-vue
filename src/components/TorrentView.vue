<template>
  <div>
    <Torrents
      :torrents="api.torrents"
      :loading="state.loading"
    />
    <Controls
      :page="parseInt(this.pageNumber)"
      :disableNext="this.api.torrents.length < this.resultsPerPage"
    />
  </div>
</template>
<script>
import Torrents from '@/components/torrents.vue'
import Controls from '@/components/controls.vue'
import { mapState } from 'vuex'

export default {
  name: 'TorrentView',
  data() {
    return {
      baseUrl: 'https://eztv.re/api/get-torrents',
      api: {
        limit: 0,
        page: 0,
        torrents: [],
        torrent_count: 0
      },
      state: {
        error: '',
        loading: false
      }
    };
  },
  props: {
    imdbID: String,
    pageNumber: String,
  },
  components: {
    Torrents,
    Controls
  },
  computed: {
    ...mapState(['resultsPerPage']),
    params() {
      const paramObj = { page: this.pageNumber, limit: this.resultsPerPage }
      if (this.imdbID) {
        paramObj.imdb_id = this.imdbID
      }
      return paramObj
    }
  },
  mounted: function() {
    // handles loading data on initial page load/refresh
    this.fetchAndUpdate(this.api, this.params)
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
    setError: function(msg) {
      this.state.error = msg
    },
    setLoading: function(bool) {
      this.state.loading = bool
    }
  },
  watch: {
    params(obj) {
      // fetches new results if any params change. This handles loading new results on page navigation.
      // an alternative approach is to use a router guard (beforeRouteUpdate), but has the downside of delaying component creation & updating route until the http request is completed.
      this.fetchAndUpdate(this.api, obj)
      // update url and set history point, if it is different from our current path
      const replacePath = this.$route.path.replace(/[0-9]+$/, obj.page)
      if (replacePath !== this.$route.path) {
        // pushing to the router triggers a change to params via the pageNumber route prop
        this.$router.push(replacePath)
      }
    }
  }
}
</script>
