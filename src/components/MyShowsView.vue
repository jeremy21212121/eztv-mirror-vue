<template>
  <div>
    <Torrents :torrents="api.torrents" :loading="state.loading" />
    <Controls
      :page="parseInt(this.pageNumber)"
      :disableNext="this.api.torrents.length < this.resultsPerPage"
    />
  </div>
</template>
<script>
import Torrents from "@/components/torrents.vue";
import Controls from "@/components/controls.vue";
import { mapState } from "vuex";

export default {
  name: "TorrentView",
  data() {
    return {
      baseUrl: "https://eztv.re/api/get-torrents",
      api: {
        limit: 0,
        page: 0,
        torrents: [],
        torrents_count: 0,
      },
      state: {
        error: "",
        loading: false,
      },
      originalSpeechString: "Meowcats slays the ads!",
    };
  },
  props: {
    // imdbID: String,
    pageNumber: String,
  },
  components: {
    Torrents,
    Controls,
  },
  computed: {
    ...mapState(["resultsPerPage", "myShows"]),
    params() {
      const paramObj = { page: 1, limit: this.resultsPerPage };
      if (this.imdbID) {
        paramObj.imdb_id = this.imdbID;
      }
      return paramObj;
    },
  },
  mounted: async function() {
    // handles loading data on initial page load/refresh
    await this.fetchAndUpdate();
    // handle edge case where window is reloaded while scrolled down
    this.ensureWindowIsNearTop();
  },
  methods: {
    ensureWindowIsNearTop: function() {
      // if the user is scrolled past the first li element, scroll to top
      if (window.pageYOffset > 211) {
        window.scroll(0, 0);
      }
    },
    encodeParams: (obj) =>
      !obj
        ? ""
        : // if no obj is passed in, return an empty string.
          // else return url encoded params
          "?" +
          Object.keys(obj)
            .map(
              (k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
            )
            .join("&"),
    fetchJSON: async function(params) {
      const url = this.baseUrl + this.encodeParams(params);
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
      } catch (e) {
        this.setError("The service is currently unreachable");
        this.$emit("error", this.state.error);
        return;
      }
    },
    fetchAndUpdate: async function() {
      // make sure myShows is valid so we can proceed
      if (!Array.isArray(this.myShows) || this.myShows.length === 0) {
        return this.setError(
          "Please add shows to your list by clicking on the '+' button next to the shows"
        );
      }
      this.setLoading(true);
      this.ensureWindowIsNearTop();
      // request each id from the API and await the responses
      // my apologies for blasting all the HTTP requests at once. hopefully it is not a bother.
      const responses = await Promise.all(
        this.myShows.map((id) =>
          this.fetchJSON({ imdb_id: id, page: 1, limit: this.resultsPerPage })
        )
      );
      // filter invalid responses
      const filteredResponses = responses.filter((resp, respIndex) => {
        // ensures torrents returned are > 0 and of the correct imdb_id
        return (
          Array.isArray(resp.torrents) &&
          resp.torrents.length > 0 &&
          resp.torrents.every(
            (torrent) => torrent.imdb_id === this.myShows[respIndex]
          )
        );
      });
      // true if any results were filtered out
      const failedToFindSomeShows =
        responses.length !== filteredResponses.length;
      const failedToFindAnyShows = filteredResponses.length === 0;

      if (failedToFindSomeShows || failedToFindAnyShows) {
        // change the speech bubble for 10 seconds to a ridiculous value
        this.changeSpeechFor(
          10 * 1000,
          "Whoopsie daisy! I'm having kitty problems"
        );
      }
      // seriously, though. enough tomfoolery.
      if (failedToFindAnyShows) {
        /* Bummer. Possible sources of error:
            1)The API will return the latest general results if it doesn't recognize an ID. This can happen because eztv API has the wrong imdb ID for many shows. I'm working on a solution to that.
            2) API is down or erroring. This usually resolves itself eventually.
            3) myShows is somehow in an invalid state due to bug(s) in this software. Heck, a cosmic ray could flip a bit in an SSD, corrupting localStorage. NB. The latter is many orders of magnitude less likely than the former XD

          We can go no further. Set an error message that is actually helpful.
        */
        this.setError(
          "No results found. Please try again later or clear 'My Shows' in the settings if the problem persists."
        );
      } else if (failedToFindSomeShows) {
        // Look on the bright side, at least we got something! Imagine we got nothing... wouldn't that suck?
        // We shall notify the user of our shortcomings but we will keep our chin up and carry on with it.
        this.setError("Your results are missing one or more shows. Apologies!");
      } else {
        // All good in the hood. Clear any old errors
        this.setError("");
        // gather all the known-good torrent objects
        const torrents = filteredResponses.map((resp) => resp.torrents).flat();
        // sort them by most recent
        torrents.sort((a, b) => b.id - a.id);
        // clear any exisiting torrents
        this.api.torrents.length = 0;
        // and finally add them to our collection
        this.api.torrents.push(...torrents);
      }

      this.setLoading(false);
    },
    setError: function(msg) {
      // this.state.error = msg;
      this.$emit('error', msg)
    },
    setLoading: function(bool) {
      this.state.loading = bool;
    },
    async changeSpeechFor(ms, to) {
      this.$emit("update-speech", to);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, ms);
      });
      this.$emit("update-speech", this.originalSpeechString);
    },
  },
  watch: {
    myShows() {
      this.fetchAndUpdate()
    }
    // params(obj) {
    //   // fetches new results if any params change. This handles loading new results on page navigation.
    //   // an alternative approach is to use a router guard (beforeRouteUpdate), but has the downside of delaying component creation & updating route until the http request is completed.
    //   this.fetchAndUpdate(this.api, obj)
    //   // update url and set history point, if it is different from our current path
    //   const replacePath = this.$route.path.replace(/[0-9]+$/, obj.page)
    //   if (replacePath !== this.$route.path) {
    //     // pushing to the router triggers a change to params via the pageNumber route prop
    //     this.$router.push(replacePath)
    //   }
    // }
  },
};
</script>
