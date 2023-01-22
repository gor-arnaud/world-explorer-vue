<template>
  <div v-html="wikiContent"></div>
</template>
<script>
import axios from "axios";

export default {
  name: "WikipediaIntro",
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      wikiContent: "",
    };
  },
  computed: {
    wikiUrl: function () {
      return `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${this.query}&origin=*`;
    },
  },
  methods: {
    fetchWiki: function () {
      axios
        .get(this.wikiUrl)
        .then(({ data }) => {
          const pages = Object.keys(data.query.pages);

          if (pages && pages.length > 0) {
            this.wikiContent = data.query.pages[pages[0]].extract;
          }
        })
        .catch((error) => console.error(error));
    },
  },
  watch: {
    wikiUrl: function () {
      this.fetchWiki();
    },
  },
  mounted() {
    this.fetchWiki();
  },
};
</script>