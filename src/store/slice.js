import { createSlice } from "@reduxjs/toolkit";
import { fetchMultiplePokemonById, fetchPokemonId } from "./thunk";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {}, // 동기적 상태 변경
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiplePokemonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMultiplePokemonById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMultiplePokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export const pokemonIdSlice = createSlice({
  name: "pokemonId",
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {}, // 동기적 상태 변경
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPokemonId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export const selectedSlice = createSlice({
  name: "selectedPokemon",
  initialState: { id: null },
  reducers: {
    setSelected(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    add(state, action) {
      state.list.push(action.payload);
    },
    remove(state, action) {
      state.list = state.list.filter((id) => id !== action.payload);
    },
  },
});

export const { add, remove } = favoritesSlice.actions;
