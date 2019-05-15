<template>
  <div>
    <Torrents
      :torrents="this.api.torrents"
      :loading="this.state.loading"
      :limit="this.state.limit"
    />
    <Controls
      :page="this.state.page"
      @input="setPage"
    />
  </div>
</template>
<script>
import Torrents from '@/components/torrents.vue'
import Controls from '@/components/controls.vue'

export default {
  name: 'TorrentView',
  data() {
    return {
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
    params() {
      const paramObj = { page: this.state.page }
      if (this.imdbID) {
        paramObj.imdb_id = this.imdbID
      }
      return paramObj
    },
  },
  created: function() {
    // this.fetchAndUpdate(this.api)
  },
  mounted: function() {
    if (this.pageNumber) {
      this.setPage(parseInt(this.pageNumber))
    }
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
  },
  watch: {
    params(obj, oldObj) {
      if (obj.page !== oldObj.page) {
        this.$router.push(this.$route.path.replace(/[0-9]+$/, obj.page));
      }
      this.fetchAndUpdate(this.api, obj)
    },
    pageNumber(val) {
      if (val) {
        this.setPage(parseInt(val))
      }
      this.fetchAndUpdate(this.api, this.params)
    }
  }
}

</script>
