<template>
  <embedded-map :query="mapQuery" :zoom="areaZoom"></embedded-map>
</template>
<script>
import EmbeddedMap from "../EmbeddedMap.vue";
import countryComponentMixin from "../../mixins/countryComponentMixin";

export default {
  name: "CountryMap",
  components: { EmbeddedMap },
  mixins: [countryComponentMixin],
  computed: {
    mapQuery: function () {
      return this.country.name.common;
    },
    areaZoom() {
      const area = this.country.area;

      if (area >= 10000000) return 2;

      if (area >= 1000000) return 3;

      if (area >= 500000) return 4;

      if (area >= 100000) return 5;

      if (area >= 50000) return 6;

      return 9;
    },
  },
  methods: {},
};
</script>