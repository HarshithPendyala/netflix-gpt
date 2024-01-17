import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptSearchReducer from "./gptSearchSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		movies: moviesReducer,
		gpt: gptSearchReducer,
		config: configReducer,
	},
});

export default appStore;
