const countryComponentMixin = {
    props: {
        country: {
            type: Object,
            default: () => null
        }
    },
    computed: {
        isFavorite: function () {
            return this.$store.getters.isCountryFavorite(this.country);
        }
    },
    methods: {
        addToFavorites: function () {
            this.$store.commit("ADD_FAVORITE", this.country);
        },
        removeFromFavorites: function () {
            this.$store.commit("REMOVE_FAVORITE", this.country);
        },
        toggleFavorite: function () {
            if (this.isFavorite)
                this.removeFromFavorites();
            else
                this.addToFavorites();
        }
    }
}

export default countryComponentMixin;