import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearchSuggestions = () => {
	const gpt = useSelector((store) => store.gpt);
	const { gptResults, tmdbResults } = gpt;

	console.log("gptResults:", gptResults);
	console.log("tmdbResults:", tmdbResults);
	return (
		<div className="bg-black text-white font-bold text-2xl py-4 px-8 m-4 bg-opacity-70">
			<div>
				{gptResults?.map((res, index) => (
					<MovieList
						key={res}
						movies={tmdbResults?.[index]?.results}
						title={res}
					/>
				))}
			</div>
		</div>
	);
};

export default GptSearchSuggestions;
