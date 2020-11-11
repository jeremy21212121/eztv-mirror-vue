<template>
<!-- WIP, breaking up search.vue -->
  <form @submit.prevent="() => {}" class="search-form">
    <input
      type="search"
      placeholder="search"
      aria-label="search by name"
      v-model="searchValue"
      required
    />
    <button
      type="submit"
      @click.prevent="fetchOmdb(searchValue, results)"
      aria-label="submit search"
    >
      <img
        aria-hidden="true"
        class="searchIcon"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAABlBMVEUAAAABAQHKudIvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwUHAyQ+G+j5AAAAVElEQVQI12NgAAH7AwwM/z8wMD74wcB4yIKBuXkOAzPjHQZmhjMM7Aw5QMwDZIOwDANzgwwD4wGgmgcVDOxAPfz7DzDIszEw2AGNqQHiCiAuYIADANUEEYboY+TMAAAAAElFTkSuQmCC"
      />
    </button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchValue: '',
      results: []
    }
  }
}
</script>