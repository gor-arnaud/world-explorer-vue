<template>
    <language-community :languages="languages"></language-community>
</template>
<script>
import countryComponentMixin from '../../mixins/countryComponentMixin';
import LanguageCommunity from '../LanguageCommunity.vue';

export default {
    name: "CountryLanguageCommunity",
    mixins: [countryComponentMixin],
    components: {LanguageCommunity},
    computed: {
        languages: function() {
            return Object.keys(this.country.languages);
        }
    }
}
</script>