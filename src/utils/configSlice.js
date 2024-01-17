import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: {
		lang: "en",
	},
	reducers: {
		setSelectedLang: (state, action) => {
			state.lang = action.payload;
		},
	},
});

export const { setSelectedLang } = configSlice.actions;
export default configSlice.reducer;
