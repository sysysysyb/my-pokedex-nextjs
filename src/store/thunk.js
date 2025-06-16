import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonId = createAsyncThunk(
  "pokemonId/fetchPokemonId",
  async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokedex/updated-johto/"
    );
    const { pokemon_entries } = await response.json();

    const pokemonId = pokemon_entries.map((el) => {
      const splits = el.pokemon_species.url.split("/").filter(Boolean);
      return splits.pop(); // 마지막 요소 반환을 위해 pop 사용
    });

    return pokemonId;
  }
);

export const fetchMultiplePokemonById = createAsyncThunk(
  "pokemon/fetchMultiplePokemonById",
  async (pokemonIdList) => {
    const getPokemonData = async (pokemonId, count) => {
      const [responseP, responsePS] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`),
      ]);

      const [dataP, dataPS] = await Promise.all([
        responseP.json(),
        responsePS.json(),
      ]);

      const pokemonData = {
        id: count,
        color: dataPS.color.name,
        desc: dataPS.flavor_text_entries.find((el) => el.language.name === "ko")
          .flavor_text,
        genus: dataPS.genera.find((el) => el.language.name === "ko").genus,
        height: dataP.height,
        name: dataPS.names.find((el) => el.language.name === "ko").name,
        sprites: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
          front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`,
          back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemonId}.png`,
        },
        types: dataP.types.map((el) => el.type.name),
        weight: dataP.weight,
      };

      return pokemonData;
    };

    return await Promise.all(
      pokemonIdList.map((el, idx) => getPokemonData(el, idx + 1))
    );
  }
);
