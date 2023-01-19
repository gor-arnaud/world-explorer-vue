const retrieveFavorites = () => {
    return (localStorage.getItem("favorites") || "").split(",");
}

const storeFavorites = (favorites) => {
    localStorage.setItem("favorites", favorites.join(","));
}

export default function createPersistencePlugin() {
    return (store) => {
        store.subscribe((mutation, state) => {
            if (mutation.type === "GET_FAVORITES") {
                const favorites = retrieveFavorites();
                store.commit("SET_FAVORITES", favorites);
            } else if (mutation.type === "ADD_FAVORITE" || mutation.type === "REMOVE_FAVORITE") {
                storeFavorites(state.favorites);
            }
        });
    }
}