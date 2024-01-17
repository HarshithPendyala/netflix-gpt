import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
	name: "gpt",
	initialState: {
		showGptSearch: false,
		gptResults: null,
		tmdbResults: null,
	},
	reducers: {
		toggleGptSearch: (state) => {
			state.showGptSearch = !state.showGptSearch;
		},
		addResults: (state, action) => {
			const { gptMovies, tmdbMovies } = action.payload;
			state.gptResults = gptMovies;
			state.tmdbResults = tmdbMovies;
		},
	},
});

export const { toggleGptSearch, addResults } = gptSearchSlice.actions;
export default gptSearchSlice.reducer;
