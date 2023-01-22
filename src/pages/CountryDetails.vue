<template>
    <h1 class="title">{{ country?.name?.common }}</h1>
</template>
<script>
export default {
    name: "CountryDetails",
    props: {
        countryCode: {
            type: String,
            default: ""
        }
    },
    computed: {
        country: function (){
            return this.$store.getters.getCountry(this.countryCode);
        }
    }
}
</script>