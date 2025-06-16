import { createSelector } from "@reduxjs/toolkit";

export const selectPokemonById = (pokemonId) =>
  createSelector(
    (state) => state.pokemon.data,
    (pokemon) => pokemon.find((p) => p.id === pokemonId)
  );

export const selectPokemonByRegExp = (reg) =>
  createSelector(
    (state) => state.pokemon.data,
    (pokemon) => pokemon.filter((el) => el.name.match(reg))
  );

export const selectPokemonByFavorites = createSelector(
  (state) => state.pokemon.data,
  (state) => state.favorites.list,
  (pokemons, favIds) => {
    const favIdNums = favIds.map((id) => Number(id));
    return pokemons.filter((pokemon) => favIdNums.includes(pokemon.id));
  }
);
