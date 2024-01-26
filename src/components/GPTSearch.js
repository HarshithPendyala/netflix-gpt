import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
	return (
		<div>
			<div className="fixed -z-20">
				<img
					className="w-screen h-screen object-cover brightness-50"
					src={BG_URL}
					alt="bg-img"
				/>
			</div>
			<GptSearchBar />
			<GptSearchSuggestions />
		</div>
	);
};

export default GPTSearch;
