import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
	return (
		<div>
			<div className="absolute -z-20">
				<img className="w-screen brightness-50" src={BG_URL} alt="bg-img" />
			</div>
			<GptSearchBar />
			<GptSearchSuggestions />
		</div>
	);
};

export default GPTSearch;
