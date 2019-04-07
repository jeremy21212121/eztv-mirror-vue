
const omdbUrl = {
  baseUrl: "https://www.omdbapi.com/",
  type: "series",
  api: 4053666222,
  searchComponent: function(str) {
    return "?s=" + encodeURIComponent(str)
  },
  typeComponent: function() {
    return "&type=" + encodeURIComponent(this.type)
  },
  apiComponent: function() {
    return "&apikey=" + this.api.toString(16)
  },
  build: function(searchStr) {
    return this.baseUrl + this.searchComponent(searchStr) + this.typeComponent() + this.apiComponent()
  }
};

export default omdbUrl;
