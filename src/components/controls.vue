<template>
  <nav>
    <button v-show="pageNumber > 1" @click="pageNumber--" title="Previous page">&lt;</button>
    <span title="Current page">{{pageNumber}}</span>
    <button v-show="!disableNextButton" @click="pageNumber++" title="Next page">&gt;</button>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1.8em;
  display: flex;
  justify-content: center;
}
button {
  line-height: 2em;
  width: 3em;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 3px;
}
span {
  margin: 0 8px;
}
</style>


<script>
export default {
  name: "Controls",
  data: function() {
    return {
      pageNumber: this.page
    };
  },
  props: {
    page: Number,
    disableNext: Boolean
  },
  computed: {
    disableNextButton() {
      return (this.pageNumber > 50) || this.disableNext
    },
  },
  watch: {
    pageNumber: function(val) {
      this.$emit("input", val);
    }
  }
};
</script>

