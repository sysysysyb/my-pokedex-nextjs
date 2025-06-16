import { configureStore } from "@reduxjs/toolkit";
import {
  favoritesSlice,
  pokemonIdSlice,
  pokemonSlice,
  selectedSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    pokemonId: pokemonIdSlice.reducer,
    selectedPokemon: selectedSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

store.subscribe(() => {
  const favs = store.getState().favorites.list;
  localStorage.setItem("favorites", JSON.stringify(favs));
});
