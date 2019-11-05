<template>
  <nav>
    <router-link
      v-show="this.page > 1"
      :to="previousPageUrl"
      title="Previous page"
    >
      &lt;
    </router-link>
    <span title="Current page">{{this.page}}</span>
    <router-link
      v-show="!disableNextButton"
      :to="nextPageUrl"
      title="Next page"
    >
      &gt;
    </router-link>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1.8em;
  display: flex;
  justify-content: center;
}
a {
  width: 40px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 3px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  line-height: 33px;
}
span {
  margin: 0 8px;
}
</style>


<script>
export default {
  name: "Controls",
  props: {
    page: Number,
    disableNext: Boolean
  },
  computed: {
    disableNextButton() {
      // arbitrary limit of 50 pages to prevent bots from crawling site indefinitely. No real user will navigate that far back.
      // save the poor third-party api from getting hammered
      return (this.pageNumber > 50) || this.disableNext
    },
    nextPageUrl() {
      const url = this.$route.path.replace()
      const urlRegExp = new RegExp(`${this.page}$`)
      return url.replace(urlRegExp, this.page + 1)
    },
    previousPageUrl() {
      const url = this.$route.path.replace()
      const urlRegExp = new RegExp(`${this.page}$`)
      return url.replace(urlRegExp, this.page - 1)
    }
  }
}
</script>

