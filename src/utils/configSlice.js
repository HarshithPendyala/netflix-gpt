import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: {
		lang: "en",
		modal: false,
		movieInfo: null,
	},
	reducers: {
		setSelectedLang: (state, action) => {
			state.lang = action.payload;
		},
		setModal: (state, action) => {
			state.modal = action.payload;
		},
		setMovieInfo: (state, action) => {
			state.movieInfo = action.payload;
		},
	},
});

export const { setSelectedLang, setModal, setMovieInfo } = configSlice.actions;
export default configSlice.reducer;
