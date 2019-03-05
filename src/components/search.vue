<template>
  <section class="search">
    <form>
      <input type="search" placeholder="search" aria-label="search by name" v-model="searchValue">
      <button type="submit" aria-label="submit search" @click.prevent="fetchOmdb(searchValue, results)">
        <img
          aria-hidden="true"
          class="searchIcon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAABlBMVEUAAAABAQHKudIvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwUHAyQ+G+j5AAAAVElEQVQI12NgAAH7AwwM/z8wMD74wcB4yIKBuXkOAzPjHQZmhjMM7Aw5QMwDZIOwDANzgwwD4wGgmgcVDOxAPfz7DzDIszEw2AGNqQHiCiAuYIADANUEEYboY+TMAAAAAElFTkSuQmCC"
        >
      </button>
    </form>
    <ol
      v-if="results.length > 1"
    >
        <li
          v-for="(item, index) in results"
          :key="index"
          @click="$emit('search-by-imdb', item.imdbID)"
        >
            <img
              v-if="item.Poster"
              :src="item.Poster"
              alt=""
            />
            <i
              v-else
            >
            </i>
            <span>
                {{item.Title}}
            </span>
        </li>
    </ol>
  </section>
</template>

<script>

export default {
  name: "Searchbox",
  data: function() {
    return {
      searchValue: "",
      omdb: {
        baseUrl: "https://www.omdbapi.com/",
        type: "series",
        api: 4053666222
      },
      results: [],
      error: ""
    };
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
        try {
            const result = await fetch( this.buildOmdbUrl(searchStr) );
            const json = await result.json();
            if (
                json.Response === "True" && 
                parseInt(json.totalResults) > 0 
            ) { 
                resultArr.push(...json.Search);
                // you can tell its a .net api by the capitalized property names and using strings instead of booleans and numbers. WHY!?!
            }
            if (
                json.Response === "False" &&
                json.Error
            ) {
                this.setError(json.Error)
            }
        }
        catch(e) {
            this.setError(e.message)
        }
    } 
  }
};
</script>

<style scoped>
section {
  /* display: flex;
  justify-content: flex-end; */
  padding: 4px;
}
form {
  
  display: flex;
  justify-content: flex-end;
  /* width: 50%; */
  max-width: 720px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 3px;
  padding: 4px 2px;
}
input[type="search"] {
    border-radius: 3px;
    margin: 4px;
    align-self: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
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
ol {
    padding: 10px 8px;
    /* padding-left: 0; */
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.2);
}
li {
    display: flex;
    justify-content: flex-start;
    line-height: 48px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 4px 2px;
    /* padding-left: 0; */
}
li img, li i {
    padding: 4px;
    max-width: 48px;
    width: 48px;
    max-height: 48px;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
}
li img:hover {
    max-width: 96px;
    max-height: 96px;
    width: 96px;
}
li i {
    background-color: rgba(255, 255, 255, 0.5);
}
li span {
    /* flex-grow: 1; */
    /* text-align: center; */
    align-self: center;
}
</style>

